
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Camera, Sun, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BronzeSimulator = () => {
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [showSimulation, setShowSimulation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelfieImage(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setSelfiePreview(previewUrl);
      
      toast.success("Selfie carregada com sucesso!");
    }
  };

  const handleSimulateBronze = async () => {
    if (!selfieImage || !selfiePreview) {
      toast.error("Por favor, envie uma selfie primeiro!");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSimulation(true);
      toast.success("Simulação de bronze aplicada!");
    } catch (error) {
      toast.error("Erro ao processar a simulação.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetSimulation = () => {
    setSelfieImage(null);
    setSelfiePreview(null);
    setShowSimulation(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-bronze-600 hover:text-bronze-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao início
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Sun className="h-8 w-8 text-amber-500" />
              Simulador de Bronze
            </h1>
            <p className="text-gray-600">
              Envie uma selfie para visualizar como ficará seu bronzeado com efeito natural.
            </p>
          </div>
        </div>

        {!showSimulation ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">📸 Envie sua Selfie</CardTitle>
              <CardDescription className="text-center">
                Para melhores resultados, tire a foto em um local bem iluminado
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-64 h-64 rounded-lg overflow-hidden border-2 border-dashed border-bronze-300 bg-bronze-50 flex items-center justify-center">
                  {selfiePreview ? (
                    <img 
                      src={selfiePreview} 
                      alt="Sua selfie" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="flex flex-col items-center text-bronze-400">
                      <Camera className="h-12 w-12 mb-4" />
                      <span className="text-center">Clique para enviar sua selfie</span>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <Label htmlFor="selfie-upload" className="cursor-pointer">
                    <div className="px-6 py-3 bg-bronze-500 text-white rounded-lg hover:bg-bronze-600 transition-colors">
                      {selfiePreview ? "Alterar Selfie" : "Enviar Selfie"}
                    </div>
                  </Label>
                  <Input
                    id="selfie-upload"
                    type="file"
                    accept="image/*"
                    capture="user"
                    className="hidden"
                    onChange={handleSelfieChange}
                  />
                </div>
              </div>

              {selfiePreview && (
                <div className="text-center space-y-4">
                  <Button 
                    onClick={handleSimulateBronze}
                    disabled={isLoading}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg"
                  >
                    {isLoading ? "Aplicando bronze..." : "✨ Simular Bronzeado"}
                  </Button>
                  
                  <p className="text-sm text-gray-500">
                    A simulação aplicará um filtro de bronze natural na sua foto
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">📷 Foto Original</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={selfiePreview!} 
                      alt="Foto original" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-center">☀️ Com Bronze Natural</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={selfiePreview!} 
                      alt="Simulação com bronze" 
                      className="w-full h-full object-cover"
                      style={{
                        filter: "contrast(1.1) saturate(1.2) sepia(0.3) brightness(1.05)"
                      }}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                      <Sun className="h-4 w-4 mr-1" />
                      Bronze Natural Aplicado!
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="font-semibold text-amber-800 mb-2">🌟 Gostou do resultado?</h3>
                <p className="text-amber-700 mb-4">
                  Agende sua sessão de bronzeamento natural e conquiste esse visual incrível!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild className="bg-bronze-500 hover:bg-bronze-600">
                    <Link to="/appointments">
                      <Sun className="h-4 w-4 mr-2" />
                      Agendar Agora
                    </Link>
                  </Button>
                  <Button variant="outline" onClick={resetSimulation}>
                    Tentar Nova Foto
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BronzeSimulator;
