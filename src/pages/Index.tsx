
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AppointmentSection from "@/components/home/AppointmentSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import DemoSection from "@/components/home/DemoSection";
import CTASection from "@/components/home/CTASection";
import FooterSection from "@/components/home/FooterSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <AppointmentSection />
      <FeaturesSection />
      <DemoSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
