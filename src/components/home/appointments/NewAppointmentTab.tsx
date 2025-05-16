
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentScheduler from "@/components/appointments/AppointmentScheduler";
import { Bell } from "lucide-react";

const NewAppointmentTab = () => {
  return (
    <Card className="border shadow-md">
      <CardContent className="pt-6">
        <AppointmentScheduler />
        
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-md p-4">
          <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
            <Bell className="h-4 w-4 mr-2" /> Cuidados antes do bronzeamento
          </h3>
          <ul className="text-amber-800 space-y-2">
            <li>• Hidrate-se bem nas 24h anteriores</li>
            <li>• Evite usar cremes ou óleos no dia da sessão</li>
            <li>• Faça esfoliação um dia antes</li>
            <li>• Evite depilar-se no mesmo dia</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewAppointmentTab;
