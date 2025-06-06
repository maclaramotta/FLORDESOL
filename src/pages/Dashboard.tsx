
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Stethoscope, MessageCircle, FileText, Bell } from "lucide-react";
import ClientQuickActions from "@/components/client/ClientQuickActions";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bem-vinda ao Flor de Sol!</h1>
        <p className="text-gray-600">Gerencie seus agendamentos e acesse todos os nossos serviços.</p>
      </div>

      {/* Quick Actions Component */}
      <div className="mb-8">
        <ClientQuickActions />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-bronze-500" />
              Agendamentos
            </CardTitle>
            <CardDescription>
              Agende suas sessões de bronzeamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-bronze-500 hover:bg-bronze-600">
              <Link to="/appointments">Agendar Sessão</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-bronze-500" />
              Alertas
            </CardTitle>
            <CardDescription>
              Gerencie notificações de agendamentos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full bg-bronze-500 hover:bg-bronze-600">
              <Link to="/alerts">Gerenciar Alertas</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-bronze-500" />
              Meu Perfil
            </CardTitle>
            <CardDescription>
              Gerencie suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/clients">Ver Perfil</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-bronze-500" />
              Ficha de Anamnese
            </CardTitle>
            <CardDescription>
              Visualize ou atualize sua anamnese
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/anamnesis">Ver Anamnese</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-bronze-500" />
              Profissionais
            </CardTitle>
            <CardDescription>
              Conheça nossa equipe especializada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/professionals">Ver Equipe</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-bronze-500" />
              Suporte
            </CardTitle>
            <CardDescription>
              Tire suas dúvidas conosco
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link to="/support">Falar Conosco</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
