import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import Index from "./pages/Index";
import Komponer from "./pages/Komponer";
import Informasjon from "./pages/Informasjon";
import MonteringVedlikehold from "./pages/artikler/MonteringVedlikehold";
import Baerekraft from "./pages/artikler/Baerekraft";
import Symboler from "./pages/artikler/Symboler";
import HvaSkjerEtterpa from "./pages/artikler/HvaSkjerEtterpa";
import OmOss from "./pages/OmOss";
import Kontakt from "./pages/Kontakt";
import Bestill from "./pages/Bestill";
import Personvern from "./pages/Personvern";
import Kjopsvilkar from "./pages/Kjopsvilkar";
import GarantiKvalitet from "./pages/GarantiKvalitet";
import NotFound from "./pages/NotFound";
import Admin from "./pages/admin/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/komponer" element={<Komponer />} />
            <Route path="/informasjon" element={<Informasjon />} />
            <Route path="/informasjon/montering-vedlikehold" element={<MonteringVedlikehold />} />
            <Route path="/informasjon/miljovennlig" element={<Baerekraft />} />
            <Route path="/informasjon/symboler" element={<Symboler />} />
            <Route path="/informasjon/hva-skjer-etterpa" element={<HvaSkjerEtterpa />} />
            <Route path="/om-oss" element={<OmOss />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/bestill" element={<Bestill />} />
            <Route path="/personvern" element={<Personvern />} />
            <Route path="/kjopsvilkar" element={<Kjopsvilkar />} />
            <Route path="/garanti-kvalitet" element={<GarantiKvalitet />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
