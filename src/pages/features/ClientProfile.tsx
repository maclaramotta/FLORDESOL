
import React from "react";
import { Link } from "react-router-dom";
import { Camera, User, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const ClientProfile = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              Perfil do Cliente
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Seu perfil personalizado
          </p>
        </div>

        <Card className="mb-8 overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-bronze-500 to-bronze-700 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                <div className="w-full h-full bg-bronze-100 flex items-center justify-center">
                  <User className="h-16 w-16 text-bronze-500" />
                </div>
              </div>
            </div>
          </div>
          <CardHeader className="pt-20">
            <CardTitle className="text-2xl">Cadastro personalizado e seguro</CardTitle>
            <CardDescription>
              Aqui você cadastra suas informações com segurança para um atendimento individualizado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Camera className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Foto de perfil</h3>
                    <p className="text-gray-600">Adicione uma foto para personalizar seu perfil</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <User className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Dados pessoais</h3>
                    <p className="text-gray-600">Nome, contato e data de nascimento</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <FileText className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Teste de tipo de pele</h3>
                    <p className="text-gray-600">Identifique seu tipo de pele com nosso guia interativo</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Calendar className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Histórico completo</h3>
                    <p className="text-gray-600">Acompanhamento dos seus bronzeamentos e reações anteriores</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-6">
              <p className="text-amber-800">
                <span className="font-semibold">Atendimento personalizado:</span> Com seu perfil completo, conseguimos oferecer um atendimento totalmente individualizado e seguro para você! 💛
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-bronze-500 hover:bg-bronze-600 w-full" asChild>
              <Link to="/clients">
                Ir para meu perfil
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-xl font-medium mb-2">Visualização do perfil</h3>
              <p className="text-gray-600">
                Exemplo da tela de perfil do cliente com teste de tipo de pele
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
