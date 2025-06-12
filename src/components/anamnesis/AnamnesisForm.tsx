
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAnamnesisValidation } from "@/hooks/useAnamnesisValidation";
import DigitalSignature from "./DigitalSignature";
import AnamnesisConfirmation from "./AnamnesisConfirmation";

interface AnamnesisFormProps {
  clientId: string;
  onComplete?: (anamnesisId: string) => void;
}

const AnamnesisForm: React.FC<AnamnesisFormProps> = ({ clientId, onComplete }) => {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Form fields
  const [nomeCompleto, setNomeCompleto] = useState<string>("");
  const [idade, setIdade] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [possuiAlergias, setPossuiAlergias] = useState<boolean | null>(null);
  const [usaMedicamentos, setUsaMedicamentos] = useState<boolean | null>(null);
  const [problemasPele, setProblemasPele] = useState<boolean | null>(null);
  const [jaBronzeou, setJaBronzeou] = useState<boolean | null>(null);
  const [signature, setSignature] = useState<string>("");
  const [signatureStatus, setSignatureStatus] = useState<"válida" | "inválida" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { markAnamnesisCompleted } = useAnamnesisValidation(clientId);

  const handleSignatureChange = (hasSignature: boolean, signatureData?: string) => {
    if (hasSignature && signatureData) {
      setSignature(signatureData);
      setSignatureStatus("válida");
    } else {
      setSignature("");
      setSignatureStatus("inválida");
    }
  };

  const isFormValid = () => {
    return (
      nomeCompleto.trim() !== "" &&
      idade.trim() !== "" &&
      telefone.trim() !== "" &&
      possuiAlergias !== null &&
      usaMedicamentos !== null &&
      problemasPele !== null &&
      jaBronzeou !== null &&
      signature !== "" &&
      signatureStatus === "válida"
    );
  };

  const salvarFicha = async () => {
    if (!isFormValid()) {
      toast.error("Por favor, preencha todos os campos obrigatórios antes de salvar.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fichaData = {
        nomeCompleto,
        idade: parseInt(idade),
        telefone,
        possuiAlergias,
        usaMedicamentos,
        problemasPele,
        jaBronzeou,
        assinatura: signature,
        data: new Date().toISOString(),
        clientId
      };

      // Save to localStorage for demo purposes
      const fichas = JSON.parse(localStorage.getItem("fichas_anamnese") || "[]");
      fichas.push({ ...fichaData, id: Date.now().toString() });
      localStorage.setItem("fichas_anamnese", JSON.stringify(fichas));
      
      // Mark anamnesis as completed for this client
      markAnamnesisCompleted(clientId);
      
      // Store client name for future use
      localStorage.setItem(`client_name_${clientId}`, nomeCompleto);
      
      console.log("Ficha salva:", fichaData);
      
      setShowConfirmation(true);
      
      if (onComplete) {
        onComplete("anamnesis-mock-id");
      }
    } catch (error) {
      toast.error("Erro ao salvar ficha. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showConfirmation) {
    return <AnamnesisConfirmation />;
  }

  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ficha de Anamnese</CardTitle>
          <CardDescription>
            Preencha todas as informações obrigatórias para um atendimento seguro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="nome-completo">Nome completo *</Label>
            <Input
              id="nome-completo"
              value={nomeCompleto}
              onChange={(e) => setNomeCompleto(e.target.value)}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

          {/* Idade */}
          <div className="space-y-2">
            <Label htmlFor="idade">Idade *</Label>
            <Input
              id="idade"
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              placeholder="Digite sua idade"
              min="1"
              max="120"
              required
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(11) 99999-9999"
              required
            />
          </div>

          <Separator />

          {/* Possui alergias */}
          <div className="space-y-3">
            <Label>Possui alergias? *</Label>
            <RadioGroup 
              value={possuiAlergias === null ? "" : possuiAlergias ? "sim" : "nao"}
              onValueChange={(value) => setPossuiAlergias(value === "sim")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="alergias-sim" />
                <Label htmlFor="alergias-sim">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="alergias-nao" />
                <Label htmlFor="alergias-nao">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Usa medicamentos */}
          <div className="space-y-3">
            <Label>Usa medicamentos atualmente? *</Label>
            <RadioGroup 
              value={usaMedicamentos === null ? "" : usaMedicamentos ? "sim" : "nao"}
              onValueChange={(value) => setUsaMedicamentos(value === "sim")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="medicamentos-sim" />
                <Label htmlFor="medicamentos-sim">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="medicamentos-nao" />
                <Label htmlFor="medicamentos-nao">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Problemas de pele */}
          <div className="space-y-3">
            <Label>Tem problemas de pele? *</Label>
            <RadioGroup 
              value={problemasPele === null ? "" : problemasPele ? "sim" : "nao"}
              onValueChange={(value) => setProblemasPele(value === "sim")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="pele-sim" />
                <Label htmlFor="pele-sim">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="pele-nao" />
                <Label htmlFor="pele-nao">Não</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Já fez bronzeamento */}
          <div className="space-y-3">
            <Label>Já fez bronzeamento antes? *</Label>
            <RadioGroup 
              value={jaBronzeou === null ? "" : jaBronzeou ? "sim" : "nao"}
              onValueChange={(value) => setJaBronzeou(value === "sim")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sim" id="bronzeamento-sim" />
                <Label htmlFor="bronzeamento-sim">Sim</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="nao" id="bronzeamento-nao" />
                <Label htmlFor="bronzeamento-nao">Não</Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Assinatura Digital */}
          <div className="space-y-4">
            <Label>Assinatura do cliente *</Label>
            <DigitalSignature 
              onSignatureChange={handleSignatureChange}
              required={true}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={salvarFicha}
            className="w-full bg-bronze-500 hover:bg-bronze-600"
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? "Salvando..." : "Salvar Ficha"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnamnesisForm;
