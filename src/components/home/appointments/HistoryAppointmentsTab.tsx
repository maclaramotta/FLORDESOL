
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

const HistoryAppointmentsTab = () => {
  return (
    <Card className="border shadow-md">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Histórico de Bronzeamentos</h3>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-white flex justify-between items-center opacity-70">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Bell className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium">Bronzeamento Spray</h4>
                <p className="text-gray-500">Session: 15 minutos</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">15 Abril, 2025</div>
              <div className="text-sm text-gray-500">14:00</div>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg bg-white flex justify-between items-center opacity-70">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Bell className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h4 className="font-medium">Bronzeamento em Cabine</h4>
                <p className="text-gray-500">Session: 20 minutos</p>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium">1 Março, 2025</div>
              <div className="text-sm text-gray-500">11:30</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button variant="outline">
            Ver Histórico Completo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryAppointmentsTab;
