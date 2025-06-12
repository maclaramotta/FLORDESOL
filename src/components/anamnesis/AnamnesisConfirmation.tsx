
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AnamnesisConfirmation: React.FC = () => {
  const navigate = useNavigate();

  const voltarAoInicio = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Confirmação</CardTitle>
          <CardDescription>
            Sua ficha foi processada com sucesso
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="py-4">
            <h3 className="text-lg font-medium text-green-800 mb-2">
              Ficha salva com sucesso!
            </h3>
            <p className="text-gray-600">
              Sua ficha de anamnese foi registrada e salva no sistema.
            </p>
          </div>

          <Button 
            onClick={voltarAoInicio}
            className="w-full bg-bronze-500 hover:bg-bronze-600"
          >
            Voltar ao início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnamnesisConfirmation;
