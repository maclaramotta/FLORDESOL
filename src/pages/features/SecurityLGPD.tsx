
import React from "react";
import { Link } from "react-router-dom";
import { Shield, Lock, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const SecurityLGPD = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              Segurança e LGPD
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Privacidade garantida
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Proteção total dos seus dados</CardTitle>
            <CardDescription>
              Todos os dados são criptografados e armazenados com consentimento conforme a LGPD
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Lock className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Criptografia avançada</h3>
                    <p className="text-gray-600">Seus dados são protegidos com tecnologia de ponta</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Shield className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Proteção LGPD</h3>
                    <p className="text-gray-600">Conformidade com a Lei Geral de Proteção de Dados</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <FileText className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Termos claros</h3>
                    <p className="text-gray-600">Termos de uso e política de privacidade transparentes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <ShieldCheck className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Consentimento explícito</h3>
                    <p className="text-gray-600">Você tem total controle sobre seus dados</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-md p-4 mt-6">
              <div className="flex gap-3">
                <ShieldCheck className="h-5 w-5 text-green-600 mt-1" />
                <p className="text-green-800">
                  <span className="font-semibold">Dados protegidos:</span> Seu bem-estar e segurança vêm sempre em primeiro lugar. Todos os dados são tratados conforme as diretrizes da LGPD.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="font-medium text-lg">Nossos compromissos</h3>
              <ul className="space-y-2">
                <li className="flex gap-2 items-center">
                  <div className="h-2 w-2 rounded-full bg-bronze-500"></div>
                  <span>Confidencialidade de todas as informações pessoais e de saúde</span>
                </li>
                <li className="flex gap-2 items-center">
                  <div className="h-2 w-2 rounded-full bg-bronze-500"></div>
                  <span>Acesso restrito aos dados apenas por profissionais autorizados</span>
                </li>
                <li className="flex gap-2 items-center">
                  <div className="h-2 w-2 rounded-full bg-bronze-500"></div>
                  <span>Direito de acesso, correção e exclusão dos seus dados a qualquer momento</span>
                </li>
                <li className="flex gap-2 items-center">
                  <div className="h-2 w-2 rounded-full bg-bronze-500"></div>
                  <span>Não compartilhamento dos seus dados com terceiros sem autorização</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <Link to="/terms">
                Termos de Uso
              </Link>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <Link to="/privacy">
                Política de Privacidade
              </Link>
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" asChild>
              <Link to="/lgpd">
                LGPD
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-medium mb-2">Segurança e LGPD</h3>
              <p className="text-gray-600">
                Seus dados protegidos em todos os momentos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityLGPD;
