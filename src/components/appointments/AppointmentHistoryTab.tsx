
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface HistoryAppointment {
  id: number;
  type: string;
  duration: string;
  date: string;
  time: string;
  status: string;
}

interface AppointmentHistoryTabProps {
  appointments: HistoryAppointment[];
  onSetActiveTab: (tab: string) => void;
}

const AppointmentHistoryTab: React.FC<AppointmentHistoryTabProps> = ({
  appointments,
  onSetActiveTab
}) => {
  return (
    <Card className="border shadow-md">
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Histórico de Bronzeamentos</h3>
        
        <div className="space-y-4">
          {appointments.map(appointment => (
            <div key={appointment.id} className="p-4 border rounded-lg bg-white flex justify-between items-center opacity-80 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium">{appointment.type}</h4>
                  <p className="text-gray-500">Sessão: {appointment.duration}</p>
                  <p className="text-sm text-green-600">Status: {appointment.status}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{appointment.date}</div>
                <div className="text-sm text-gray-500">{appointment.time}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline"
            onClick={() => onSetActiveTab("new")}
          >
            Agendar Nova Sessão
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentHistoryTab;
