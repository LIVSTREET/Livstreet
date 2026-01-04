import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Gravsteiner from "./pages/Gravsteiner";
import Komponer from "./pages/Komponer";
import Informasjon from "./pages/Informasjon";
import OmOss from "./pages/OmOss";
import Kontakt from "./pages/Kontakt";
import Bestill from "./pages/Bestill";
import Personvern from "./pages/Personvern";
import Kjopsvilkar from "./pages/Kjopsvilkar";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gravsteiner" element={<Gravsteiner />} />
          <Route path="/komponer" element={<Komponer />} />
          <Route path="/informasjon" element={<Informasjon />} />
          <Route path="/om-oss" element={<OmOss />} />
          <Route path="/kontakt" element={<Kontakt />} />
          <Route path="/bestill" element={<Bestill />} />
          <Route path="/personvern" element={<Personvern />} />
          <Route path="/kjopsvilkar" element={<Kjopsvilkar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
