
import React, { useState } from "react";
import { SkinType } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface SkinTypeTestProps {
  currentSkinType?: SkinType;
  onComplete: (skinType: SkinType) => void;
}

interface Question {
  id: number;
  text: string;
  options: Array<{
    text: string;
    value: number;
  }>;
}

const SkinTypeTest: React.FC<SkinTypeTestProps> = ({ currentSkinType, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);
  
  const questions: Question[] = [
    {
      id: 1,
      text: "Qual é a cor natural da sua pele (áreas não expostas ao sol)?",
      options: [
        { text: "Muito clara, branca pálida", value: 1 },
        { text: "Clara, branca", value: 2 },
        { text: "Bege claro, oliva claro", value: 3 },
        { text: "Oliva, marrom claro", value: 4 },
        { text: "Marrom", value: 5 },
        { text: "Marrom escuro ou preta", value: 6 },
      ],
    },
    {
      id: 2,
      text: "Como sua pele reage à exposição solar intensa no verão?",
      options: [
        { text: "Sempre queima, nunca bronzeia", value: 1 },
        { text: "Geralmente queima, bronzeia minimamente", value: 2 },
        { text: "Às vezes queima levemente, bronzeia gradualmente", value: 3 },
        { text: "Raramente queima, sempre bronzeia bem", value: 4 },
        { text: "Muito raramente queima, bronzeia muito facilmente", value: 5 },
        { text: "Nunca queima, pele naturalmente pigmentada", value: 6 },
      ],
    },
    {
      id: 3,
      text: "Qual é a cor dos seus cabelos naturais?",
      options: [
        { text: "Ruivo, loiro muito claro", value: 1 },
        { text: "Loiro", value: 2 },
        { text: "Castanho claro", value: 3 },
        { text: "Castanho médio", value: 4 },
        { text: "Castanho escuro", value: 5 },
        { text: "Preto", value: 6 },
      ],
    },
    {
      id: 4,
      text: "Qual é a cor dos seus olhos?",
      options: [
        { text: "Azul claro, cinza claro, verde claro", value: 1 },
        { text: "Azul, cinza, verde", value: 2 },
        { text: "Verde escuro, castanho claro", value: 3 },
        { text: "Castanho", value: 4 },
        { text: "Castanho escuro", value: 5 },
        { text: "Castanho muito escuro, preto", value: 6 },
      ],
    },
    {
      id: 5,
      text: "Você tem sardas nas áreas não expostas ao sol?",
      options: [
        { text: "Muitas", value: 1 },
        { text: "Algumas", value: 2 },
        { text: "Poucas", value: 3 },
        { text: "Muito poucas", value: 4 },
        { text: "Raramente", value: 5 },
        { text: "Nenhuma", value: 6 },
      ],
    },
  ];

  const handleNextQuestion = () => {
    if (currentAnswer === null) return;
    
    const newAnswers = [...answers, currentAnswer];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer(null);
    } else {
      // Calculate skin type based on answers
      const total = newAnswers.reduce((sum, value) => sum + value, 0);
      const average = total / newAnswers.length;
      
      let determinedSkinType: SkinType;
      
      if (average <= 1.5) determinedSkinType = SkinType.TYPE_I;
      else if (average <= 2.5) determinedSkinType = SkinType.TYPE_II;
      else if (average <= 3.5) determinedSkinType = SkinType.TYPE_III;
      else if (average <= 4.5) determinedSkinType = SkinType.TYPE_IV;
      else if (average <= 5.5) determinedSkinType = SkinType.TYPE_V;
      else determinedSkinType = SkinType.TYPE_VI;
      
      onComplete(determinedSkinType);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const newAnswers = [...answers];
      setCurrentAnswer(newAnswers.pop() || null);
      setAnswers(newAnswers);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teste de Tipo de Pele</CardTitle>
        <CardDescription>
          Responda às perguntas para determinar o seu tipo de pele segundo a Escala Fitzpatrick.
        </CardDescription>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <h3 className="text-lg font-medium">
            Pergunta {currentQuestionIndex + 1} de {questions.length}
          </h3>
          <p className="text-lg">{currentQuestion.text}</p>
          
          <RadioGroup 
            value={currentAnswer?.toString()} 
            onValueChange={(value) => setCurrentAnswer(parseInt(value))}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-bronze-50">
                <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Anterior
        </Button>
        <Button
          onClick={handleNextQuestion}
          disabled={currentAnswer === null}
          className="bg-bronze-500 hover:bg-bronze-600"
        >
          {currentQuestionIndex < questions.length - 1 ? "Próxima" : "Concluir"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SkinTypeTest;
