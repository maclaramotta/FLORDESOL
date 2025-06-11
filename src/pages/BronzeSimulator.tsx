
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Camera, Sun, ArrowLeft, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const BronzeSimulator = () => {
  const [step, setStep] = useState(1);
  const [userName, setUserName] = useState("");
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [markinhaType, setMarkinhaType] = useState("");
  const [showSimulation, setShowSimulation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const markinhaOptions = [
    { value: "cortininha", label: "Cortininha" },
    { value: "fita", label: "Fita" },
    { value: "coracao", label: "Coração" },
    { value: "tomara_que_caia", label: "Top tomara que caia" }
  ];

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

  const handleNextStep = () => {
    if (step === 1) {
      if (!userName.trim()) {
        toast.error("Por favor, digite seu nome!");
        return;
      }
      if (!selfieImage || !selfiePreview) {
        toast.error("Por favor, escolha uma selfie da galeria!");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!markinhaType) {
        toast.error("Por favor, escolha o tipo de marquinha!");
        return;
      }
      handleSimulateBronze();
    }
  };

  const handleSimulateBronze = async () => {
    setIsLoading(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSimulation(true);
      toast.success(`Bronze aplicado para ${userName}! Estilo: ${markinhaOptions.find(opt => opt.value === markinhaType)?.label}`);
    } catch (error) {
      toast.error("Erro ao processar a simulação.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetSimulation = () => {
    setStep(1);
    setUserName("");
    setSelfieImage(null);
    setSelfiePreview(null);
    setMarkinhaType("");
    setShowSimulation(false);
  };

  const getFilterStyle = () => {
    const baseFilter = "contrast(1.1) saturate(1.2) sepia(0.3) brightness(1.05)";
    
    switch (markinhaType) {
      case "coracao":
        return `${baseFilter} hue-rotate(10deg)`;
      case "fita":
        return `${baseFilter} hue-rotate(-5deg)`;
      case "tomara_que_caia":
        return `${baseFilter} saturate(1.4)`;
      default:
        return baseFilter;
    }
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
              Escolha uma selfie da galeria para visualizar como ficará seu bronze!
            </p>
          </div>
        </div>

        {!showSimulation ? (
          <>
            {step === 1 && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">📸 Dados Pessoais e Selfie</CardTitle>
                  <CardDescription className="text-center">
                    Digite seu nome e escolha uma selfie da galeria do seu celular
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Seu nome</Label>
                    <Input
                      id="userName"
                      type="text"
                      placeholder="Digite seu nome completo"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="text-lg"
                    />
                  </div>

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
                          <span className="text-center">Escolher selfie da galeria</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <Label htmlFor="selfie-upload" className="cursor-pointer">
                        <div className="px-6 py-3 bg-bronze-500 text-white rounded-lg hover:bg-bronze-600 transition-colors">
                          {selfiePreview ? "Alterar Selfie" : "Escolher da Galeria"}
                        </div>
                      </Label>
                      <Input
                        id="selfie-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleSelfieChange}
                      />
                    </div>
                  </div>

                  {userName && selfiePreview && (
                    <div className="text-center">
                      <Button 
                        onClick={handleNextStep}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 text-lg"
                      >
                        Próximo: Escolher Marquinha →
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="text-center">🩱 Escolha o Tipo de Marquinha</CardTitle>
                  <CardDescription className="text-center">
                    Selecione seu estilo preferido para a simulação, {userName}!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="markinha-type">Tipo de marquinha desejada</Label>
                    <Select value={markinhaType} onValueChange={setMarkinhaType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de marquinha" />
                      </SelectTrigger>
                      <SelectContent>
                        {markinhaOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selfiePreview && (
                    <div className="text-center">
                      <div className="w-32 h-32 rounded-lg overflow-hidden mx-auto mb-4 border-2 border-bronze-200">
                        <img 
                          src={selfiePreview} 
                          alt="Preview da selfie" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Sua selfie está pronta para a simulação!
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 justify-center">
                    <Button 
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      ← Voltar
                    </Button>
                    
                    {markinhaType && (
                      <Button 
                        onClick={handleNextStep}
                        disabled={isLoading}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3"
                      >
                        {isLoading ? "Aplicando bronze..." : "✨ Ver Simulação"}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-amber-800 mb-2">
                Olá, {userName}! ✨
              </h2>
              <p className="text-gray-600">
                Veja como ficou seu bronzeado com marquinha {markinhaOptions.find(opt => opt.value === markinhaType)?.label.toLowerCase()}!
              </p>
            </div>

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
                        filter: getFilterStyle()
                      }}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-2">
                      <Sun className="h-4 w-4 mr-1" />
                      Bronze Natural Aplicado!
                    </div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium">
                      <Heart className="h-4 w-4 mr-1" />
                      Marquinha: {markinhaOptions.find(opt => opt.value === markinhaType)?.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="font-semibold text-amber-800 mb-2">🌟 Gostou do resultado, {userName}?</h3>
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
                    <Sparkles className="h-4 w-4 mr-2" />
                    Nova Simulação
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
