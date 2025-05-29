
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, AlertTriangle, ChartBar, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AIEvaluation = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              Avaliação Personalizada com IA
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Sugestões inteligentes para o seu bronzeado
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Simulador de Bronze</CardTitle>
            <CardDescription>
              Envie uma foto para simular seu bronze!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="image-upload" className="text-base font-medium">
                Upload da sua foto
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-bronze-400 transition-colors">
                <div className="space-y-2">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                  <div className="text-sm text-gray-600">
                    {uploadedImage ? (
                      <span className="text-bronze-600 font-medium">
                        Imagem selecionada: {uploadedImage.name}
                      </span>
                    ) : (
                      "Clique para selecionar uma imagem ou arraste aqui"
                    )}
                  </div>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image-upload')?.click()}
                    className="mt-2"
                  >
                    Escolher Arquivo
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Formatos aceitos: JPG, PNG, GIF (máximo 10MB)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Inteligência artificial a seu serviço</CardTitle>
            <CardDescription>
              Com base nas suas respostas e no seu tipo de pele, nosso sistema gera recomendações personalizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <ChartBar className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Método ideal</h3>
                    <p className="text-gray-600">Sugestão do método de bronzeamento mais adequado para você</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Clock className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Tempo seguro</h3>
                    <p className="text-gray-600">Indicação do tempo ideal de exposição para sua pele</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <AlertTriangle className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Cuidados extras</h3>
                    <p className="text-gray-600">Alertas sobre possíveis cuidados adicionais necessários</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full p-2 bg-bronze-100">
                    <Sparkles className="h-5 w-5 text-bronze-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Recomendações avançadas</h3>
                    <p className="text-gray-600">Sugestões para um resultado ainda melhor</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h3 className="font-medium text-lg">Exemplo de recomendação</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Tipo de pele detectado:</span>
                  <span className="font-medium">TIPO III</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Método recomendado:</span>
                  <span className="font-medium">Cabine de bronzeamento</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-600">Tempo de exposição:</span>
                  <span className="font-medium">8 minutos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cuidados especiais:</span>
                  <span className="font-medium">Hidratante pós-bronzeamento</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-bronze-500 hover:bg-bronze-600 w-full">
              Ver minha recomendação
            </Button>
          </CardFooter>
        </Card>

        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-bronze-100 to-bronze-200">
            <div className="text-center p-8">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-medium mb-2">IA Personalizada</h3>
              <p className="text-gray-600">
                Tecnologia e segurança juntas para um bronze perfeito
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIEvaluation;
