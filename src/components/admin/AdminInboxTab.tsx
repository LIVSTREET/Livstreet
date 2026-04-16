import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Mail, Phone, MapPin, Calendar, Package, Loader2, Image as ImageIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  getInquiries,
  updateInquiry,
  deleteInquiry,
  getDesignImageUrl,
  Inquiry,
  InquiryStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  formatPrice,
  formatDate,
} from "@/lib/inquiries";

const STATUS_TABS: { value: string; label: string }[] = [
  { value: "all", label: "Alle" },
  { value: "new", label: "Nye" },
  { value: "in_progress", label: "I arbeid" },
  { value: "responded", label: "Besvart" },
  { value: "completed", label: "Fullført" },
  { value: "archived", label: "Arkivert" },
];

function InquiryCard({ 
  inquiry, 
  onClick 
}: { 
  inquiry: Inquiry; 
  onClick: () => void;
}) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (inquiry.design_image_url) {
      getDesignImageUrl(inquiry.design_image_url).then(setImageUrl);
    }
  }, [inquiry.design_image_url]);

  const statusMutation = useMutation({
    mutationFn: (newStatus: InquiryStatus) =>
      updateInquiry(inquiry.id, { status: newStatus }),
    onSuccess: () => {
      toast.success("Status oppdatert");
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
    onError: () => {
      toast.error("Kunne ikke oppdatere status");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteInquiry(inquiry.id),
    onSuccess: () => {
      toast.success("Forespørsel slettet");
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
    onError: () => {
      toast.error("Kunne ikke slette forespørsel");
    },
  });

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="w-20 h-20 flex-shrink-0 rounded-lg bg-muted overflow-hidden flex items-center justify-center">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Design preview" 
                className="w-full h-full object-cover"
              />
            ) : inquiry.has_design ? (
              <ImageIcon className="w-8 h-8 text-muted-foreground" />
            ) : (
              <Package className="w-8 h-8 text-muted-foreground" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground truncate">{inquiry.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{inquiry.email}</p>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                className="flex-shrink-0 flex items-center gap-2"
              >
                <Select
                  value={inquiry.status}
                  onValueChange={(v) => statusMutation.mutate(v as InquiryStatus)}
                  disabled={statusMutation.isPending}
                >
                  <SelectTrigger
                    className={`h-7 w-auto gap-1 px-2 py-0 border-0 text-white text-xs font-medium ${STATUS_COLORS[inquiry.status]} hover:opacity-90 focus:ring-0 focus:ring-offset-0 [&>svg]:text-white/80`}
                  >
                    <SelectValue>{STATUS_LABELS[inquiry.status]}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {inquiry.status === "archived" && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                        disabled={deleteMutation.isPending}
                        aria-label="Slett forespørsel"
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Slette forespørsel?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Forespørselen fra {inquiry.name} vil bli permanent slettet. Denne handlingen kan ikke angres.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Avbryt</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => deleteMutation.mutate()}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Slett
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(inquiry.created_at)}
              </span>
              {inquiry.total_price && (
                <span className="font-medium text-foreground">
                  {formatPrice(inquiry.total_price)}
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {inquiry.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InquiryDetail({
  inquiry,
  onClose,
  onUpdate,
}: {
  inquiry: Inquiry;
  onClose: () => void;
  onUpdate: () => void;
}) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status);
  const [notes, setNotes] = useState(inquiry.notes || "");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (inquiry.design_image_url) {
      getDesignImageUrl(inquiry.design_image_url).then(setImageUrl);
    }
  }, [inquiry.design_image_url]);

  const updateMutation = useMutation({
    mutationFn: () => updateInquiry(inquiry.id, { status, notes }),
    onSuccess: () => {
      toast.success("Forespørsel oppdatert");
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
      onUpdate();
    },
    onError: () => {
      toast.error("Kunne ikke oppdatere forespørsel");
    },
  });

  const hasChanges = status !== inquiry.status || notes !== (inquiry.notes || "");

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Forespørsel fra {inquiry.name}</DialogTitle>
      </DialogHeader>

      <div className="space-y-6 mt-4">
        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Kundeinformasjon</h4>
            <div className="space-y-1">
              <p className="flex items-center gap-2">
                <span className="font-medium">{inquiry.name}</span>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${inquiry.email}`} className="text-primary hover:underline">
                  {inquiry.email}
                </a>
              </p>
              <p className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${inquiry.phone}`} className="text-primary hover:underline">
                  {inquiry.phone}
                </a>
              </p>
              {inquiry.address && (
                <p className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {inquiry.address}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Detaljer</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Kilde:</span>{" "}
                {inquiry.source === "contact" ? "Kontaktskjema" : "Bestillingsskjema"}
              </p>
              <p>
                <span className="text-muted-foreground">Mottatt:</span>{" "}
                {formatDate(inquiry.created_at)}
              </p>
              <p>
                <span className="text-muted-foreground">Oppdatert:</span>{" "}
                {formatDate(inquiry.updated_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-muted-foreground">Melding</h4>
          <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-lg">
            {inquiry.description}
          </p>
        </div>

        {/* Design Preview */}
        {inquiry.has_design && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Design</h4>

            {inquiry.design_image_url ? (
              imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Kundens design"
                  className="w-full max-w-md rounded-lg border"
                />
              ) : (
                <p className="text-sm text-muted-foreground">Laster bilde...</p>
              )
            ) : (
              <p className="text-sm text-muted-foreground">
                Design ble sendt inn, men designbildet er ikke lagret for denne forespørselen.
              </p>
            )}
          </div>
        )}

        {/* Pricing */}
        {inquiry.base_price && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">Priser</h4>
            <div className="bg-muted p-3 rounded-lg space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Gravplate</span>
                <span>{formatPrice(inquiry.base_price)}</span>
              </div>
              {inquiry.maintenance_selected && inquiry.maintenance_price && (
                <div className="flex justify-between">
                  <span>Fabrikkfornyelse</span>
                  <span>{formatPrice(inquiry.maintenance_price)}</span>
                </div>
              )}
              {inquiry.installation_selected && inquiry.installation_price !== undefined && (
                <div className="flex justify-between">
                  <span>Montering</span>
                  <span>{inquiry.installation_price === 0 ? "Inkludert" : formatPrice(inquiry.installation_price)}</span>
                </div>
              )}
              {inquiry.total_price && (
                <div className="flex justify-between font-semibold border-t pt-1 mt-1">
                  <span>Total</span>
                  <span>{formatPrice(inquiry.total_price)}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Status & Notes */}
        <div className="space-y-4 border-t pt-4">
          <div className="space-y-2">
            <label className="font-semibold text-sm text-muted-foreground">Status</label>
            <Select value={status} onValueChange={(v) => setStatus(v as InquiryStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(STATUS_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="font-semibold text-sm text-muted-foreground">Notater</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Legg til interne notater..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Lukk
            </Button>
            <Button 
              onClick={() => updateMutation.mutate()}
              disabled={!hasChanges || updateMutation.isPending}
            >
              {updateMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Lagre endringer
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export function AdminInboxTab() {
  const [statusFilter, setStatusFilter] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const { data: inquiries = [], isLoading, refetch } = useQuery({
    queryKey: ["inquiries", statusFilter, searchQuery],
    queryFn: () => getInquiries({ status: statusFilter, search: searchQuery }),
  });

  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Innboks</h2>
          <p className="text-muted-foreground text-sm">
            {inquiries.length} forespørsler
            {newCount > 0 && ` (${newCount} nye)`}
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Søk etter navn, e-post..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter}>
        <TabsList className="flex-wrap">
          {STATUS_TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : inquiries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchQuery
                ? "Ingen forespørsler funnet med dette søket"
                : "Ingen forespørsler"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {inquiries.map((inquiry) => (
            <InquiryCard
              key={inquiry.id}
              inquiry={inquiry}
              onClick={() => setSelectedInquiry(inquiry)}
            />
          ))}
        </div>
      )}

      <Dialog 
        open={!!selectedInquiry} 
        onOpenChange={(open) => !open && setSelectedInquiry(null)}
      >
        {selectedInquiry && (
          <InquiryDetail
            inquiry={selectedInquiry}
            onClose={() => setSelectedInquiry(null)}
            onUpdate={() => {
              refetch();
              setSelectedInquiry(null);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}
