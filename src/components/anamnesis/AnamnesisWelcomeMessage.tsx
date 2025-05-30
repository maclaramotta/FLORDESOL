
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";

const AnamnesisWelcomeMessage: React.FC = () => {
  return (
    <Alert className="bg-gradient-to-r from-bronze-50 to-amber-50 border-bronze-200 mb-6">
      <Sparkles className="h-5 w-5 text-bronze-600" />
      <AlertDescription className="text-bronze-800 font-medium">
        ✨ Bem-vinda! Antes de agendar, precisamos que você preencha sua ficha de anamnese para garantir um atendimento seguro e personalizado.
      </AlertDescription>
    </Alert>
  );
};

export default AnamnesisWelcomeMessage;
