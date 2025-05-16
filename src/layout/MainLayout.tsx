
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import MainNavigation from "@/components/home/MainNavigation";
import { Sun, Menu, X } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {!isLandingPage && (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bronze-gradient flex items-center justify-center">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-bronze-800">FLOR DE SOL</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <MainNavigation />
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild className="hidden sm:flex">
                <Link to="/login">Entrar</Link>
              </Button>
              <Button size="sm" asChild className="hidden sm:flex bg-bronze-500 hover:bg-bronze-600">
                <Link to="/register">Cadastrar</Link>
              </Button>
              
              <button 
                className="md:hidden p-2 rounded-md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6">
              <MainNavigation vertical className="mb-6" />
              
              <div className="flex flex-col space-y-3">
                <Button variant="outline" size="sm" asChild className="justify-center">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button size="sm" asChild className="justify-center bg-bronze-500 hover:bg-bronze-600">
                  <Link to="/register">Cadastrar</Link>
                </Button>
              </div>
            </div>
          )}
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
                © {new Date().getFullYear()} Flor De Sol. Todos os direitos reservados.
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
