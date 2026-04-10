import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Trash2, Upload, ArrowUp, ArrowDown } from "lucide-react";
import {
  getAllPlateGalleryImages,
  createPlateGalleryImage,
  updatePlateGalleryImage,
  deletePlateGalleryImage,
} from "@/lib/plateGallery";

export function AdminPlateGalleryTab() {
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<File[]>([]);
  const [altText, setAltText] = useState("");
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["admin-plate-gallery"],
    queryFn: getAllPlateGalleryImages,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-plate-gallery"] });

  const toggleMutation = useMutation({
    mutationFn: ({ id, is_published }: { id: string; is_published: boolean }) =>
      updatePlateGalleryImage(id, { is_published }),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: deletePlateGalleryImage,
    onSuccess: () => {
      invalidate();
      toast.success("Bilde slettet");
    },
    onError: () => toast.error("Kunne ikke slette bilde"),
  });

  const moveMutation = useMutation({
    mutationFn: async ({ id, direction }: { id: string; direction: "up" | "down" }) => {
      const idx = images.findIndex((img) => img.id === id);
      if (idx < 0) return;
      const swapIdx = direction === "up" ? idx - 1 : idx + 1;
      if (swapIdx < 0 || swapIdx >= images.length) return;
      const current = images[idx];
      const swap = images[swapIdx];
      await updatePlateGalleryImage(current.id, { sort_order: swap.sort_order });
      await updatePlateGalleryImage(swap.id, { sort_order: current.sort_order });
    },
    onSuccess: invalidate,
  });

  const handleUpload = async () => {
    if (files.length === 0 || !altText.trim()) {
      toast.error("Velg minst én fil og skriv inn alt-tekst");
      return;
    }
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        setUploadProgress(`${i + 1} av ${files.length}`);
        await createPlateGalleryImage(files[i], { alt_text: altText.trim(), title: title.trim() || undefined });
      }
      toast.success(`${files.length} bilde${files.length > 1 ? "r" : ""} lastet opp`);
      setFiles([]);
      setAltText("");
      setTitle("");
      setUploadProgress("");
      invalidate();
    } catch {
      toast.error("Feil ved opplasting");
    } finally {
      setUploading(false);
      setUploadProgress("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload */}
      <div className="bg-card border rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-lg">Last opp nytt bilde</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="gallery-file">Bildefil</Label>
            <Input
              id="gallery-file"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gallery-alt">Alt-tekst *</Label>
            <Input
              id="gallery-alt"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Beskrivelse av bildet"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gallery-title">Tittel (valgfritt)</Label>
            <Input
              id="gallery-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tittel på bildet"
            />
          </div>
        </div>
        <Button onClick={handleUpload} disabled={uploading || !file || !altText.trim()}>
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Laster opp…" : "Last opp"}
        </Button>
      </div>

      {/* List */}
      {isLoading ? (
        <p className="text-muted-foreground">Laster bilder…</p>
      ) : images.length === 0 ? (
        <p className="text-muted-foreground">Ingen bilder ennå.</p>
      ) : (
        <div className="space-y-4">
          {images.map((img, idx) => (
            <div key={img.id} className="flex items-center gap-4 bg-card border rounded-lg p-4">
              <img
                src={img.image_url}
                alt={img.alt_text}
                className="w-24 h-24 object-cover rounded-md shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{img.title || img.alt_text}</p>
                <p className="text-sm text-muted-foreground truncate">{img.alt_text}</p>
                <p className="text-xs text-muted-foreground">
                  {img.width}×{img.height} · Rekkefølge: {img.sort_order}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={img.is_published ?? true}
                  onCheckedChange={(checked) =>
                    toggleMutation.mutate({ id: img.id, is_published: checked })
                  }
                />
                <span className="text-xs text-muted-foreground w-16">
                  {img.is_published ? "Publisert" : "Skjult"}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={idx === 0}
                  onClick={() => moveMutation.mutate({ id: img.id, direction: "up" })}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={idx === images.length - 1}
                  onClick={() => moveMutation.mutate({ id: img.id, direction: "down" })}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  if (confirm("Slett dette bildet?")) deleteMutation.mutate(img.id);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
