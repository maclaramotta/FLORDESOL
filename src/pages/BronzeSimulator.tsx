
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, RotateCw, Save, Share } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const BronzeSimulator = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [bronzedImage, setBronzedImage] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<string>("medio");
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setBronzedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
      alert("Não foi possível acessar a câmera. Verifique as permissões.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const dataURL = canvas.toDataURL('image/jpeg');
        setOriginalImage(dataURL);
        setBronzedImage(null);
        
        // Parar a câmera
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        setShowCamera(false);
      }
    }
  };

  const generateBronze = async () => {
    if (!originalImage) return;
    
    setIsGenerating(true);
    
    // Simulação de processamento (aqui você integraria com uma API de IA real)
    setTimeout(() => {
      // Por enquanto, vamos simular aplicando um filtro bronze básico
      setBronzedImage(originalImage);
      setIsGenerating(false);
    }, 2000);
  };

  const savePhoto = () => {
    if (bronzedImage) {
      const link = document.createElement('a');
      link.download = 'bronze-simulado.jpg';
      link.href = bronzedImage;
      link.click();
    }
  };

  const sharePhoto = async () => {
    if (bronzedImage && navigator.share) {
      try {
        // Converter base64 para blob
        const response = await fetch(bronzedImage);
        const blob = await response.blob();
        const file = new File([blob], 'bronze-simulado.jpg', { type: 'image/jpeg' });
        
        await navigator.share({
          title: 'Meu Bronze Simulado',
          text: 'Veja como ficou meu bronze simulado!',
          files: [file]
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
        // Fallback: copiar link da imagem
        navigator.clipboard.writeText(bronzedImage);
        alert('Imagem copiada para a área de transferência!');
      }
    } else {
      // Fallback para navegadores que não suportam Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              Simular Bronze
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Veja como você ficará com diferentes tons de bronzeado
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controles */}
          <div className="space-y-6">
            {/* Upload/Câmera */}
            <Card>
              <CardHeader>
                <CardTitle>📸 Enviar ou Tirar Foto</CardTitle>
                <CardDescription>
                  Escolha uma foto existente ou tire uma nova
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Enviar Foto
                  </Button>
                  <Button 
                    onClick={startCamera}
                    variant="outline"
                    className="flex-1"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Tirar Foto
                  </Button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </CardContent>
            </Card>

            {/* Câmera */}
            {showCamera && (
              <Card>
                <CardContent className="p-4">
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg"
                    />
                    <Button
                      onClick={capturePhoto}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-bronze-500 hover:bg-bronze-600"
                    >
                      Capturar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Seleção de Tom */}
            <Card>
              <CardHeader>
                <CardTitle>🎨 Tom do Bronze</CardTitle>
                <CardDescription>
                  Escolha a intensidade do bronzeado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedTone} onValueChange={setSelectedTone}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="leve" id="leve" />
                    <Label htmlFor="leve" className="font-medium">Leve</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medio" id="medio" />
                    <Label htmlFor="medio" className="font-medium">Médio</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intenso" id="intenso" />
                    <Label htmlFor="intenso" className="font-medium">Intenso</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Botão Gerar */}
            <Button
              onClick={generateBronze}
              disabled={!originalImage || isGenerating}
              className="w-full bg-bronze-500 hover:bg-bronze-600"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                  Gerando Bronze...
                </>
              ) : (
                "🔄 Gerar Bronze"
              )}
            </Button>

            {/* Botões de Ação */}
            {bronzedImage && (
              <div className="flex gap-3">
                <Button
                  onClick={savePhoto}
                  variant="outline"
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Foto
                </Button>
                <Button
                  onClick={sharePhoto}
                  variant="outline"
                  className="flex-1"
                >
                  <Share className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>👀 Preview</CardTitle>
                <CardDescription>
                  Visualize o resultado do seu bronze
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Imagem Original */}
                  {originalImage && (
                    <div>
                      <h4 className="font-medium mb-2">Foto Original</h4>
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={originalImage}
                          alt="Foto original"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Imagem Bronzeada */}
                  {bronzedImage && (
                    <div>
                      <h4 className="font-medium mb-2">Com Bronze {selectedTone}</h4>
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={bronzedImage}
                          alt="Foto com bronze"
                          className="w-full h-full object-cover"
                          style={{
                            filter: selectedTone === 'leve' ? 'sepia(0.3) saturate(1.2)' :
                                   selectedTone === 'medio' ? 'sepia(0.5) saturate(1.4)' :
                                   'sepia(0.7) saturate(1.6)'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Estado vazio */}
                  {!originalImage && (
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Envie ou tire uma foto para começar</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Canvas oculto para captura da câmera */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default BronzeSimulator;
