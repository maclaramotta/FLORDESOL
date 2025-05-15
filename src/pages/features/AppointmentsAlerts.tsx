
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Bell, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AppointmentsAlerts = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              Agenda e Alertas
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Organize sua rotina com facilidade!
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Sistema de agendamento inteligente</CardTitle>
            <CardDescription>
              Agende suas sessões e receba lembretes e orientações importantes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Calendar className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Agendamento fácil</h3>
                    <p className="text-gray-600">Marque sua sessão com poucos cliques no app</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Bell className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Lembretes automáticos</h3>
                    <p className="text-gray-600">Notificações antes da sua sessão para não esquecer</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <FileText className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Orientações personalizadas</h3>
                    <p className="text-gray-600">Instruções de pré e pós-bronzeamento para sua pele</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Clock className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Controle de intervalo</h3>
                    <p className="text-gray-600">Gerenciamento automático do tempo entre sessões</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-medium text-lg">Próximos agendamentos</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Bronzeamento em cabine</p>
                    <p className="text-sm text-gray-500">10 minutos de duração</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">24/05/2025</p>
                    <p className="text-sm text-gray-500">14:30</p>
                  </div>
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <p className="font-medium">Bronzeamento spray</p>
                    <p className="text-sm text-gray-500">20 minutos de duração</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">07/06/2025</p>
                    <p className="text-sm text-gray-500">10:00</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-bronze-500 hover:bg-bronze-600 w-full" asChild>
              <Link to="/appointments">
                Agendar sessão
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-medium mb-2">Sistema de Agendamento</h3>
              <p className="text-gray-600">
                Seu horário, seus cuidados — tudo em um só lugar
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsAlerts;
