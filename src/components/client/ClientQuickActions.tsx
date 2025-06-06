
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, MapPin, MessageCircle, User, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const ClientQuickActions = () => {
  const whatsappNumber = "5562999999999"; // Replace with actual number
  const address = "Rua João Rodrigues Jota, 251, Santos Dumont, Itumbiara GO";
  
  const quickActions = [
    {
      title: "Meu Bronze",
      description: "Agendar nova sessão",
      icon: Calendar,
      link: "/appointments",
      color: "bg-bronze-500 hover:bg-bronze-600"
    },
    {
      title: "Preencher Ficha",
      description: "Anamnese e perfil",
      icon: FileText,
      link: "/anamnesis",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Como Chego",
      description: "Localização no mapa",
      icon: MapPin,
      link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`,
      external: true,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "WhatsApp",
      description: "Falar conosco",
      icon: MessageCircle,
      link: `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Olá! Preciso de ajuda.`,
      external: true,
      color: "bg-emerald-500 hover:bg-emerald-600"
    },
    {
      title: "Meu Perfil",
      description: "Dados pessoais",
      icon: User,
      link: "/clients",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Alertas",
      description: "Notificações",
      icon: Bell,
      link: "/alerts",
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Acesso Rápido</CardTitle>
        <CardDescription>
          Suas principais ações em um só lugar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            if (action.external) {
              return (
                <Button
                  key={action.title}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
                  onClick={() => window.open(action.link, '_blank')}
                >
                  <Icon className="h-6 w-6 text-gray-600" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-gray-500">{action.description}</div>
                  </div>
                </Button>
              );
            }

            return (
              <Button
                key={action.title}
                asChild
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
              >
                <Link to={action.link}>
                  <Icon className="h-6 w-6 text-gray-600" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-gray-500">{action.description}</div>
                  </div>
                </Link>
              </Button>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
            <Bell className="h-4 w-4 mr-2" /> 
            Confirmação de Agendamento
          </h3>
          <p className="text-amber-800 text-sm">
            Você será lembrada 24h antes via WhatsApp. Responda ✅ ou ❌ para confirmar.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientQuickActions;
