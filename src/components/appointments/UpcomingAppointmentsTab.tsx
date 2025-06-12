
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MessageCircle, FileText, Calendar, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface Appointment {
  id: number;
  type: string;
  duration: string;
  date: string;
  time: string;
  status: string;
}

interface UpcomingAppointmentsTabProps {
  appointments: Appointment[];
  onSetActiveTab: (tab: string) => void;
}

const UpcomingAppointmentsTab: React.FC<UpcomingAppointmentsTabProps> = ({
  appointments,
  onSetActiveTab
}) => {
  const handleWhatsAppAppointment = (date: string, time: string) => {
    const message = `Olá!%20Sobre%20meu%20agendamento%20em%20${encodeURIComponent(date)}%20às%20${encodeURIComponent(time)}`;
    window.open(`https://wa.me/5564996170209?text=${message}`, "_blank");
  };

  const handleWhatsAppReschedule = (date: string, time: string) => {
    const message = `Gostaria%20de%20reagendar%20meu%20agendamento%20de%20${encodeURIComponent(date)}%20às%20${encodeURIComponent(time)}`;
    window.open(`https://wa.me/5564996170209?text=${message}`, "_blank");
  };

  return (
    <Card className="border shadow-md">
      <CardContent className="pt-6">
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <p className="text-yellow-800 text-sm">
            <strong>⚠️ Você será lembrada 24h antes no WhatsApp para confirmar.</strong>
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-4">Seus Próximos Agendamentos</h3>
        
        <div className="space-y-4">
          {appointments.map(appointment => (
            <div key={appointment.id} className="p-6 border rounded-lg bg-white shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-bronze-100 flex items-center justify-center">
                    <Bell className="h-6 w-6 text-bronze-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg">{appointment.type}</h4>
                    <p className="text-gray-500">Sessão: {appointment.duration}</p>
                    <p className="text-sm font-medium text-bronze-600">Status: {appointment.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-lg">{appointment.date}</div>
                  <div className="text-sm text-gray-500">{appointment.time}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <Button 
                  asChild
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Link to="/anamnesis">
                    <FileText className="h-4 w-4" />
                    📋 Preencher Ficha (opcional)
                  </Link>
                </Button>

                <Button 
                  variant="outline"
                  className="flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-50"
                  onClick={() => handleWhatsAppAppointment(appointment.date, appointment.time)}
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar com a gente 💬
                </Button>

                <Button 
                  variant="outline"
                  className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50"
                  onClick={() => handleWhatsAppReschedule(appointment.date, appointment.time)}
                >
                  <Calendar className="h-4 w-4" />
                  Cancelar/Reagendar
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {appointments.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Você não possui agendamentos futuros.</p>
            <Button 
              className="bg-bronze-500 hover:bg-bronze-600"
              onClick={() => onSetActiveTab("new")}
            >
              Agendar Nova Sessão
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointmentsTab;
