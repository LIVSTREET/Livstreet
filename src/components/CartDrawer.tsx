import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2, Mail } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { InquiryForm } from "@/components/InquiryForm";

export const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    shouldOpenDrawer,
    closeDrawer,
  } = useCartStore();

  // Listen for programmatic drawer open
  useEffect(() => {
    if (shouldOpenDrawer) {
      setIsOpen(true);
      closeDrawer();
    }
  }, [shouldOpenDrawer, closeDrawer]);
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const currencyCode = items[0]?.price.currencyCode || 'NOK';

  const handleSubmitInquiry = () => {
    setShowInquiryForm(true);
  };

  const handleCloseInquiry = () => {
    setShowInquiryForm(false);
    setIsOpen(false);
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('nb-NO', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get design data from first item if available
  const designData = items[0]?.lineItemProperties?.["Design Data"]
    ? JSON.parse(items[0].lineItemProperties["Design Data"])
    : undefined;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        
        <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
          <SheetHeader className="flex-shrink-0">
            <SheetTitle className="font-display">Forespørsel</SheetTitle>
            <SheetDescription>
              {totalItems === 0 ? "Forespørselen er tom" : `${totalItems} produkt${totalItems !== 1 ? 'er' : ''} i forespørselen`}
            </SheetDescription>
          </SheetHeader>
          
          <div className="flex flex-col flex-1 pt-6 min-h-0">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Forespørselen er tom</p>
                </div>
              </div>
            ) : (
              <>
                {/* Scrollable items area */}
                <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.variantId} className="flex gap-4 p-3 bg-muted rounded-lg">
                        <div className="w-16 h-16 bg-card rounded-md overflow-hidden flex-shrink-0">
                          {item.product.node.images?.edges?.[0]?.node && (
                            <img
                              src={item.product.node.images.edges[0].node.url}
                              alt={item.product.node.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.product.node.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {item.selectedOptions.map(option => option.value).join(' / ')}
                          </p>
                          <p className="font-semibold text-primary">
                            {formatPrice(parseFloat(item.price.amount))}
                          </p>
                          {item.lineItemProperties && Object.keys(item.lineItemProperties).length > 0 && (
                            <div className="mt-1 text-xs text-muted-foreground">
                              {Object.entries(item.lineItemProperties).slice(0, 2).map(([key, value]) => (
                                <p key={key} className="truncate">{key}: {value}</p>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeItem(item.variantId)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                          
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Fixed submit section */}
                <div className="flex-shrink-0 space-y-4 pt-4 border-t border-border bg-background">
                  <Button 
                    onClick={handleSubmitInquiry}
                    variant="hero"
                    className="w-full" 
                    size="lg"
                    disabled={items.length === 0}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send forespørsel
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <InquiryForm 
        isOpen={showInquiryForm} 
        onClose={handleCloseInquiry}
        designData={designData}
      />
    </>
  );
};
