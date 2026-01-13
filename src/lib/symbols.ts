import { supabase } from "@/integrations/supabase/client";

export interface Symbol {
  id: string;
  name: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  file_type: 'png' | 'svg';
  stroke_only: boolean;
  preview_url: string | null;
  source_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SymbolCategory {
  id: string;
  name: string;
  symbols: { id: string; name: string; image: string }[];
}

// Category ID to display name mapping
const categoryNames: Record<string, string> = {
  'kors': 'Kors',
  'hjerte': 'Hjerte',
  'natur': 'Natur',
  'dyr': 'Dyr',
  'annet': 'Annet',
};

// Hent alle published symbols
export async function getPublishedSymbols(): Promise<Symbol[]> {
  const { data, error } = await supabase
    .from('symbols')
    .select('*')
    .eq('status', 'published')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching symbols:', error);
    return [];
  }

  return (data || []) as Symbol[];
}

// Hent symbols gruppert etter kategori
export async function getSymbolsByCategory(): Promise<SymbolCategory[]> {
  const symbols = await getPublishedSymbols();
  
  const categoriesMap = new Map<string, Symbol[]>();
  
  symbols.forEach(symbol => {
    // Add symbol to its main category
    if (!categoriesMap.has(symbol.category)) {
      categoriesMap.set(symbol.category, []);
    }
    categoriesMap.get(symbol.category)!.push(symbol);
    
    // Also add to additional categories based on tags
    symbol.tags.forEach(tag => {
      if (categoryNames[tag] && tag !== symbol.category) {
        if (!categoriesMap.has(tag)) {
          categoriesMap.set(tag, []);
        }
        // Add with modified id to avoid duplicates
        categoriesMap.get(tag)!.push({
          ...symbol,
          id: `${symbol.id}-${tag}`,
        });
      }
    });
  });

  // Define category order
  const categoryOrder = ['kors', 'hjerte', 'natur', 'dyr', 'annet'];
  
  return categoryOrder
    .filter(catId => categoriesMap.has(catId))
    .map(categoryId => ({
      id: categoryId,
      name: categoryNames[categoryId] || categoryId,
      symbols: categoriesMap.get(categoryId)!.map(s => ({
        id: s.id,
        name: s.name,
        image: s.preview_url || s.source_url || '',
      })),
    }));
}

// Admin: Hent alle symbols (inkludert draft/archived)
export async function getAllSymbols(): Promise<Symbol[]> {
  const { data, error } = await supabase
    .from('symbols')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all symbols:', error);
    return [];
  }

  return (data || []) as Symbol[];
}

// Admin: Last opp symbol fil til Storage
export async function uploadSymbolFile(file: File, symbolId: string): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${symbolId}/preview.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('symbols')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from('symbols')
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

// Admin: Last opp symbol med metadata
export async function createSymbol(
  file: File,
  metadata: {
    name: string;
    category: string;
    tags?: string[];
    status?: 'draft' | 'published' | 'archived';
    stroke_only?: boolean;
  }
): Promise<Symbol> {
  // Create symbol record first
  const { data: symbolData, error: insertError } = await supabase
    .from('symbols')
    .insert({
      name: metadata.name,
      category: metadata.category,
      tags: metadata.tags || [],
      status: metadata.status || 'draft',
      file_type: file.type.includes('svg') ? 'svg' : 'png',
      stroke_only: metadata.stroke_only || false,
    })
    .select()
    .single();

  if (insertError) {
    throw insertError;
  }

  // Upload file
  const previewUrl = await uploadSymbolFile(file, symbolData.id);

  // Update symbol with URL
  const { data: updatedSymbol, error: updateError } = await supabase
    .from('symbols')
    .update({ preview_url: previewUrl, source_url: previewUrl })
    .eq('id', symbolData.id)
    .select()
    .single();

  if (updateError) {
    throw updateError;
  }

  return updatedSymbol as Symbol;
}

// Admin: Oppdater symbol
export async function updateSymbol(
  id: string,
  updates: Partial<Omit<Symbol, 'id' | 'created_at' | 'updated_at'>>
): Promise<Symbol> {
  const { data, error } = await supabase
    .from('symbols')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Symbol;
}

// Admin: Slett symbol
export async function deleteSymbol(id: string): Promise<void> {
  // Delete file from storage first
  const { data: symbol } = await supabase
    .from('symbols')
    .select('preview_url')
    .eq('id', id)
    .maybeSingle();

  if (symbol?.preview_url) {
    try {
      // Extract path from URL
      const urlParts = symbol.preview_url.split('/symbols/');
      if (urlParts[1]) {
        await supabase.storage.from('symbols').remove([urlParts[1]]);
      }
    } catch (e) {
      console.error('Error deleting file from storage:', e);
    }
  }

  // Delete record
  const { error } = await supabase
    .from('symbols')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }
}
