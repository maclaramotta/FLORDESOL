
import React from "react";
import { Link } from "react-router-dom";
import { History, FileText, Image, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const HistoryEvolution = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              Histórico e Evolução
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Acompanhe sua transformação!
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Registros completos do seu progresso</CardTitle>
            <CardDescription>
              Visualize sua jornada de bronzeamento e evolução com segurança e transparência
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <FileText className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Anamneses completas</h3>
                    <p className="text-gray-600">Acesse todas as anamneses preenchidas anteriormente</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Image className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Fotos comparativas</h3>
                    <p className="text-gray-600">Registros de antes e depois (opcional) para acompanhamento</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Pen className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Anotações profissionais</h3>
                    <p className="text-gray-600">Recomendações e observações dos especialistas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <History className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Histórico detalhado</h3>
                    <p className="text-gray-600">Linha do tempo completa das suas sessões</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-medium text-lg">Histórico recente</h3>
              </div>
              <div className="divide-y divide-gray-100">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Bronzeamento em cabine</p>
                    <p className="text-sm text-gray-500">10/04/2025</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Duração: 8 minutos | Profissional: Marina Silva
                  </p>
                  <p className="text-sm text-gray-700 italic">
                    "Cliente relatou resultado satisfatório. Recomendação para intensificar hidratação."
                  </p>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Bronzeamento spray</p>
                    <p className="text-sm text-gray-500">28/03/2025</p>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Duração: 20 minutos | Profissional: Carlos Souza
                  </p>
                  <p className="text-sm text-gray-700 italic">
                    "Primeira aplicação. Tom uniforme e natural. Próxima sessão agendada para manutenção."
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Image className="h-8 w-8 mx-auto mb-2" />
                  <p>Antes</p>
                </div>
              </div>
              <div className="bg-bronze-50 h-40 rounded-md flex items-center justify-center text-bronze-400">
                <div className="text-center">
                  <Image className="h-8 w-8 mx-auto mb-2" />
                  <p>Depois</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-bronze-500 hover:bg-bronze-600 w-full">
              Ver histórico completo
            </Button>
          </CardFooter>
        </Card>

        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">📁</div>
              <h3 className="text-xl font-medium mb-2">Histórico e Evolução</h3>
              <p className="text-gray-600">
                Acompanhamento completo da sua jornada de bronzeamento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryEvolution;
