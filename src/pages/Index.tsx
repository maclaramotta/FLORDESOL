
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const features = [
    {
      title: "Perfil do Cliente",
      description:
        "Cadastro completo com foto, informações pessoais e avaliação de tipo de pele através de teste guiado pelo app.",
      icon: "👤",
    },
    {
      title: "Anamnese Digital",
      description:
        "Formulário dinâmico que identifica contraindicações e gera alertas automáticos para garantir a segurança do cliente.",
      icon: "📝",
    },
    {
      title: "IA Personalizada",
      description:
        "Recomendações personalizadas de bronzeamento baseadas no tipo de pele e histórico do cliente.",
      icon: "🤖",
    },
    {
      title: "Agendamento Inteligente",
      description:
        "Sistema integrado de agendamento com lembretes automáticos e instruções para antes e depois do bronzeamento.",
      icon: "📅",
    },
    {
      title: "Painel Profissional",
      description:
        "Controle de tempos mínimos entre sessões, avaliações de satisfação e histórico completo dos clientes.",
      icon: "📊",
    },
    {
      title: "Segurança LGPD",
      description:
        "Dados criptografados e armazenados com consentimento, seguindo todas as normas da LGPD.",
      icon: "🔒",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 shine-gradient animate-shine"></div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
                BronzeSun
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-700">
              Sistema completo para gestão de clientes e bronzeamento seguro
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-bronze-500 hover:bg-bronze-600" asChild>
                <Link to="/login">Fazer Login</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Registrar-se</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
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
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden shadow-inner">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
                      <div className="text-center p-8">
                        <div className="text-5xl mb-4">👤</div>
                        <h3 className="text-xl font-medium mb-2">Perfil do Cliente</h3>
                        <p className="text-gray-600">
                          Visualização do módulo de cadastro de cliente e teste de tipo de pele
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Cadastre clientes com fotos e informações pessoais, realize o teste guiado para determinar o tipo de pele segundo a Escala Fitzpatrick, e preencha anamneses digitais com alertas automáticos para contraindicações.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="appointments" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden shadow-inner">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
                      <div className="text-center p-8">
                        <div className="text-5xl mb-4">📅</div>
                        <h3 className="text-xl font-medium mb-2">Sistema de Agendamento</h3>
                        <p className="text-gray-600">
                          Visualização do calendário de agendamentos e notificações
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Agende sessões de bronzeamento, envie lembretes automáticos para os clientes, e forneça instruções personalizadas para antes e depois do procedimento.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="dashboard" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden shadow-inner">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
                      <div className="text-center p-8">
                        <div className="text-5xl mb-4">📊</div>
                        <h3 className="text-xl font-medium mb-2">Painel do Profissional</h3>
                        <p className="text-gray-600">
                          Visualização do dashboard com informações e métricas
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Acompanhe o tempo mínimo entre sessões baseado no tipo de pele, registre avaliações de satisfação, mantenha um histórico completo de cada cliente, e tenha acesso a métricas importantes para o seu negócio.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bronze-500 to-bronze-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para revolucionar seu salão de bronzeamento?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de profissionais que já estão utilizando nossa plataforma para oferecer um serviço mais seguro e personalizado.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-bronze-700 hover:bg-gray-100" asChild>
            <Link to="/register">Comece agora</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BronzeSun</h3>
              <p className="text-gray-400">
                Sistema completo para gestão de salões de bronzeamento
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-400 hover:text-white">
                    Registro
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-400 hover:text-white">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link to="/lgpd" className="text-gray-400 hover:text-white">
                    LGPD
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <address className="text-gray-400 not-italic">
                <p>contato@bronzesun.com.br</p>
                <p>+55 (11) 99999-9999</p>
                <p>São Paulo, SP - Brasil</p>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} BronzeSun. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
