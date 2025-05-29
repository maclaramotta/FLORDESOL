
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cpf: "",
    address: "",
    anamnesis: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.cpf) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      setIsLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor, insira um e-mail válido");
      setIsLoading(false);
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      setIsLoading(false);
      return;
    }

    try {
      // Mock registration - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("Conta criada com sucesso! Bem-vindo à Flor de Sol!");
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        cpf: "",
        address: "",
        anamnesis: ""
      });
    } catch (error) {
      toast.error("Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Criar Conta</CardTitle>
        <CardDescription>
          Cadastre-se na Flor de Sol para agendar suas sessões de bronzeamento
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail *</Label>
              <Input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => handleInputChange("cpf", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço (opcional)</Label>
              <Input
                id="address"
                type="text"
                placeholder="Seu endereço"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="anamnesis">Ficha de Anamnese</Label>
            <Textarea
              id="anamnesis"
              placeholder="Descreva seu histórico de bronzeamento, alergias, medicamentos em uso, condições de pele, preferências e qualquer informação relevante para seu atendimento..."
              rows={6}
              value={formData.anamnesis}
              onChange={(e) => handleInputChange("anamnesis", e.target.value)}
              className="resize-none"
            />
            <p className="text-sm text-gray-500">
              Estas informações nos ajudam a oferecer um atendimento personalizado e seguro
            </p>
          </div>

          <div className="bg-bronze-50 border border-bronze-200 rounded-md p-4">
            <p className="text-sm text-bronze-800">
              <span className="font-semibold">Importante:</span> Ao criar sua conta, você concorda com nossos termos de uso e política de privacidade. Suas informações são protegidas conforme a LGPD.
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full bg-bronze-500 hover:bg-bronze-600"
            disabled={isLoading}
          >
            {isLoading ? "Criando conta..." : "Cadastrar / Criar Conta"}
          </Button>
          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-bronze-500 hover:text-bronze-600 font-medium">
              Fazer login
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
