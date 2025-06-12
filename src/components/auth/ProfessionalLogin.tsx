
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface ProfessionalLoginProps {
  onLoginSuccess: () => void;
}

const ProfessionalLogin: React.FC<ProfessionalLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Updated credentials as requested
  const VALID_CREDENTIALS = {
    email: "admin@flordesol.com",
    password: "admin123"
  };

  const mostrarAlerta = (mensagem: string, tipo: "sucesso" | "erro") => {
    if (tipo === "sucesso") {
      toast.success(mensagem);
    } else {
      toast.error(mensagem);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      mostrarAlerta("Por favor, preencha todos os campos", "erro");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      // Store login state in localStorage for demo purposes
      localStorage.setItem("professional_logged_in", "true");
      localStorage.setItem("professional_email", email);
      
      mostrarAlerta("Acesso autorizado com sucesso!", "sucesso");
      onLoginSuccess();
    } else {
      mostrarAlerta("Acesso restrito. E-mail ou senha incorretos.", "erro");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-bronze-100 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-bronze-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Área do Profissional
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Acesso restrito para profissionais autorizados
          </p>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Entrar no Sistema</CardTitle>
            <CardDescription>
              Use seu e-mail e senha de acesso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Digite seu e-mail"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite sua senha"
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-bronze-500 hover:bg-bronze-600"
                disabled={isLoading}
              >
                {isLoading ? "Verificando acesso..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Demo: admin@flordesol.com / admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalLogin;
