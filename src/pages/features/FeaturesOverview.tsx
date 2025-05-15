
import React from "react";
import { Link } from "react-router-dom";
import { User, FileText, ChartBar, Calendar, Clock, History, ShieldCheck } from "lucide-react";
import { FeatureInfo } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesOverview = () => {
  const features: FeatureInfo[] = [
    {
      title: "Perfil do Cliente",
      description: "Cadastro com foto, informações pessoais e teste guiado para identificar seu tipo de pele.",
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
      title: "Agenda e Alertas",
      description: "Agendamento fácil com lembretes automáticos e orientações personalizadas.",
      icon: <Calendar className="h-8 w-8 text-bronze-500" />,
      path: "/features/appointments"
    },
    {
      title: "Painel Profissional",
      description: "Ferramentas para controle de tempo entre sessões, anotações e pesquisas de satisfação.",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
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
      </div>
    </div>
  );
};

export default FeaturesOverview;
