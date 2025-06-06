import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, User, Sparkles, Clock, Tv, Award, ShoppingBag, CloudSun, Star, MessageCircle } from "lucide-react";
interface FeaturePreviewProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  path: string;
  color: string;
}
const FeaturePreview: React.FC<FeaturePreviewProps> = ({
  icon,
  title,
  description,
  path,
  color
}) => {
  return <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
      <div className={`inline-flex p-3 rounded-full mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button variant="outline" size="sm" className="text-bronze-700" asChild>
        <Link to={path}>Saiba mais</Link>
      </Button>
    </div>;
};
const FeaturePreviewSection = () => {
  const features = [{
    icon: <Calendar className="h-6 w-6 text-white" />,
    title: "Agendamento Inteligente",
    description: "Agende horários com confirmação automática e lembretes personalizados.",
    path: "/appointments",
    color: "bg-amber-500"
  }, {
    icon: <User className="h-6 w-6 text-white" />,
    title: "Perfil do Cliente",
    description: "Gerencie sua ficha de anamnese digital e histórico de bronzeamentos.",
    path: "/clients",
    color: "bg-bronze-500"
  }, {
    icon: <Sparkles className="h-6 w-6 text-white" />,
    title: "Painel Profissional",
    description: "Visualize agenda e histórico de clientes com facilidade.",
    path: "/professionals",
    color: "bg-orange-500"
  }, {
    icon: <Tv className="h-6 w-6 text-white" />,
    title: "Simulador de Bronze",
    description: "Visualize como ficará seu bronzeado com diferentes moldes e estilos.",
    path: "/features/ai-evaluation",
    color: "bg-amber-600"
  }, {
    icon: <Award className="h-6 w-6 text-white" />,
    title: "Programa de Fidelidade",
    description: "Acumule pontos e ganhe recompensas a cada sessão.",
    path: "/features/client-profile",
    color: "bg-amber-400"
  }, {
    icon: <Clock className="h-6 w-6 text-white" />,
    title: "Cuidados e Conteúdo",
    description: "Dicas pré e pós-bronzeamento para resultados perfeitos.",
    path: "/features/security",
    color: "bg-bronze-600"
  }];
  const extraFeatures = [{
    icon: <ShoppingBag className="h-6 w-6 text-bronze-800" />,
    title: "Loja Integrada",
    description: "Produtos de bronzeamento e moda praia personalizados para seu perfil."
  }, {
    icon: <CloudSun className="h-6 w-6 text-bronze-800" />,
    title: "Clima e Localização",
    description: "Previsão do tempo e sugestões dos melhores dias para bronzeamento."
  }, {
    icon: <Star className="h-6 w-6 text-bronze-800" />,
    title: "Comunidade e Avaliações",
    description: "Compartilhe experiências e veja resultados de outros clientes."
  }, {
    icon: <MessageCircle className="h-6 w-6 text-bronze-800" />,
    title: "Chat e Suporte",
    description: "Tire dúvidas e receba suporte rápido pelo app ou WhatsApp."
  }];
  return <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      
    </section>;
};
export default FeaturePreviewSection;