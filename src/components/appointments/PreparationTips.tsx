
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const PreparationTips: React.FC = () => {
  const handleWhatsAppContact = () => {
    window.open("https://wa.me/5564996170209?text=Oi%2C+quero+tirar+uma+d%C3%BAvida+sobre+meu+bronze+🌞", "_blank");
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
      <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">
        ✨ Prepare-se para o Bronze
      </h3>
      
      <div className="text-amber-900 space-y-4">
        <p className="text-center text-lg font-medium text-amber-700 mb-6">
          🌞 Dicas para um Bronzeado Perfeito
        </p>
        <p className="text-center text-sm text-amber-600 mb-6">
          Antes do seu bronze, siga essas recomendações para garantir um resultado lindo, uniforme e seguro:
        </p>
        
        <div className="space-y-4">
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">1️⃣ Esfolie sua pele</h4>
            <p className="text-sm">Faça uma esfoliação suave 1 dia antes do bronze. Isso remove as células mortas e ajuda a deixar a pele mais uniforme.</p>
          </div>
          
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">2️⃣ Evite cremes e óleos</h4>
            <p className="text-sm">No dia do bronze, <strong>não use hidratantes, perfumes ou óleos</strong> na pele. Isso pode atrapalhar o resultado final.</p>
          </div>
          
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">3️⃣ Use roupas leves</h4>
            <p className="text-sm">Venha com roupas soltas, de preferência de tecido escuro, para não marcar o corpo depois do bronze.</p>
          </div>
          
          <div className="bg-white/50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">4️⃣ Hidrate-se bem</h4>
            <p className="text-sm">Beba bastante água antes e depois do procedimento para manter sua pele saudável e bonita!</p>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-amber-200">
          <h4 className="font-semibold text-amber-800 mb-3 text-center">💬 Dúvidas?</h4>
          <p className="text-sm text-amber-700 text-center mb-4">
            Fale com a gente pelo WhatsApp clicando no botão abaixo:
          </p>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleWhatsAppContact}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Falar com a equipe 💬
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreparationTips;
