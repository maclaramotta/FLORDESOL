
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AnamnesisRequiredAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnamnesisRequiredAlert: React.FC<AnamnesisRequiredAlertProps> = ({
  isOpen,
  onClose
}) => {
  const navigate = useNavigate();

  const handleFillAnamnesis = () => {
    onClose();
    navigate("/anamnesis");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-800">
            <AlertTriangle className="h-5 w-5" />
            Anamnese Obrigatória
          </DialogTitle>
          <DialogDescription className="text-gray-700">
            ⚠️ Atenção: Para prosseguir com o agendamento, é necessário preencher sua ficha de anamnese. 
            Isso garante sua segurança e um atendimento personalizado.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <Alert className="bg-amber-50 border-amber-200">
            <FileText className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-800">Por que é necessário?</AlertTitle>
            <AlertDescription className="text-amber-700">
              A anamnese nos ajuda a identificar possíveis contraindicações e personalizar 
              o atendimento de acordo com seu tipo de pele e histórico de saúde.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
          <Button 
            onClick={handleFillAnamnesis}
            className="bg-bronze-500 hover:bg-bronze-600"
          >
            <FileText className="h-4 w-4 mr-2" />
            Preencher Anamnese
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AnamnesisRequiredAlert;
