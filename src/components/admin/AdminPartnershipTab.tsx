import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Mail,
  Phone,
  Plus,
  Loader2,
  CalendarClock,
  Building2,
  Archive,
} from "lucide-react";
import { toast } from "sonner";
import {
  getPartnershipContacts,
  createPartnershipContact,
  updatePartnershipContact,
  PartnershipContact,
  PartnershipContactInput,
  ContactStatus,
  STATUS_LABELS,
  STATUS_COLORS,
  METHOD_LABELS,
  CONTACT_TYPES,
  TOPICS,
  formatDate,
} from "@/lib/partnershipContacts";

const STATUS_FILTER_TABS = [
  { value: "all", label: "Alle" },
  { value: "cold", label: "Kald" },
  { value: "pending", label: "Ventende" },
  { value: "warm", label: "Varm" },
];

const EMPTY_FORM: PartnershipContactInput = {
  name: "",
  organization: "",
  title: "",
  type: "",
  phone: "",
  email: "",
  contacted: false,
  contact_method: undefined,
  status: "cold",
  last_contact_date: undefined,
  follow_up_date: undefined,
  next_step: "",
  archived: false,
  topic_price: false,
  topic_existing_supplier: false,
  topic_quality: false,
  topic_customization: false,
  topic_delivery: false,
  topic_commission: false,
  topic_exclusivity: false,
  topic_demo_interest: false,
  topic_wants_followup: false,
  their_needs: "",
  our_offer: "",
  notes: "",
};

