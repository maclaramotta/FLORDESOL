
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  User, 
  Heart, 
  MessageSquare, 
  Sun
} from "lucide-react";
import MainNavigation from "./MainNavigation";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 shine-gradient animate-shine"></div>
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800 text-7xl flex items-center justify-center gap-2">
              <Sun className="h-12 w-12 md:h-16 md:w-16 text-amber-500" /> FLOR DE SOL
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-amber-600">ESTÉTICA E BRONZEAMENTO</p>
          
          <MainNavigation className="hidden md:flex" />

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Button size="lg" className="bg-bronze-500 hover:bg-bronze-600" asChild>
              <Link to="/appointments">
                <Calendar className="mr-2 h-5 w-5" /> 
                Agendar Sessão
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Fazer Login</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mt-12">
          {[
            { icon: <Calendar className="h-6 w-6" />, label: "Agendar Sessão", path: "/appointments" },
            { icon: <User className="h-6 w-6" />, label: "Perfil", path: "/clients" },
            { icon: <Heart className="h-6 w-6" />, label: "Cuidados", path: "/features/security" },
            { icon: <MessageSquare className="h-6 w-6" />, label: "Chat / Suporte", path: "/support" }
          ].map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 border border-amber-100"
            >
              <div className="bg-amber-50 text-amber-600 p-3 rounded-full mb-2">
                {item.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
