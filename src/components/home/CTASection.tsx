
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-bronze-500 to-bronze-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Quer revolucionar seu bronzeamento?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Agende agora mesmo sua sessão e experimente um atendimento personalizado com base no seu tipo de pele
        </p>
        <Button size="lg" variant="outline" className="bg-white text-bronze-700 hover:bg-gray-100" asChild>
          <Link to="/register">Comece agora</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
