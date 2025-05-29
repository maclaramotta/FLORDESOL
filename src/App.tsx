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
import RegisterForm from "./components/auth/RegisterForm";

// Feature pages
import FeaturesOverview from "./pages/features/FeaturesOverview";
import ClientProfileFeature from "./pages/features/ClientProfile";
import AnamnesisDigital from "./pages/features/AnamnesisDigital";
import AIEvaluation from "./pages/features/AIEvaluation";
import AppointmentsAlerts from "./pages/features/AppointmentsAlerts";
import ProfessionalPanel from "./pages/features/ProfessionalPanel";
import HistoryEvolution from "./pages/features/HistoryEvolution";
import SecurityLGPD from "./pages/features/SecurityLGPD";

// Store placeholder page
const StorePage = () => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-6">Loja de Produtos</h1>
    <p className="text-xl">Em breve você poderá comprar produtos de bronzeamento e moda praia aqui!</p>
  </div>
);

// Support placeholder page
const SupportPage = () => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-6">Suporte e Chat</h1>
    <p className="text-xl">Em breve você poderá conversar com nossa equipe e tirar dúvidas aqui!</p>
  </div>
);

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
          <Route path="/register" element={<MainLayout><div className="container mx-auto px-4 py-12"><RegisterForm /></div></MainLayout>} />
          <Route path="/clients" element={<MainLayout><div className="container mx-auto px-4 py-8"><ClientProfile /></div></MainLayout>} />
          <Route path="/anamnesis" element={<MainLayout><div className="container mx-auto px-4 py-8"><AnamnesisForm clientId="mock-client-id" /></div></MainLayout>} />
          <Route path="/appointments" element={<MainLayout><div className="container mx-auto px-4 py-8"><Scheduling /></div></MainLayout>} />
          <Route path="/professionals" element={<MainLayout><div className="container mx-auto px-4 py-8"><ProfessionalDashboard /></div></MainLayout>} />
          <Route path="/store" element={<MainLayout><StorePage /></MainLayout>} />
          <Route path="/support" element={<MainLayout><SupportPage /></MainLayout>} />
          
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
