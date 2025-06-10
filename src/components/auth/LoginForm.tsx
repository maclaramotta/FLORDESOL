
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const LoginForm = () => {
  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    
    // Apply mask (XX) XXXXX-XXXX
    if (numericValue.length <= 11) {
      return numericValue
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setCelular(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!nome || !celular) {
      toast.error("Por favor, preencha todos os campos");
      setIsLoading(false);
      return;
    }

    // Validate phone number (should have 11 digits)
    const numericPhone = celular.replace(/\D/g, '');
    if (numericPhone.length !== 11) {
      toast.error("Por favor, insira um número de celular válido");
      setIsLoading(false);
      return;
    }

    try {
      // Simulate saving to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save client data to localStorage (temporary solution)
      const clientData = {
        nome: nome,
        celular: celular,
        id: `client-${Date.now()}`, // Generate simple ID
        loginDate: new Date().toISOString()
      };
      
      localStorage.setItem('cliente_atual', JSON.stringify(clientData));
      toast.success(`Bem-vinda, ${nome}!`);
      
      // Navigate to appointments page instead of checking anamnesis
      navigate("/appointments");
      
    } catch (error) {
      toast.error("Falha ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Acesso Rápido</CardTitle>
        <CardDescription>
          Digite seu nome e celular para acessar seus agendamentos
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              type="text"
              placeholder="Digite seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="celular">Celular</Label>
            <Input
              id="celular"
              type="tel"
              placeholder="(00) 00000-0000"
              value={celular}
              onChange={handlePhoneChange}
              maxLength={15}
              required
            />
          </div>
        </CardContent>
        <CardContent>
          <Button
            type="submit"
            className="w-full bg-bronze-500 hover:bg-bronze-600"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default LoginForm;
