import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Loader2, Info, Check } from "lucide-react";
import { toast } from "sonner";
import { PRICING } from "@/lib/constants";
import { useCartStore } from "@/stores/cartStore";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DesignData {
  frame: string;
  placedSymbols?: Array<{
    id: string;
    symbolId: string;
    categoryId: string;
    pos: { x: number; y: number };
    size: number;
  }>;
  elements?: {
    name1?: { text: string; pos: { x: number; y: number }; size: number };
    dates1?: { text: string; pos: { x: number; y: number }; size: number };
    name2?: { text: string; pos: { x: number; y: number }; size: number };
    dates2?: { text: string; pos: { x: number; y: number }; size: number };
    etterskrift?: { text: string; pos: { x: number; y: number }; size: number };
  };
}

interface InquiryFormProps {
  designData?: DesignData;
  onClose?: () => void;
  isOpen: boolean;
}

export function InquiryForm({ designData, onClose, isOpen }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const clearCart = useCartStore(state => state.clearCart);
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    description: "",
  });
  
  const [maintenanceSelected, setMaintenanceSelected] = useState(false);
  const [installationSelected, setInstallationSelected] = useState(false);

  const basePrice = PRICING.BASE_PRICE;
  const maintenancePrice = maintenanceSelected ? PRICING.MAINTENANCE_PRICE : 0;
  const totalPrice = basePrice + maintenancePrice;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build inquiry data
    const inquiryData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address || null,
      description: formData.description,
      maintenanceSelected,
      installationOsloSelected: installationSelected,
      basePrice: PRICING.BASE_PRICE,
      maintenancePrice: maintenanceSelected ? PRICING.MAINTENANCE_PRICE : 0,
      totalPrice,
      designData: designData || null,
      status: "Forespørsel mottatt",
      createdAt: new Date().toISOString(),
    };

    // TODO: Send to backend API
    console.log("Inquiry submitted:", inquiryData);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Send email confirmation to user
    console.log("Email confirmation would be sent to:", formData.email);

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Clear cart if this was opened from cart
    if (designData) {
      clearCart();
    }

    toast.success("Forespørsel sendt!", {
      description: "Vi tar kontakt for å gå gjennom design og detaljer.",
    });
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      description: "",
    });
    setMaintenanceSelected(false);
    setInstallationSelected(false);
    onClose?.();
  };

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-accent" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-2">
              Takk for forespørselen!
            </h2>
            <p className="text-muted-foreground mb-4">
              Vi tar kontakt for å gå gjennom design, detaljer og videre prosess.
            </p>
            <p className="text-sm text-muted-foreground">
              En bekreftelse er sendt til {formData.email}
            </p>
            <Button onClick={handleClose} className="mt-6">
              Lukk
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Send forespørsel</DialogTitle>
          <DialogDescription>
            Fyll ut skjemaet så tar vi kontakt for å fullføre bestillingen.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Design summary */}
          <div className="p-4 bg-muted rounded-lg">
            {designData ? (
              <div className="space-y-1">
                <p className="text-sm font-medium">Design inkludert</p>
                <p className="text-xs text-muted-foreground">
                  Ramme: {designData.frame || "Ingen"} • 
                  Symboler: {designData.placedSymbols?.length || 0} stk
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-medium">Ingen design lastet</p>
                <p className="text-xs text-muted-foreground">
                  Vi hjelper deg med design etter forespørsel
                </p>
              </div>
            )}
          </div>

          {/* Contact info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="name">Navn *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ditt navn"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Telefon *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+47 123 45 678"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">E-post *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="din@epost.no"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Adresse (valgfritt)</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Gateadresse, postnummer og sted"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Beskrivelse av forespørsel *</Label>
            <Textarea
              id="description"
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Fortell oss om dine ønsker for gravplaten..."
            />
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border">
              <Checkbox
                id="maintenance"
                checked={maintenanceSelected}
                onCheckedChange={(checked) => setMaintenanceSelected(checked === true)}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Label htmlFor="maintenance" className="font-medium cursor-pointer">
                    Vedlikehold og full garanti (20 år)
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Full garanti i 20 år forutsetter gjennomført vedlikehold hos produsent. Vedlikehold kan også bestilles senere, men dette kan påvirke garantien.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <p className="text-sm text-accent font-medium mt-0.5">
                  +{formatPrice(PRICING.MAINTENANCE_PRICE)}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 rounded-lg border border-border">
              <Checkbox
                id="installation"
                checked={installationSelected}
                onCheckedChange={(checked) => setInstallationSelected(checked === true)}
              />
              <div className="flex-1">
                <Label htmlFor="installation" className="font-medium cursor-pointer">
                  Ønsker gratis montering i Oslo-området
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Gratis montering tilbys i oppstartsfasen i Oslo-området. Tilgjengelighet bekreftes etter forespørsel.
                </p>
                <p className="text-sm text-accent font-medium mt-0.5">
                  {formatPrice(PRICING.INSTALLATION_PRICE)}
                </p>
              </div>
            </div>
          </div>

          {/* Price summary */}
          <div className="bg-primary text-primary-foreground p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Standard gravplate</span>
              <span>{formatPrice(basePrice)}</span>
            </div>
            {maintenanceSelected && (
              <div className="flex justify-between text-sm">
                <span>Vedlikehold (20 år)</span>
                <span>+{formatPrice(PRICING.MAINTENANCE_PRICE)}</span>
              </div>
            )}
            {installationSelected && (
              <div className="flex justify-between text-sm">
                <span>Montering Oslo</span>
                <span>{formatPrice(PRICING.INSTALLATION_PRICE)}</span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-primary-foreground/20">
              <span className="font-semibold">Total forespørselspris</span>
              <span className="text-xl font-bold">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-primary-foreground/70 pt-2">
              Dette er en forespørsel. Endelig bestilling bekreftes etter dialog.
            </p>
          </div>

          <Button
            type="submit"
            variant="hero"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sender forespørsel...
              </>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Send forespørsel
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
