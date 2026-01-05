import { ReactNode, useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { InquiryForm } from "@/components/InquiryForm";
import { useCartStore } from "@/stores/cartStore";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const { 
    items,
    shouldOpenInquiryForm, 
    closeInquiryForm 
  } = useCartStore();

  // Listen for programmatic inquiry form open
  useEffect(() => {
    if (shouldOpenInquiryForm) {
      setShowInquiryForm(true);
      closeInquiryForm();
    }
  }, [shouldOpenInquiryForm, closeInquiryForm]);

  // Get design data from first cart item if available
  const designData = items[0]?.lineItemProperties?.["Design Data"]
    ? JSON.parse(items[0].lineItemProperties["Design Data"])
    : undefined;

  const handleCloseInquiry = () => {
    setShowInquiryForm(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      
      {/* Global InquiryForm - can be opened from anywhere */}
      <InquiryForm 
        isOpen={showInquiryForm} 
        onClose={handleCloseInquiry}
        designData={designData}
      />
    </div>
  );
}