
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, Phone, Mail, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Appointment, BronzingMethod } from "@/types";

const TodayAppointments = () => {
  const [sendingAlert, setSendingAlert] = useState<string | null>(null);

  // Mock data - agendamentos de hoje
  const todayAppointments: (Appointment & { clientName: string; clientPhone: string })[] = [
    {
      id: "1",
      clientId: "client-1",
      clientName: "Maria Silva",
      clientPhone: "5511999887766",
      date: new Date().toISOString(),
      status: "scheduled",
      bronzingMethod: BronzingMethod.BOOTH,
      duration: 20,
      professionalId: "prof-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      clientId: "client-2",
      clientName: "Ana Costa",
      clientPhone: "5511988776655",
      date: new Date().toISOString(),
      status: "scheduled",
      bronzingMethod: BronzingMethod.SPRAY,
      duration: 15,
      professionalId: "prof-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      clientId: "client-3",
      clientName: "Julia Santos",
      clientPhone: "5511977665544",
      date: new Date().toISOString(),
      status: "confirmed",
      bronzingMethod: BronzingMethod.NATURAL,
      duration: 30,
      professionalId: "prof-1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const sendWhatsAppAlert = async (appointment: Appointment & { clientName: string; clientPhone: string }) => {
    setSendingAlert(appointment.id);
    
    try {
      const message = `Olá ${appointment.clientName}! 🌞

Estamos confirmando seu bronzeamento marcado para hoje, ${formatDate(appointment.date)} às ${formatTime(appointment.date)}.

📋 Detalhes:
• Tipo: ${appointment.bronzingMethod}
• Duração: ${appointment.duration} minutos

Por favor, responda com:
✅ para confirmar
❌ para cancelar

Aguardamos você! 😊

*Flor de Sol - Studio de Bronzeamento*`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${appointment.clientPhone}&text=${encodedMessage}`;
      
      // Abrir WhatsApp em nova aba
      window.open(whatsappUrl, '_blank');
      
      toast.success(`Mensagem enviada para ${appointment.clientName}`);
    } catch (error) {
      toast.error("Erro ao enviar mensagem");
    } finally {
      setSendingAlert(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmado</Badge>;
      case "scheduled":
        return <Badge className="bg-yellow-100 text-yellow-800">Agendado</Badge>;
      case "canceled":
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const getMethodLabel = (method: BronzingMethod) => {
    switch (method) {
      case BronzingMethod.BOOTH:
        return "Cabine";
      case BronzingMethod.SPRAY:
        return "Spray";
      case BronzingMethod.NATURAL:
        return "Natural";
      case BronzingMethod.CREAM:
        return "Creme";
      default:
        return method;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-bronze-500" />
          Agendamentos de Hoje
        </CardTitle>
        <CardDescription>
          Envie alertas e confirmações para os clientes agendados para hoje
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todayAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{appointment.clientName}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {appointment.clientPhone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatTime(appointment.date)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getMethodLabel(appointment.bronzingMethod)}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendWhatsAppAlert(appointment)}
                        disabled={sendingAlert === appointment.id}
                        className="text-green-600 border-green-300 hover:bg-green-50"
                      >
                        {sendingAlert === appointment.id ? (
                          "Enviando..."
                        ) : (
                          <>
                            <MessageCircle className="h-4 w-4 mr-1" />
                            WhatsApp
                          </>
                        )}
                      </Button>
                      {appointment.status === "confirmed" && (
                        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Confirmado
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {todayAppointments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum agendamento para hoje</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodayAppointments;
