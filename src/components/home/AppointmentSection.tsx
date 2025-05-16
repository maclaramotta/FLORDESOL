
import React from "react";
import AppointmentTabs from "./appointments/AppointmentTabs";

const AppointmentSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Agende Seu Bronzeamento</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha o horário ideal e o método de bronzeamento perfeito para o seu tipo de pele
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AppointmentTabs />
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
