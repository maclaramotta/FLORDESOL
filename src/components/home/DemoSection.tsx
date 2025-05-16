
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DemoTabContent from "./DemoTabContent";

const DemoSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Conheça a Plataforma</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore as principais funcionalidades do sistema
          </p>
        </div>

        <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Perfil e Anamnese</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="dashboard">Painel Profissional</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <DemoTabContent 
              title="Perfil do Cliente" 
              description="Visualização do módulo de cadastro de cliente e teste de tipo de pele"
              icon="👤"
              detailText="Cadastre clientes com fotos e informações pessoais, realize o teste guiado para determinar o tipo de pele segundo a Escala Fitzpatrick, e preencha anamneses digitais com alertas automáticos para contraindicações."
              linkUrl="/features/client-profile"
            />
          </TabsContent>
          
          <TabsContent value="appointments" className="mt-6">
            <DemoTabContent 
              title="Sistema de Agendamento" 
              description="Visualização do calendário de agendamentos e notificações"
              icon="📅"
              detailText="Agende sessões de bronzeamento, envie lembretes automáticos para os clientes, e forneça instruções personalizadas para antes e depois do procedimento."
              linkUrl="/features/appointments"
            />
          </TabsContent>
          
          <TabsContent value="dashboard" className="mt-6">
            <DemoTabContent 
              title="Painel do Profissional" 
              description="Visualização do dashboard com informações e métricas"
              icon="📊"
              detailText="Acompanhe o tempo mínimo entre sessões baseado no tipo de pele, registre avaliações de satisfação, mantenha um histórico completo de cada cliente, e tenha acesso a métricas importantes para o seu negócio."
              linkUrl="/features/professional"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DemoSection;
