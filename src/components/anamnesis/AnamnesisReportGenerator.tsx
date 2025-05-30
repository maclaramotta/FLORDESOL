
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Download, Share, Save } from "lucide-react";
import { AnamnesisResponse, SkinType } from "@/types";
import { toast } from "sonner";

interface AnamnesisReportGeneratorProps {
  responses: AnamnesisResponse[];
  clientData: {
    name: string;
    email: string;
    phone: string;
    birthdate: string;
  };
  signature: string;
  onSave?: () => void;
}

const AnamnesisReportGenerator: React.FC<AnamnesisReportGeneratorProps> = ({
  responses,
  clientData,
  signature,
  onSave
}) => {
  const generateReport = () => {
    // Process responses to create structured data
    const hasAllergies = responses.find(r => r.questionId === "q1")?.response === true;
    const allergiesList = responses.find(r => r.questionId === "q2")?.response as string || "";
    const takesMedication = responses.find(r => r.questionId === "q3")?.response === true;
    const medicationsList = responses.find(r => r.questionId === "q4")?.response as string || "";
    const hasSunBurns = responses.find(r => r.questionId === "q5")?.response === true;
    const skinConditions = responses.find(r => r.questionId === "q6")?.response as string[] || [];
    const isPregnant = responses.find(r => r.questionId === "q7")?.response === true;
    const hasRecentProcedures = responses.find(r => r.questionId === "q8")?.response === true;
    const skinSensitivity = responses.find(r => r.questionId === "q9")?.response as string || "";

    // Determine skin type based on sensitivity
    const getSkinType = () => {
      switch (skinSensitivity) {
        case "Muito sensível": return "I - Pele muito clara, sempre queima, nunca bronzeia";
        case "Moderadamente sensível": return "II - Pele clara, sempre queima, bronzeia muito pouco";
        case "Normal": return "III - Pele clara a morena clara, queima moderadamente, bronzeia";
        case "Resistente": return "IV - Pele morena, raramente queima, bronzeia bem";
        default: return "A ser avaliado";
      }
    };

    // Check for contraindications
    const contraindications = [];
    if (hasAllergies) contraindications.push("Alergias identificadas - requer avaliação");
    if (takesMedication) contraindications.push("Uso de medicamentos - verificar fotossensibilidade");
    if (hasSunBurns) contraindications.push("Histórico de queimaduras solares - cuidado redobrado");
    if (isPregnant) contraindications.push("Gestação/amamentação - contraindicação relativa");
    if (hasRecentProcedures) contraindications.push("Procedimentos recentes - aguardar cicatrização");
    if (skinConditions.some(c => ["Vitiligo", "Psoríase", "Eczema", "Melanoma"].includes(c))) {
      contraindications.push("Condições dermatológicas - necessária liberação médica");
    }

    return {
      clientData,
      hasAllergies,
      allergiesList,
      takesMedication,
      medicationsList,
      hasSunBurns,
      skinConditions,
      isPregnant,
      hasRecentProcedures,
      skinSensitivity,
      skinType: getSkinType(),
      contraindications: contraindications.length > 0 ? contraindications : ["Nenhuma contraindicação aparente no momento."],
      signature,
      date: new Date().toLocaleDateString('pt-BR')
    };
  };

  const reportData = generateReport();

  const handleDownloadPDF = () => {
    toast.success("Função de download PDF será implementada em breve!");
  };

  const handleShare = () => {
    toast.success("Função de compartilhamento será implementada em breve!");
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    }
    toast.success("Ficha de anamnese salva com sucesso!");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            🧾 FICHA DE ANAMNESE - BRONZEAMENTO ESTÉTICO
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dados Pessoais */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Dados Pessoais:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <p><strong>Nome:</strong> {reportData.clientData.name}</p>
              <p><strong>Data de Nascimento:</strong> {new Date(reportData.clientData.birthdate).toLocaleDateString('pt-BR')}</p>
              <p><strong>Telefone:</strong> {reportData.clientData.phone}</p>
              <p><strong>E-mail:</strong> {reportData.clientData.email}</p>
            </div>
          </div>

          <Separator />

          {/* Histórico de Saúde */}
          <div>
            <h3 className="text-lg font-semibold mb-3">1. Histórico de Saúde:</h3>
            <div className="space-y-2 text-sm">
              <p>Possui alguma alergia conhecida? {reportData.hasAllergies ? "(X) Sim ( ) Não" : "( ) Sim (X) Não"}</p>
              {reportData.hasAllergies && <p className="ml-4">Quais: {reportData.allergiesList}</p>}
              
              <p>Está gestante ou amamentando? {reportData.isPregnant ? "(X) Sim ( ) Não" : "( ) Sim (X) Não"}</p>
              
              <p>Faz uso de medicamentos? {reportData.takesMedication ? "(X) Sim ( ) Não" : "( ) Sim (X) Não"}</p>
              {reportData.takesMedication && <p className="ml-4">Quais: {reportData.medicationsList}</p>}
              
              <p>Já teve queimadura grave por exposição solar? {reportData.hasSunBurns ? "(X) Sim ( ) Não" : "( ) Sim (X) Não"}</p>
              
              <p>Realizou procedimento estético nos últimos 15 dias? {reportData.hasRecentProcedures ? "(X) Sim ( ) Não" : "( ) Sim (X) Não"}</p>
            </div>
          </div>

          <Separator />

          {/* Cuidados com a Pele */}
          <div>
            <h3 className="text-lg font-semibold mb-3">2. Cuidados com a Pele:</h3>
            <div className="space-y-2 text-sm">
              <p>Condições de pele identificadas: {reportData.skinConditions.join(", ") || "Nenhuma relatada"}</p>
              <p>Sensibilidade da pele: {reportData.skinSensitivity}</p>
            </div>
          </div>

          <Separator />

          {/* Fototipo de Pele */}
          <div>
            <h3 className="text-lg font-semibold mb-3">3. Fototipo de Pele (Classificação Fitzpatrick):</h3>
            <p className="text-sm">(X) {reportData.skinType}</p>
          </div>

          <Separator />

          {/* Contraindicações */}
          <div>
            <h3 className="text-lg font-semibold mb-3">4. Contraindicações Identificadas:</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {reportData.contraindications.map((contraindication, index) => (
                <li key={index}>{contraindication}</li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Orientações */}
          <div>
            <h3 className="text-lg font-semibold mb-3">5. Orientações Personalizadas:</h3>
            <ul className="space-y-2 text-sm">
              <li>⬤ Manter a pele bem hidratada antes e após o procedimento.</li>
              <li>⬤ Evitar o uso de ácidos, esfoliantes ou produtos agressivos nos 7 dias antes e depois.</li>
              <li>⬤ Utilizar protetor solar nas áreas expostas diariamente.</li>
              <li>⬤ Evitar banhos muito quentes, piscina com cloro ou mar nas primeiras 24-48h.</li>
              <li>⬤ Seguir rigorosamente as recomendações passadas pela profissional.</li>
            </ul>
          </div>

          <Separator />

          {/* Observações e Assinatura */}
          <div>
            <h3 className="text-lg font-semibold mb-3">6. Observações Gerais:</h3>
            <div className="border border-gray-300 rounded p-3 min-h-[60px] text-sm bg-gray-50">
              [Campo livre para anotações da profissional]
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm">
              Declaro que li, entendi e estou de acordo com as informações prestadas acima, 
              ciente dos cuidados necessários antes e após o procedimento.
            </p>
            
            {reportData.signature && (
              <div>
                <p className="text-sm font-medium mb-2">Assinatura Digital do Cliente:</p>
                <div className="border border-gray-300 rounded p-2 bg-white">
                  <img src={reportData.signature} alt="Assinatura" className="max-h-20" />
                </div>
              </div>
            )}
            
            <p className="text-sm"><strong>Data:</strong> {reportData.date}</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button onClick={handleSave} className="bg-bronze-500 hover:bg-bronze-600">
          <Save className="h-4 w-4 mr-2" />
          Salvar Ficha
        </Button>
        <Button onClick={handleDownloadPDF} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button onClick={handleShare} variant="outline">
          <Share className="h-4 w-4 mr-2" />
          Compartilhar
        </Button>
      </div>
    </div>
  );
};

export default AnamnesisReportGenerator;
