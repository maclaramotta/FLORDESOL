
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 shine-gradient animate-shine"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800 text-7xl">FLOR DE SOL</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-amber-600">ESTÉTICA E BRONZEAMENTO</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-bronze-500 hover:bg-bronze-600" asChild>
              <Link to="/login">Fazer Login</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/register">Registrar-se</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
