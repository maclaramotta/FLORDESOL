
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  User, 
  Heart, 
  MessageSquare, 
  Sun,
  MapPin,
  Camera
} from "lucide-react";
import MainNavigation from "./MainNavigation";

const HeroSection = () => {
  const whatsappNumber = "5564996170209";
  const address = "Rua João Rodrigues Jota, 251, Santos Dumont, Itumbiara GO";

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
          <p className="text-xl md:text-2xl mb-4 text-amber-600">ESTÉTICA E BRONZEAMENTO</p>
          <p className="text-lg mb-8 text-gray-700 font-medium">
            ✨ Agende seu bronze natural em poucos cliques! ✨
          </p>
          
          <MainNavigation className="hidden md:flex" />

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Button size="lg" className="bg-bronze-500 hover:bg-bronze-600" asChild>
              <Link to="/appointments">
                <Calendar className="mr-2 h-5 w-5" /> 
                Agendar Agora ☀️
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/bronze-simulator">
                <Camera className="mr-2 h-5 w-5" />
                Simular Bronze
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12">
          <Link 
            to="/appointments"
            className="flex flex-col items-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-amber-200"
          >
            <div className="bg-amber-100 text-amber-600 p-4 rounded-full mb-3">
              <Sun className="h-7 w-7" />
            </div>
            <span className="text-base font-semibold text-amber-800 text-center">Agendar Bronze</span>
            <span className="text-sm text-amber-600 text-center mt-1">Sessões disponíveis</span>
          </Link>

          <Link 
            to="/bronze-simulator"
            className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-purple-200"
          >
            <div className="bg-purple-100 text-purple-600 p-4 rounded-full mb-3">
              <Camera className="h-7 w-7" />
            </div>
            <span className="text-base font-semibold text-purple-800 text-center">Simular Bronze ✨</span>
            <span className="text-sm text-purple-600 text-center mt-1">Veja como ficará</span>
          </Link>

          <button
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank')}
            className="flex flex-col items-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-green-200"
          >
            <div className="bg-green-100 text-green-600 p-4 rounded-full mb-3">
              <MapPin className="h-7 w-7" />
            </div>
            <span className="text-base font-semibold text-green-800 text-center">Como Chegar 🚗</span>
            <span className="text-sm text-green-600 text-center mt-1">Localização no mapa</span>
          </button>

          <button
            onClick={() => window.open(`https://wa.me/${whatsappNumber}?text=Olá! Preciso de ajuda.`, '_blank')}
            className="flex flex-col items-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-emerald-200"
          >
            <div className="bg-emerald-100 text-emerald-600 p-4 rounded-full mb-3">
              <MessageSquare className="h-7 w-7" />
            </div>
            <span className="text-base font-semibold text-emerald-800 text-center">Falar com a gente 💬</span>
            <span className="text-sm text-emerald-600 text-center mt-1">WhatsApp direto</span>
          </button>
        </div>

        <div className="mt-12 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">
            ✨ Por que escolher o Flor de Sol?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-2xl mb-2">☀️</div>
              <h4 className="font-semibold text-amber-800 mb-1">Bronze Natural</h4>
              <p className="text-sm text-amber-700">Resultado uniforme e duradouro</p>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-2xl mb-2">📱</div>
              <h4 className="font-semibold text-amber-800 mb-1">Agendamento Fácil</h4>
              <p className="text-sm text-amber-700">Reserve em poucos cliques</p>
            </div>
            <div className="bg-white/50 rounded-lg p-4">
              <div className="text-2xl mb-2">💬</div>
              <h4 className="font-semibold text-amber-800 mb-1">Suporte Direto</h4>
              <p className="text-sm text-amber-700">WhatsApp sempre disponível</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
