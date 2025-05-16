
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
import Scheduling from "./pages/Scheduling";

// Feature pages
import FeaturesOverview from "./pages/features/FeaturesOverview";
import ClientProfileFeature from "./pages/features/ClientProfile";
import AnamnesisDigital from "./pages/features/AnamnesisDigital";
import AIEvaluation from "./pages/features/AIEvaluation";
import AppointmentsAlerts from "./pages/features/AppointmentsAlerts";
import ProfessionalPanel from "./pages/features/ProfessionalPanel";
import HistoryEvolution from "./pages/features/HistoryEvolution";
import SecurityLGPD from "./pages/features/SecurityLGPD";

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
          <Route path="/appointments" element={<MainLayout><div className="container mx-auto px-4 py-8"><Scheduling /></div></MainLayout>} />
          <Route path="/professionals" element={<MainLayout><div className="container mx-auto px-4 py-8"><ProfessionalDashboard /></div></MainLayout>} />
          
          {/* Feature pages */}
          <Route path="/features" element={<MainLayout><FeaturesOverview /></MainLayout>} />
          <Route path="/features/client-profile" element={<MainLayout><ClientProfileFeature /></MainLayout>} />
          <Route path="/features/anamnesis" element={<MainLayout><AnamnesisDigital /></MainLayout>} />
          <Route path="/features/ai-evaluation" element={<MainLayout><AIEvaluation /></MainLayout>} />
          <Route path="/features/appointments" element={<MainLayout><AppointmentsAlerts /></MainLayout>} />
          <Route path="/features/professional" element={<MainLayout><ProfessionalPanel /></MainLayout>} />
          <Route path="/features/history" element={<MainLayout><HistoryEvolution /></MainLayout>} />
          <Route path="/features/security" element={<MainLayout><SecurityLGPD /></MainLayout>} />
          
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
