
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientProfile from "./components/client/ClientProfile";
import AnamnesisForm from "./components/anamnesis/AnamnesisForm";
import LoginForm from "./components/auth/LoginForm";
import AppointmentScheduler from "./components/appointments/AppointmentScheduler";
import ProfessionalDashboard from "./components/professional/ProfessionalDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Index /></MainLayout>} />
          <Route path="/login" element={<MainLayout><div className="container mx-auto px-4 py-12"><LoginForm /></div></MainLayout>} />
          <Route path="/register" element={<MainLayout><div className="container mx-auto px-4 py-12">Página de registro</div></MainLayout>} />
          <Route path="/clients" element={<MainLayout><div className="container mx-auto px-4 py-8"><ClientProfile /></div></MainLayout>} />
          <Route path="/anamnesis" element={<MainLayout><div className="container mx-auto px-4 py-8"><AnamnesisForm clientId="mock-client-id" /></div></MainLayout>} />
          <Route path="/appointments" element={<MainLayout><div className="container mx-auto px-4 py-8"><AppointmentScheduler /></div></MainLayout>} />
          <Route path="/professionals" element={<MainLayout><div className="container mx-auto px-4 py-8"><ProfessionalDashboard /></div></MainLayout>} />
          <Route path="/privacy" element={<MainLayout><div className="container mx-auto px-4 py-12">Política de Privacidade</div></MainLayout>} />
          <Route path="/terms" element={<MainLayout><div className="container mx-auto px-4 py-12">Termos de Uso</div></MainLayout>} />
          <Route path="/lgpd" element={<MainLayout><div className="container mx-auto px-4 py-12">LGPD</div></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
