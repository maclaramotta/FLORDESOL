import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnamnesisQuestion, AnamnesisResponse } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAnamnesisValidation } from "@/hooks/useAnamnesisValidation";
import DigitalSignature from "./DigitalSignature";
import AnamnesisReportGenerator from "./AnamnesisReportGenerator";
import AnamnesisWelcomeMessage from "./AnamnesisWelcomeMessage";

interface AnamnesisFormProps {
  clientId: string;
  onComplete?: (anamnesisId: string) => void;
}

const AnamnesisForm: React.FC<AnamnesisFormProps> = ({ clientId, onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<AnamnesisResponse[]>([]);
  const [clientName, setClientName] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [signatureStatus, setSignatureStatus] = useState<"válida" | "inválida" | "">("");
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [botaoSalvarHabilitado, setBotaoSalvarHabilitado] = useState(false);

  const { markAnamnesisCompleted } = useAnamnesisValidation(clientId);

  // Update button enabled state based on your logic
  useEffect(() => {
    if (clientName !== "" && signatureStatus === "válida") {
      setBotaoSalvarHabilitado(true);
    } else {
      setBotaoSalvarHabilitado(false);
    }
  }, [clientName, signatureStatus]);

  // Updated questions - all optional now
  const questions: AnamnesisQuestion[] = [
    {
      id: "q1",
      question: "Você tem alguma alergia conhecida?",
      type: "boolean",
      required: false, // Changed to optional
      warningTrigger: true,
      warningMessage: "Alergias podem afetar a reação da pele ao bronzeamento."
    },
    {
      id: "q2",
      question: "Se sim, quais alergias você possui?",
      type: "text",
      required: false,
    },
    {
      id: "q3",
      question: "Você está tomando algum medicamento?",
      type: "boolean",
      required: false, // Changed to optional
      warningTrigger: true,
      warningMessage: "Alguns medicamentos podem causar fotossensibilidade."
    },
    {
      id: "q4",
      question: "Se sim, quais medicamentos?",
      type: "text",
      required: false,
    },
    {
      id: "q5",
      question: "Você já teve alguma queimadura grave devido à exposição solar?",
      type: "boolean",
      required: false, // Changed to optional
      warningTrigger: true,
      warningMessage: "Histórico de queimaduras solares aumenta o risco de problemas de pele."
    },
    {
      id: "q6",
      question: "Você tem ou teve alguma dessas condições de pele?",
      type: "multiselect",
      options: ["Vitiligo", "Psoríase", "Eczema", "Melanoma", "Herpes", "Nenhuma das anteriores"],
      required: false, // Changed to optional
      warningTrigger: ["Vitiligo", "Psoríase", "Eczema", "Melanoma"],
      warningMessage: "Condições dermatológicas podem ter contraindicações para bronzeamento."
    },
    {
      id: "q7",
      question: "Você está grávida ou amamentando?",
      type: "boolean",
      required: false, // Changed to optional
      warningTrigger: true,
      warningMessage: "Gestantes e lactantes devem tomar precauções especiais para bronzeamento."
    },
    {
      id: "q8",
      question: "Você realizou algum procedimento estético invasivo nos últimos 15 dias?",
      type: "boolean",
      required: false, // Changed to optional
      warningTrigger: true,
      warningMessage: "Procedimentos recentes podem interferir com o bronzeamento."
    },
    {
      id: "q9",
      question: "Como você avalia a sensibilidade da sua pele?",
      type: "select",
      options: ["Muito sensível", "Moderadamente sensível", "Normal", "Resistente"],
      required: false, // Changed to optional
      warningTrigger: ["Muito sensível"],
      warningMessage: "Pele muito sensível requer cuidados especiais durante o bronzeamento."
    },
  ];

  const handleResponse = (questionId: string, response: boolean | string | string[]) => {
    const existingIndex = responses.findIndex(r => r.questionId === questionId);
    
    if (existingIndex >= 0) {
      const updatedResponses = [...responses];
      updatedResponses[existingIndex] = { questionId, response };
      setResponses(updatedResponses);
    } else {
      setResponses([...responses, { questionId, response }]);
    }
    
    // Check for warnings
    const question = questions.find(q => q.id === questionId);
    if (question?.warningTrigger !== undefined) {
      if (typeof question.warningTrigger === "boolean" && question.warningTrigger === response) {
        if (question.warningMessage && !warnings.includes(question.warningMessage)) {
          setWarnings([...warnings, question.warningMessage]);
        }
      } else if (Array.isArray(question.warningTrigger) && Array.isArray(response)) {
        const hasWarningTrigger = response.some(r => 
          question.warningTrigger && Array.isArray(question.warningTrigger) && question.warningTrigger.includes(r)
        );
        if (hasWarningTrigger && question.warningMessage && !warnings.includes(question.warningMessage)) {
          setWarnings([...warnings, question.warningMessage]);
        }
      }
    }
  };

  const getResponseForQuestion = (questionId: string) => {
    const response = responses.find(r => r.questionId === questionId);
    return response ? response.response : undefined;
  };

  const handleNext = () => {
    // Only validate client name - no other required fields
    if (currentStep === -1) {
      if (!clientName.trim()) {
        toast.error("O nome completo é obrigatório!");
        return;
      }
      setCurrentStep(0);
      return;
    }
    
    // Skip validation for all other fields since they're optional
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length); // Move to signature step
    }
  };

  const handlePrevious = () => {
    if (currentStep === 0) {
      setCurrentStep(-1); // Go back to name step
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSignatureChange = (hasSignature: boolean, signatureData?: string) => {
    if (hasSignature && signatureData) {
      setSignature(signatureData);
      setSignatureStatus("válida");
    } else {
      setSignature("");
      setSignatureStatus("inválida");
    }
  };

  // Simplified form completion check - only name required
  const isFormComplete = () => {
    return clientName.trim() !== "";
  };

  const salvarFichaAnamnese = async (data: { nome: string; assinatura: string; respostas: AnamnesisResponse[] }) => {
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mark anamnesis as completed for this client
      markAnamnesisCompleted(clientId);
      
      // Store client name for future use
      localStorage.setItem(`client_name_${clientId}`, data.nome);
      
      console.log("Ficha salva:", data);
      
      if (onComplete) {
        onComplete("anamnesis-mock-id");
      }
    } catch (error) {
      throw error;
    }
  };

  const mostrarAlerta = (mensagem: string, tipo: "sucesso" | "erro") => {
    if (tipo === "sucesso") {
      toast.success(mensagem);
    } else {
      toast.error(mensagem);
    }
  };

  const handleSubmit = async () => {
    if (botaoSalvarHabilitado) {
      setIsSubmitting(true);
      
      try {
        await salvarFichaAnamnese({
          nome: clientName,
          assinatura: signature,
          respostas: responses,
        });
        mostrarAlerta("Ficha salva com sucesso!", "sucesso");
      } catch (error) {
        mostrarAlerta("Erro ao salvar ficha. Tente novamente.", "erro");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      mostrarAlerta("Preencha todos os campos obrigatórios antes de salvar.", "erro");
    }
  };

  const renderQuestionInput = (question: AnamnesisQuestion) => {
    const response = getResponseForQuestion(question.id);
    
    switch (question.type) {
      case "boolean":
        return (
          <RadioGroup 
            value={response === true ? "sim" : response === false ? "nao" : ""}
            onValueChange={(value) => handleResponse(question.id, value === "sim")}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id={`${question.id}-sim`} />
              <Label htmlFor={`${question.id}-sim`}>Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id={`${question.id}-nao`} />
              <Label htmlFor={`${question.id}-nao`}>Não</Label>
            </div>
          </RadioGroup>
        );
        
      case "text":
        return (
          <Input 
            id={question.id}
            value={response as string || ""}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            placeholder="Digite sua resposta..."
            className="w-full"
          />
        );
        
      case "select":
        return (
          <RadioGroup 
            value={(response as string) || ""}
            onValueChange={(value) => handleResponse(question.id, value)}
            className="space-y-2"
          >
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${i}`} />
                <Label htmlFor={`${question.id}-${i}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
        
      case "multiselect":
        const selectedValues = (response as string[]) || [];
        return (
          <div className="space-y-2">
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Checkbox 
                  id={`${question.id}-${i}`}
                  checked={selectedValues.includes(option)}
                  onCheckedChange={(checked) => {
                    const newSelectedValues = checked 
                      ? [...selectedValues, option]
                      : selectedValues.filter(val => val !== option);
                    handleResponse(question.id, newSelectedValues);
                  }}
                />
                <Label htmlFor={`${question.id}-${i}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  if (showReport) {
    return (
      <AnamnesisReportGenerator
        responses={responses}
        clientData={{ name: clientName, email: "", phone: "", birthdate: "" }}
        signature={signature}
        onSave={() => toast.success("Ficha salva no sistema!")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <AnamnesisWelcomeMessage />
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ficha de Anamnese - Opcional</CardTitle>
          <CardDescription>
            Preencha as informações que desejar para um atendimento mais personalizado
          </CardDescription>
          <div className="w-full bg-gray-200 h-2 mt-4 rounded-full overflow-hidden">
            <div 
              className="h-full bg-bronze-500 transition-all duration-300" 
              style={{ 
                width: `${((currentStep >= questions.length ? questions.length + 1 : currentStep + 1) / (questions.length + 2)) * 100}%` 
              }}
            ></div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {warnings.length > 0 && (
            <Alert className="bg-amber-50 border-amber-200">
              <AlertTitle className="text-amber-800">Atenção às contraindicações</AlertTitle>
              <AlertDescription className="text-amber-700">
                <ul className="list-disc pl-4 space-y-1 mt-2">
                  {warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {currentStep === -1 ? (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-medium">Nome Completo *</h3>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Digite seu nome completo"
                className="w-full"
                required
              />
              <p className="text-sm text-gray-500">
                * Campo obrigatório para identificação
              </p>
            </div>
          ) : currentStep < questions.length ? (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-medium">
                {questions[currentStep].question}
                <span className="text-sm text-gray-500 ml-2">(opcional)</span>
              </h3>
              {renderQuestionInput(questions[currentStep])}
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-medium">
                Assinatura Digital <span className="text-sm text-gray-500">(opcional)</span>
              </h3>
              <p className="text-sm text-gray-500">
                Você pode assinar digitalmente para confirmar as informações, mas não é obrigatório.
              </p>
              
              <DigitalSignature 
                onSignatureChange={handleSignatureChange}
                required={false}
              />
              
              <Separator />
              
              <div className="text-sm">
                <p className="font-medium mb-2">Termo de responsabilidade:</p>
                <p className="text-gray-600">
                  Declaro estar ciente de que o bronzeamento artificial expõe a pele à radiação ultravioleta, que pode causar envelhecimento precoce da pele, alterações na textura da pele, e, em alguns casos, aumentar o risco de câncer de pele.
                </p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === -1}
          >
            Voltar
          </Button>
          
          {currentStep < questions.length ? (
            <Button 
              onClick={handleNext}
              className="bg-bronze-500 hover:bg-bronze-600"
              disabled={currentStep === -1 && !clientName.trim()}
            >
              {currentStep === -1 ? "Iniciar Anamnese" : "Próxima"}
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              className="bg-bronze-500 hover:bg-bronze-600"
              disabled={isSubmitting || !botaoSalvarHabilitado}
            >
              {isSubmitting ? "Salvando..." : "Salvar Ficha"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnamnesisForm;