function ContactCard({
  contact,
  onClick,
}: {
  contact: PartnershipContact;
  onClick: () => void;
}) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold">{contact.name}</p>
            {contact.organization && (
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {contact.organization}
              </p>
            )}
          </div>
          {contact.type && (
            <Badge variant="outline" className="text-xs shrink-0">
              {contact.type}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-1 hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="w-3 h-3" />
              {contact.phone}
            </a>
          )}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-1 hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <Mail className="w-3 h-3" />
              {contact.email}
            </a>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          <Badge className={`${STATUS_COLORS[contact.status]} text-white text-xs`}>
            {STATUS_LABELS[contact.status]}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {contact.contacted ? "Kontaktet" : "Ikke kontaktet"}
          </Badge>
          {contact.contact_method && (
            <Badge variant="secondary" className="text-xs">
              {METHOD_LABELS[contact.contact_method]}
            </Badge>
          )}
        </div>

        {contact.follow_up_date && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <CalendarClock className="w-3 h-3" />
            {formatDate(contact.follow_up_date)}
          </p>
        )}

        {contact.next_step && (
          <p className="text-sm text-muted-foreground border-t pt-2 mt-1">
            → {contact.next_step}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function ContactForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: {
  initial: PartnershipContactInput;
  onSave: (data: PartnershipContactInput) => void;
  onCancel: () => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState(initial);

  const set = (field: keyof PartnershipContactInput, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
      {/* Seksjon 1: Basisinfo */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Basisinfo
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Navn *</Label>
            <Input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Fornavn Etternavn"
            />
          </div>
          <div className="space-y-1">
            <Label>Virksomhet</Label>
            <Input
              value={form.organization ?? ""}
              onChange={(e) => set("organization", e.target.value)}
              placeholder="Firmanavn"
            />
          </div>
          <div className="space-y-1">
            <Label>Tittel / rolle</Label>
            <Input
              value={form.title ?? ""}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Daglig leder, eier..."
            />
          </div>
          <div className="space-y-1">
            <Label>Type</Label>
            <Select value={form.type ?? ""} onValueChange={(v) => set("type", v)}>
              <SelectTrigger>
                <SelectValue placeholder="Velg type" />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Telefon</Label>
            <Input
              value={form.phone ?? ""}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+47 000 00 000"
            />
          </div>
          <div className="space-y-1">
            <Label>E-post</Label>
            <Input
              value={form.email ?? ""}
              onChange={(e) => set("email", e.target.value)}
              placeholder="navn@firma.no"
            />
          </div>
        </div>
      </div>

      {/* Seksjon 2: Kontaktstatus */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Kontaktstatus
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => set("status", v as ContactStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cold">Kald</SelectItem>
                <SelectItem value="pending">Ventende</SelectItem>
                <SelectItem value="warm">Varm</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Kontaktmetode</Label>
            <Select
              value={form.contact_method ?? ""}
              onValueChange={(v) => set("contact_method", v || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Velg metode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">E-post</SelectItem>
                <SelectItem value="phone">Telefon</SelectItem>
                <SelectItem value="meeting">Møte</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label>Sist kontaktet</Label>
            <Input
              type="date"
              value={form.last_contact_date?.slice(0, 10) ?? ""}
              onChange={(e) =>
                set(
                  "last_contact_date",
                  e.target.value ? e.target.value + "T00:00:00Z" : undefined
                )
              }
            />
          </div>
          <div className="space-y-1">
            <Label>Oppfølgingsdato</Label>
            <Input
              type="date"
              value={form.follow_up_date?.slice(0, 10) ?? ""}
              onChange={(e) =>
                set(
                  "follow_up_date",
                  e.target.value ? e.target.value + "T00:00:00Z" : undefined
                )
              }
            />
          </div>
          <div className="space-y-1 sm:col-span-2">
            <Label>Neste steg</Label>
            <Input
              value={form.next_step ?? ""}
              onChange={(e) => set("next_step", e.target.value)}
              placeholder="f.eks. Send priseksempel, ring etter påske..."
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="contacted"
            checked={form.contacted}
            onCheckedChange={(v) => set("contacted", !!v)}
          />
          <Label htmlFor="contacted" className="font-normal">Kontaktet</Label>
        </div>
      </div>

      {/* Seksjon 3: Samtaleskjema */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Samtaleskjema
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {TOPICS.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-2">
              <Checkbox
                id={key}
                checked={!!form[key]}
                onCheckedChange={(v) => set(key, !!v)}
              />
              <Label htmlFor={key} className="font-normal text-sm">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Seksjon 4: Fritekst */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
          Fritekst
        </h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label>Deres behov</Label>
            <Textarea
              value={form.their_needs ?? ""}
              onChange={(e) => set("their_needs", e.target.value)}
              placeholder="Hva snakket de om, hva trenger de?"
              rows={2}
            />
          </div>
          <div className="space-y-1">
            <Label>Hva vi tilbyr</Label>
            <Textarea
              value={form.our_offer ?? ""}
              onChange={(e) => set("our_offer", e.target.value)}
              placeholder="Hva presenterte du?"
              rows={2}
            />
          </div>
          <div className="space-y-1">
            <Label>Notater</Label>
            <Textarea
              value={form.notes ?? ""}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Andre notater..."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Arkiver */}
      <div className="flex items-center gap-2 border-t pt-4">
        <Checkbox
          id="archived"
          checked={form.archived}
          onCheckedChange={(v) => set("archived", !!v)}
        />
        <Label htmlFor="archived" className="font-normal flex items-center gap-1">
          <Archive className="w-3 h-3" />
          Arkiver kontakt
        </Label>
      </div>

      {/* Knapper */}
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel} disabled={isSaving}>
          Avbryt
        </Button>
        <Button
          onClick={() => onSave(form)}
          disabled={!form.name.trim() || isSaving}
        >
          {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Lagre
        </Button>
      </div>
    </div>
  );
}

export function AdminPartnershipTab() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<PartnershipContact | null>(null);

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["partnership_contacts", statusFilter, searchQuery],
    queryFn: () =>
      getPartnershipContacts({ status: statusFilter, search: searchQuery }),
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["partnership_contacts"] });

  const createMutation = useMutation({
    mutationFn: createPartnershipContact,
    onSuccess: () => {
      toast.success("Kontakt opprettet");
      invalidate();
      setDialogOpen(false);
    },
    onError: () => toast.error("Kunne ikke opprette kontakt"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PartnershipContactInput> }) =>
      updatePartnershipContact(id, data),
    onSuccess: () => {
      toast.success("Kontakt oppdatert");
      invalidate();
      setDialogOpen(false);
      setSelected(null);
    },
    onError: () => toast.error("Kunne ikke oppdatere kontakt"),
  });

  const isSaving = createMutation.isPending || updateMutation.isPending;

  const handleSave = (data: PartnershipContactInput) => {
    if (selected) {
      updateMutation.mutate({ id: selected.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const openCreate = () => {
    setSelected(null);
    setDialogOpen(true);
  };

  const openEdit = (contact: PartnershipContact) => {
    setSelected(contact);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Samarbeidspartnere</h2>
          <p className="text-muted-foreground text-sm">
            {contacts.length} kontakter
          </p>
        </div>
        <Button onClick={openCreate} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Ny kontakt
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Søk navn, virksomhet, e-post..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1">
          {STATUS_FILTER_TABS.map((tab) => (
            <Button
              key={tab.value}
              variant={statusFilter === tab.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(tab.value)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Liste */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : contacts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {searchQuery
                ? "Ingen kontakter funnet med dette søket"
                : "Ingen samarbeidspartnere ennå"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onClick={() => openEdit(contact)}
            />
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selected ? "Rediger kontakt" : "Ny samarbeidspartner"}
            </DialogTitle>
          </DialogHeader>
          <ContactForm
            initial={
              selected
                ? {
                    name: selected.name,
                    organization: selected.organization,
                    title: selected.title,
                    type: selected.type,
                    phone: selected.phone,
                    email: selected.email,
                    contacted: selected.contacted,
                    contact_method: selected.contact_method,
                    status: selected.status,
                    last_contact_date: selected.last_contact_date,
                    follow_up_date: selected.follow_up_date,
                    next_step: selected.next_step,
                    archived: selected.archived,
                    topic_price: selected.topic_price,
                    topic_existing_supplier: selected.topic_existing_supplier,
                    topic_quality: selected.topic_quality,
                    topic_customization: selected.topic_customization,
                    topic_delivery: selected.topic_delivery,
                    topic_commission: selected.topic_commission,
                    topic_exclusivity: selected.topic_exclusivity,
                    topic_demo_interest: selected.topic_demo_interest,
                    topic_wants_followup: selected.topic_wants_followup,
                    their_needs: selected.their_needs,
                    our_offer: selected.our_offer,
                    notes: selected.notes,
                  }
                : EMPTY_FORM
            }
            onSave={handleSave}
            onCancel={() => {
              setDialogOpen(false);
              setSelected(null);
            }}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
