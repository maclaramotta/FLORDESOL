
import React from "react";
import { Link } from "react-router-dom";
import { Clock, FileText, ChartBar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ProfessionalPanel = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              Painel Profissional
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Ferramentas exclusivas para profissionais
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Controle total dos atendimentos</CardTitle>
            <CardDescription>
              Ferramentas avançadas para profissionais de bronzeamento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Clock className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Controle de tempo</h3>
                    <p className="text-gray-600">Visualização do tempo mínimo até a próxima sessão do cliente</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <FileText className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Acesso às anamneses</h3>
                    <p className="text-gray-600">Visualize facilmente as respostas dos clientes</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <ChartBar className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Anotações técnicas</h3>
                    <p className="text-gray-600">Registre observações e notas sobre cada sessão</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Star className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Pesquisa de satisfação</h3>
                    <p className="text-gray-600">Envio automático de avaliações pós-atendimento</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-gray-50 p-4 rounded-t-lg border border-gray-200">
                <h3 className="font-medium text-lg">Dashboard de desempenho</h3>
              </div>
              <div className="border border-t-0 border-gray-200 rounded-b-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Clientes ativos</p>
                    <p className="text-2xl font-bold text-bronze-600">248</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Sessões hoje</p>
                    <p className="text-2xl font-bold text-bronze-600">12</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Satisfação</p>
                    <p className="text-2xl font-bold text-bronze-600">4,9</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">Novos clientes</p>
                    <p className="text-2xl font-bold text-bronze-600">18</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-bronze-500 hover:bg-bronze-600 w-full" asChild>
              <Link to="/professionals">
                Acessar painel
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-medium mb-2">Painel do Profissional</h3>
              <p className="text-gray-600">
                Mais controle e qualidade no atendimento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalPanel;
