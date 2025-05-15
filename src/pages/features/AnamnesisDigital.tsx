
import React from "react";
import { Link } from "react-router-dom";
import { FileText, AlertTriangle, PenTool, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AnamnesisDigital = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              Anamnese Digital
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Formulário de Anamnese
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Formulário digital pré-sessão</CardTitle>
            <CardDescription>
              Preencha este formulário com atenção para garantir um bronzeamento seguro e eficiente
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
                    <h3 className="font-medium text-lg">Perguntas sobre saúde</h3>
                    <p className="text-gray-600">Alergias, medicamentos, histórico de queimaduras ou doenças de pele</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <AlertTriangle className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Alertas automáticos</h3>
                    <p className="text-gray-600">Identificação de possíveis contraindicações para sua segurança</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <PenTool className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Assinatura digital</h3>
                    <p className="text-gray-600">Assinatura e aceite do termo de responsabilidade</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Shield className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">100% seguro</h3>
                    <p className="text-gray-600">Seus dados são criptografados e protegidos</p>
                  </div>
                </div>
              </div>
            </div>

            <Alert className="bg-amber-50 border-amber-200 mt-6">
              <AlertTriangle className="h-4 w-4 text-amber-800" />
              <AlertTitle className="text-amber-800">Exemplo de alerta</AlertTitle>
              <AlertDescription className="text-amber-700">
                O uso de antibióticos pode aumentar a sensibilidade da pele ao bronzeamento. Consulte seu médico antes de prosseguir.
              </AlertDescription>
            </Alert>

            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mt-6">
              <p className="text-gray-700">
                <span className="font-semibold">Termo de responsabilidade:</span> Declaro estar ciente de que o bronzeamento artificial expõe a pele à radiação ultravioleta, que pode causar envelhecimento precoce da pele, alterações na textura da pele, e, em alguns casos, aumentar o risco de câncer de pele. Certifico que as informações fornecidas neste formulário são verdadeiras.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-bronze-500 hover:bg-bronze-600 w-full" asChild>
              <Link to="/anamnesis">
                Preencher anamnese
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-medium mb-2">Formulário de Anamnese</h3>
              <p className="text-gray-600">
                Visualização do formulário digital com perguntas interativas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnamnesisDigital;
