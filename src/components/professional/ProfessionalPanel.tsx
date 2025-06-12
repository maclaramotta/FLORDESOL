
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Phone, User, MessageCircle } from "lucide-react";
import { toast } from "sonner";

type AppointmentStatus = "pendente" | "confirmado" | "cancelado";

interface ProfessionalAppointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
  phone: string;
  status: AppointmentStatus;
  service: string;
}

const ProfessionalPanel: React.FC = () => {
  const [appointments, setAppointments] = useState<ProfessionalAppointment[]>([
    {
      id: "1",
      clientName: "Maria Silva",
      date: "2024-01-15",
      time: "10:00",
      phone: "(11) 99999-9999",
      status: "pendente",
      service: "Bronzeamento Natural"
    },
    {
      id: "2", 
      clientName: "João Santos",
      date: "2024-01-15",
      time: "14:00",
      phone: "(11) 88888-8888",
      status: "confirmado",
      service: "Spray Bronzeador"
    },
    {
      id: "3",
      clientName: "Ana Costa",
      date: "2024-01-16",
      time: "09:00", 
      phone: "(11) 77777-7777",
      status: "pendente",
      service: "Cabine UV"
    }
  ]);

  const filteredAppointments = appointments
    .filter(appointment => appointment.status !== "cancelado")
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime());

  const updateAppointmentStatus = (id: string, newStatus: AppointmentStatus) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: newStatus } : appointment
      )
    );
  };

  const sendWhatsAppMessage = (phone: string, message: string) => {
    // Simulate WhatsApp message sending
    console.log(`Sending WhatsApp to ${phone}: ${message}`);
    toast.success(`Mensagem enviada para ${phone}`);
  };

  const handleConfirmAppointment = (appointment: ProfessionalAppointment) => {
    updateAppointmentStatus(appointment.id, "confirmado");
    const message = `Olá, seu agendamento no Flor de Sol foi confirmado para ${appointment.date} às ${appointment.time}.`;
    sendWhatsAppMessage(appointment.phone, message);
  };

  const handleCancelAppointment = (appointment: ProfessionalAppointment) => {
    updateAppointmentStatus(appointment.id, "cancelado");
    const message = `Seu agendamento no Flor de Sol foi cancelado. Entre em contato para remarcar.`;
    sendWhatsAppMessage(appointment.phone, message);
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case "pendente":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Pendente</Badge>;
      case "confirmado":
        return <Badge variant="outline" className="bg-green-50 text-green-700">Confirmado</Badge>;
      case "cancelado":
        return <Badge variant="outline" className="bg-red-50 text-red-700">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agendamentos</h2>
        <p className="text-gray-600">{filteredAppointments.length} agendamentos ativos</p>
      </div>

      <div className="grid gap-4">
        {filteredAppointments.map((appointment) => (
          <Card key={appointment.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {appointment.clientName}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {appointment.service}
                  </CardDescription>
                </div>
                {getStatusBadge(appointment.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{appointment.phone}</span>
                </div>
              </div>

              {appointment.status === "pendente" && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleConfirmAppointment(appointment)}
                    className="bg-green-600 hover:bg-green-700 flex-1"
                    size="sm"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Confirmar
                  </Button>
                  <Button
                    onClick={() => handleCancelAppointment(appointment)}
                    variant="destructive"
                    className="flex-1"
                    size="sm"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">Nenhum agendamento ativo encontrado.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfessionalPanel;
