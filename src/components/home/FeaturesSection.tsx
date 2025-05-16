
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  const features = [{
    title: "Perfil do Cliente",
    description: "Cadastro completo com foto, informações pessoais e avaliação de tipo de pele através de teste guiado pelo app.",
    icon: "👤"
  }, {
    title: "Anamnese Digital",
    description: "Formulário dinâmico que identifica contraindicações e gera alertas automáticos para garantir a segurança do cliente.",
    icon: "📝"
  }, {
    title: "IA Personalizada",
    description: "Recomendações personalizadas de bronzeamento baseadas no tipo de pele e histórico do cliente.",
    icon: "🤖"
  }, {
    title: "Agendamento Inteligente",
    description: "Sistema integrado de agendamento com lembretes automáticos e instruções para antes e depois do bronzeamento.",
    icon: "📅"
  }, {
    title: "Painel Profissional",
    description: "Controle de tempos mínimos entre sessões, avaliações de satisfação e histórico completo dos clientes.",
    icon: "📊"
  }, {
    title: "Segurança LGPD",
    description: "Dados criptografados e armazenados com consentimento, seguindo todas as normas da LGPD.",
    icon: "🔒"
  }];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Recursos do Sistema</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Uma plataforma completa para gerenciar clientes de bronzeamento com segurança e eficiência
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              title={feature.title} 
              description={feature.description} 
              icon={feature.icon} 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-bronze-500 hover:bg-bronze-600" size="lg" asChild>
            <Link to="/features">Ver todas as funcionalidades</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
