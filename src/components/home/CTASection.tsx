
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Award, Star } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-bronze-500 to-bronze-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronta para um bronzeado perfeito?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Agende agora e aproveite um atendimento personalizado baseado no seu tipo de pele e preferências
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-bronze-700 hover:bg-gray-100 border-none" 
              asChild
            >
              <Link to="/appointments">
                <Calendar className="mr-2 h-5 w-5" /> 
                Agendar Sessão
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              className="bg-amber-400 text-bronze-800 hover:bg-amber-500 border-none" 
              asChild
            >
              <Link to="/clients">
                <Award className="mr-2 h-5 w-5" /> 
                Programa Fidelidade
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Star className="h-8 w-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bronze Natural</h3>
              <p className="text-gray-100">
                Bronzeamento natural com exposição controlada e proteção adequada
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Star className="h-8 w-8 text-amber-300" />
                <Star className="h-8 w-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bronze em Cabine</h3>
              <p className="text-gray-100">
                Bronzeamento intenso e rápido em cabines de última geração
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Star className="h-8 w-8 text-amber-300" />
                <Star className="h-8 w-8 text-amber-300" />
                <Star className="h-8 w-8 text-amber-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bronze Spray</h3>
              <p className="text-gray-100">
                Aplicação de produto bronzeador para efeito imediato e duradouro
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
