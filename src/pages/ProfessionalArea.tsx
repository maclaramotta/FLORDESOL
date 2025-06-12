
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import ProfessionalLogin from "@/components/auth/ProfessionalLogin";
import ProfessionalPanel from "@/components/professional/ProfessionalPanel";

const ProfessionalArea: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Check if professional is already logged in
    const loggedIn = localStorage.getItem("professional_logged_in") === "true";
    const storedEmail = localStorage.getItem("professional_email") || "";
    
    setIsLoggedIn(loggedIn);
    setUserEmail(storedEmail);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setUserEmail(localStorage.getItem("professional_email") || "");
  };

  const handleLogout = () => {
    localStorage.removeItem("professional_logged_in");
    localStorage.removeItem("professional_email");
    setIsLoggedIn(false);
    setUserEmail("");
  };

  if (!isLoggedIn) {
    return <ProfessionalLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Painel Profissional
          </h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo! Gerencie todos os agendamentos aqui.
          </p>
        </div>
        
        <Button
          onClick={handleLogout}
          variant="outline"
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>

      <ProfessionalPanel />
    </div>
  );
};

export default ProfessionalArea;
