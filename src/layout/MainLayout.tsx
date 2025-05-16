
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const navigationItems = [
    { name: "Início", path: "/" },
    { name: "Agendamentos", path: "/appointments" },
    { name: "Clientes", path: "/clients" },
    { name: "Anamnese", path: "/anamnesis" },
    { name: "Profissionais", path: "/professionals" },
    { name: "Recursos", path: "/features" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {!isLandingPage && (
        <header className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bronze-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">BS</span>
              </div>
              <span className="font-bold text-xl">BronzeSun</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "text-bronze-600"
                      : "text-gray-600 hover:text-bronze-500"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Cadastrar</Link>
              </Button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1">
        {children}
      </main>
      
      {!isLandingPage && (
        <footer className="bg-gray-50 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-gray-500 mb-4 md:mb-0">
                © {new Date().getFullYear()} BronzeSun. Todos os direitos reservados.
              </div>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-bronze-500">
                  Privacidade
                </Link>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-bronze-500">
                  Termos
                </Link>
                <Link to="/lgpd" className="text-sm text-gray-500 hover:text-bronze-500">
                  LGPD
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}
      <Toaster />
    </div>
  );
};

export default MainLayout;
