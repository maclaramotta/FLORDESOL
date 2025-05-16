
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const UpcomingAppointmentsTab = () => {
  return (
    <Card className="border shadow-md">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Seus Próximos Agendamentos</h3>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-white flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-bronze-100 flex items-center justify-center">
                <Bell className="h-6 w-6 text-bronze-600" />
              </div>
              <div>
                <h4 className="font-medium">Bronzeamento em Cabine</h4>
                <p className="text-gray-500">Session: 20 minutos</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">28 Maio, 2025</div>
              <div className="text-sm text-gray-500">15:30</div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg bg-white flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-bronze-100 flex items-center justify-center">
                <Bell className="h-6 w-6 text-bronze-600" />
              </div>
              <div>
                <h4 className="font-medium">Bronzeamento Natural</h4>
                <p className="text-gray-500">Session: 30 minutos</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">10 Junho, 2025</div>
              <div className="text-sm text-gray-500">10:00</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button className="bg-bronze-500 hover:bg-bronze-600">
            Ver Todos os Agendamentos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentsTab;
