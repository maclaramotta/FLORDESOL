
import React from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  FileText, 
  ChartBar, 
  Calendar, 
  Clock, 
  History, 
  ShieldCheck,
  BadgeCheck,
  ShoppingBag,
  Sun,
  MessageSquare,
  MapPin,
  CheckCircle,
  BookOpen
} from "lucide-react";
import { FeatureInfo } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesOverview = () => {
  const mainFeatures: FeatureInfo[] = [
    {
      title: "Perfil do Cliente",
      description: "Cadastro com foto, informações pessoais, tipo de pele e histórico completo de bronzeamento.",
      icon: <User className="h-8 w-8 text-bronze-500" />,
      path: "/features/client-profile"
    },
    {
      title: "Anamnese Digital",
      description: "Formulário de saúde com alertas automáticos para contraindicações e assinatura digital.",
      icon: <FileText className="h-8 w-8 text-bronze-500" />,
      path: "/features/anamnesis"
    },
    {
      title: "IA Personalizada",
      description: "Sugestões inteligentes de bronzeamento baseadas no tipo de pele e histórico.",
      icon: <ChartBar className="h-8 w-8 text-bronze-500" />,
      path: "/features/ai-evaluation"
    },
    {
      title: "Agenda Inteligente",
      description: "Marcação de horários com confirmação automática e opções de reagendamento simples.",
      icon: <Calendar className="h-8 w-8 text-bronze-500" />,
      path: "/features/appointments"
    },
    {
      title: "Painel Profissional",
      description: "Visualização do cronograma, histórico de clientes e controle de materiais por atendimento.",
      icon: <Clock className="h-8 w-8 text-bronze-500" />,
      path: "/features/professional"
    },
    {
      title: "Histórico e Evolução",
      description: "Registro completo de anamneses, fotos antes/depois e anotações profissionais.",
      icon: <History className="h-8 w-8 text-bronze-500" />,
      path: "/features/history"
    },
    {
      title: "Segurança e LGPD",
      description: "Dados criptografados e armazenados com consentimento conforme a LGPD.",
      icon: <ShieldCheck className="h-8 w-8 text-bronze-500" />,
      path: "/features/security"
    }
  ];

  const premiumFeatures: FeatureInfo[] = [
    {
      title: "Simulador de Bronze",
      description: "Ferramenta com IA para visualizar como ficará o bronzeado e escolher moldes e estilos.",
      icon: <Sun className="h-8 w-8 text-bronze-500" />,
      path: "/features/simulator"
    },
    {
      title: "Programa de Fidelidade",
      description: "Pontuação automática por sessão com descontos ou brindes ao acumular pontos.",
      icon: <BadgeCheck className="h-8 w-8 text-bronze-500" />,
      path: "/features/loyalty"
    },
    {
      title: "Loja de Produtos",
      description: "Venda de produtos personalizados conforme o perfil do cliente.",
      icon: <ShoppingBag className="h-8 w-8 text-bronze-500" />,
      path: "/features/shop"
    },
    {
      title: "Conteúdo Educativo",
      description: "Blog e vídeos com dicas sobre cuidados com a pele e tendências de bronzeamento.",
      icon: <BookOpen className="h-8 w-8 text-bronze-500" />,
      path: "/features/content"
    },
    {
      title: "Avaliações e Fotos",
      description: "Espaço para clientes avaliarem o serviço e compartilharem resultados.",
      icon: <History className="h-8 w-8 text-bronze-500" />,
      path: "/features/reviews"
    },
    {
      title: "Mapa com Clima Local",
      description: "Previsão do tempo para programação e indicação de dias favoráveis para o bronzeamento.",
      icon: <MapPin className="h-8 w-8 text-bronze-500" />,
      path: "/features/weather"
    },
    {
      title: "Check-in Online",
      description: "Confirmação de presença pelo app sem necessidade de contato.",
      icon: <CheckCircle className="h-8 w-8 text-bronze-500" />,
      path: "/features/checkin"
    },
    {
      title: "Atendimento via Chat",
      description: "Canal de dúvidas com chatbot ou integração ao WhatsApp da empresa.",
      icon: <MessageSquare className="h-8 w-8 text-bronze-500" />,
      path: "/features/chat"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              Recursos do BronzeSun
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Conheça todas as funcionalidades que desenvolvemos para tornar o processo de bronzeamento mais seguro, 
            eficiente e personalizado para você.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-6 px-2">Recursos Principais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mainFeatures.map((feature, index) => (
            <Link to={feature.path} key={index} className="block hover:no-underline group">
              <Card className="h-full hover:shadow-md transition-shadow duration-300 group-hover:border-bronze-300">
                <CardContent className="pt-6">
                  <div className="rounded-full w-16 h-16 flex items-center justify-center bg-bronze-50 mb-4 group-hover:bg-bronze-100 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-bronze-700 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="bg-bronze-50 p-8 rounded-xl mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Diferenciais Premium</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumFeatures.map((feature, index) => (
              <Link to={feature.path} key={index} className="block hover:no-underline group">
                <Card className="h-full hover:shadow-md transition-shadow duration-300 group-hover:border-bronze-300 bg-white">
                  <CardContent className="pt-6">
                    <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bronze-50 mb-3 group-hover:bg-bronze-100 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-bronze-700 transition-colors">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link to="/appointments">
            <button className="bg-bronze-600 hover:bg-bronze-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Agende Seu Bronzeamento
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesOverview;
