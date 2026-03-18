import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import AdminSidebar from "@/components/AdminSidebar";
import Index from "./pages/Index.tsx";
import OmOss from "./pages/OmOss.tsx";
import Prepress from "./pages/Prepress.tsx";
import Miljo from "./pages/Miljo.tsx";
import Kontakt from "./pages/Kontakt.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/om-oss" element={<OmOss />} />
            <Route path="/prepress" element={<Prepress />} />
            <Route path="/miljo" element={<Miljo />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <AdminSidebar />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
