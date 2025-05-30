
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Camera, ImageIcon, Palette } from "lucide-react";

const SimulatorPreviewSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Simulador de Bronze com IA</h2>
              <p className="text-xl text-gray-600 mb-8">
                Veja como você ficará com diferentes estilos de bronzeado antes mesmo de agendar sua sessão
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Camera className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Envie sua selfie</h3>
                    <p className="text-gray-600">
                      Basta tirar uma foto ou fazer upload para começar a simulação
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Palette className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Escolha o estilo</h3>
                    <p className="text-gray-600">
                      Selecione entre diversos moldes e intensidades de bronzeado
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <ImageIcon className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Visualize o resultado</h3>
                    <p className="text-gray-600">
                      Nossa IA aplica o bronzeado virtualmente para você ver como ficará
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Sparkles className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Receba sugestões personalizadas</h3>
                    <p className="text-gray-600">
                      Descubra quais estilos e tons combinam melhor com seu tipo de pele
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Button className="bg-bronze-500 hover:bg-bronze-600" size="lg" asChild>
                  <Link to="/bronze-simulator">Experimentar Simulador</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-orange-50 rounded-2xl p-8 shadow-xl">
                <div className="aspect-square bg-white rounded-lg shadow-inner overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="inline-flex p-4 rounded-full mb-4 bg-amber-50">
                        <Sparkles className="h-12 w-12 text-bronze-500" />
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">Simulação IA</h3>
                      <p className="text-gray-500">
                        Visualize seu resultado antes de agendar
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-bronze-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Disponível Agora
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block absolute -bottom-6 -left-12 w-24 h-24 bg-amber-200 rounded-full opacity-50"></div>
              <div className="hidden lg:block absolute -top-8 -right-8 w-16 h-16 bg-orange-200 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorPreviewSection;
