import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getAllSymbols, createSymbol, updateSymbol, deleteSymbol, recompressSymbol, type Symbol } from "@/lib/symbols";
import { Plus, Search, Edit, Trash2, Upload, Loader2, Zap } from "lucide-react";
import { toast } from "sonner";

const categories = ['kors', 'hjerte', 'natur', 'dyr', 'annet'];

const categoryLabels: Record<string, string> = {
  'kors': 'Kors',
  'hjerte': 'Hjerte',
  'natur': 'Natur',
  'dyr': 'Dyr',
  'annet': 'Annet',
};

const statusLabels: Record<string, string> = {
  'draft': 'Draft',
  'published': 'Publisert',
  'archived': 'Arkivert',
};

export function AdminSymbolsTab() {
  const [symbols, setSymbols] = useState<Symbol[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null);
  const [uploading, setUploading] = useState(false);
  const [recompressing, setRecompressing] = useState(false);
  const [recompressProgress, setRecompressProgress] = useState<{ done: number; total: number } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    tags: "",
    status: "draft" as "draft" | "published" | "archived",
    stroke_only: false,
    file: null as File | null,
  });

  useEffect(() => {
    loadSymbols();
  }, []);

  const loadSymbols = async () => {
    setLoading(true);
    try {
      const data = await getAllSymbols();
      setSymbols(data);
    } catch (error) {
      toast.error("Kunne ikke laste symboler");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      tags: "",
      status: "draft",
      stroke_only: false,
      file: null,
    });
  };

  const handleUpload = async () => {
    if (!formData.file) {
      toast.error("Velg en fil å laste opp");
      return;
    }

    setUploading(true);
    try {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      const symbolName = formData.name || formData.file.name.replace(/\.[^/.]+$/, "");
      const symbolCategory = formData.category || 'annet';
      await createSymbol(formData.file, {
        name: symbolName,
        category: symbolCategory,
        tags,
        status: formData.status,
        stroke_only: formData.stroke_only,
      });
      toast.success("Symbol lastet opp");
      setUploadDialogOpen(false);
      resetForm();
      loadSymbols();
    } catch (error) {
      toast.error("Kunne ikke laste opp symbol");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedSymbol) return;

    setUploading(true);
    try {
      const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      await updateSymbol(selectedSymbol.id, {
        name: formData.name,
        category: formData.category,
        tags,
        status: formData.status,
        stroke_only: formData.stroke_only,
      });
      toast.success("Symbol oppdatert");
      setEditDialogOpen(false);
      setSelectedSymbol(null);
      loadSymbols();
    } catch (error) {
      toast.error("Kunne ikke oppdatere symbol");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Er du sikker på at du vil slette dette symbolet?")) return;

    try {
      await deleteSymbol(id);
      toast.success("Symbol slettet");
      loadSymbols();
    } catch (error) {
      toast.error("Kunne ikke slette symbol");
      console.error(error);
    }
  };

  const handleRecompressAll = async () => {
    const candidates = symbols.filter(s => s.file_type !== 'svg' && s.preview_url);
    if (candidates.length === 0) {
      toast.info("Ingen symboler å komprimere");
      return;
    }
    if (!confirm(`Komprimer ${candidates.length} symboler? Dette kan ta litt tid.`)) return;

    setRecompressing(true);
    setRecompressProgress({ done: 0, total: candidates.length });
    let success = 0;
    let failed = 0;

    for (let i = 0; i < candidates.length; i++) {
      try {
        await recompressSymbol(candidates[i]);
        success++;
      } catch (err) {
        console.error("Recompress failed for", candidates[i].id, err);
        failed++;
      }
      setRecompressProgress({ done: i + 1, total: candidates.length });
    }

    setRecompressing(false);
    setRecompressProgress(null);
    toast.success(`Ferdig: ${success} komprimert${failed > 0 ? `, ${failed} feilet` : ''}`);
    loadSymbols();
  };

  const openEditDialog = (symbol: Symbol) => {
    setSelectedSymbol(symbol);
    setFormData({
      name: symbol.name,
      category: symbol.category,
      tags: symbol.tags.join(', '),
      status: symbol.status,
      stroke_only: symbol.stroke_only,
      file: null,
    });
    setEditDialogOpen(true);
  };

  const filteredSymbols = symbols.filter(symbol => {
    const matchesSearch = symbol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      symbol.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || symbol.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || symbol.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Symbol-bibliotek</h2>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={handleRecompressAll}
            disabled={recompressing || loading}
          >
            {recompressing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Zap className="w-4 h-4 mr-2" />
            )}
            {recompressing && recompressProgress
              ? `Komprimerer ${recompressProgress.done}/${recompressProgress.total}`
              : "Komprimer alle"}
          </Button>

          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Last opp symbol
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Last opp symbol</DialogTitle>
              <DialogDescription>
                Last opp et nytt symbol til biblioteket
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="file">Fil (PNG/SVG)</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".png,.svg,image/png,image/svg+xml"
                  onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Navn</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="F.eks. Ornamentert kors (bruker filnavn hvis tom)"
                />
              </div>

              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Velg kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{categoryLabels[cat]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (kommaseparert)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="kors, kristent, ornamentert"
                />
                <p className="text-xs text-muted-foreground">
                  Bruk kategori-navn som tag for å vise i flere kategorier
                </p>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(value: "draft" | "published" | "archived") => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Publisert</SelectItem>
                    <SelectItem value="archived">Arkivert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="stroke_only"
                  checked={formData.stroke_only}
                  onCheckedChange={(checked) => setFormData({ ...formData, stroke_only: checked === true })}
                />
                <Label htmlFor="stroke_only" className="cursor-pointer">Stroke only (for CNC)</Label>
              </div>

              <Button onClick={handleUpload} className="w-full" disabled={uploading}>
                {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                Last opp
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Søk etter symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle statuser</SelectItem>
            <SelectItem value="published">Publisert</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Arkivert</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alle kategorier</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{categoryLabels[cat]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Symbols Grid */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSymbols.map((symbol) => (
            <div key={symbol.id} className="bg-card border rounded-lg p-4 flex flex-col">
              {symbol.preview_url && (
                <img
                  src={symbol.preview_url}
                  alt={symbol.name}
                  className="w-full h-24 object-contain mb-3"
                />
              )}
              <div className="flex-1">
                <h3 className="font-medium text-sm truncate">{symbol.name}</h3>
                <p className="text-xs text-muted-foreground">{categoryLabels[symbol.category] || symbol.category}</p>
                <div className="mt-2">
                  <Badge variant={getStatusVariant(symbol.status)}>
                    {statusLabels[symbol.status]}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(symbol)}
                  className="flex-1"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(symbol.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredSymbols.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Ingen symboler funnet
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Rediger symbol</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Navn *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Kategori *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{categoryLabels[cat]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags</Label>
              <Input
                id="edit-tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Bruk kategori-navn som tag for å vise i flere kategorier
              </p>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value: "draft" | "published" | "archived") => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Publisert</SelectItem>
                  <SelectItem value="archived">Arkivert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="edit-stroke_only"
                checked={formData.stroke_only}
                onCheckedChange={(checked) => setFormData({ ...formData, stroke_only: checked === true })}
              />
              <Label htmlFor="edit-stroke_only" className="cursor-pointer">Stroke only</Label>
            </div>

            <Button onClick={handleEdit} className="w-full" disabled={uploading}>
              {uploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Oppdater
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
