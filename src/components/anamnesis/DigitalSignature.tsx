import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle } from "lucide-react";

interface DigitalSignatureProps {
  onSignatureChange: (hasSignature: boolean, signatureData?: string) => void;
  required?: boolean;
}

const DigitalSignature: React.FC<DigitalSignatureProps> = ({
  onSignatureChange,
  required = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isSignatureValid, setIsSignatureValid] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Set drawing style
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Fill white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    setHasSignature(true);
    validateSignature();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    validateSignature();
  };

  const validateSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check if there's actually some drawing on the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let hasContent = false;
    for (let i = 0; i < data.length; i += 4) {
      // Check if pixel is not white (255, 255, 255)
      if (data[i] !== 255 || data[i + 1] !== 255 || data[i + 2] !== 255) {
        hasContent = true;
        break;
      }
    }

    setIsSignatureValid(hasContent);
    
    if (hasContent) {
      const signatureData = canvas.toDataURL();
      onSignatureChange(true, signatureData);
    } else {
      onSignatureChange(false);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    setHasSignature(false);
    setIsSignatureValid(false);
    onSignatureChange(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Assinatura Digital
          {required && <span className="text-red-500">*</span>}
          {!required && <span className="text-sm text-gray-500 font-normal">(opcional)</span>}
          {isSignatureValid && <CheckCircle className="h-5 w-5 text-green-600" />}
        </CardTitle>
        <CardDescription>
          {required 
            ? "Assine com o dedo ou mouse para confirmar as informações"
            : "Você pode assinar para confirmar as informações, mas não é obrigatório"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair touch-none"
            style={{ touchAction: 'none' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          {!hasSignature && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-gray-400 text-center">
                {required ? "Toque e arraste para assinar" : "Toque e arraste para assinar (opcional)"}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={clearSignature}
            className="flex items-center gap-2"
            disabled={!hasSignature}
          >
            <RefreshCw className="h-4 w-4" />
            Limpar
          </Button>
          
          {required && !isSignatureValid && (
            <p className="text-sm text-red-600">
              Assinatura obrigatória
            </p>
          )}
          
          {isSignatureValid && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Assinatura válida
            </p>
          )}
          
          {!required && !hasSignature && (
            <p className="text-sm text-gray-500">
              Assinatura opcional
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalSignature;
