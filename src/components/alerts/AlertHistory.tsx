
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MessageCircle, Mail, Bell, CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertType } from "@/types/alerts";

const AlertHistory = () => {
  // Mock histórico de alertas
  const alertHistory: (Alert & { clientName: string })[] = [
    {
      id: "1",
      appointmentId: "apt-1",
      clientId: "client-1",
      clientName: "Maria Silva",
      type: AlertType.WHATSAPP,
      timing: "24_HOURS" as any,
      message: "Confirmação de agendamento",
      sent: true,
      scheduledFor: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "2",
      appointmentId: "apt-2",
      clientId: "client-2",
      clientName: "Ana Costa",
      type: AlertType.WHATSAPP,
      timing: "1_HOUR" as any,
      message: "Lembrete de agendamento",
      sent: true,
      scheduledFor: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: "3",
      appointmentId: "apt-3",
      clientId: "client-3",
      clientName: "Julia Santos",
      type: AlertType.EMAIL,
      timing: "24_HOURS" as any,
      message: "E-mail de confirmação",
      sent: false,
      scheduledFor: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getTypeIcon = (type: AlertType) => {
    switch (type) {
      case AlertType.WHATSAPP:
        return <MessageCircle className="h-4 w-4 text-green-600" />;
      case AlertType.EMAIL:
        return <Mail className="h-4 w-4 text-blue-600" />;
      case AlertType.PUSH:
        return <Bell className="h-4 w-4 text-purple-600" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: AlertType) => {
    switch (type) {
      case AlertType.WHATSAPP:
        return "WhatsApp";
      case AlertType.EMAIL:
        return "E-mail";
      case AlertType.PUSH:
        return "Push";
      default:
        return type;
    }
  };

  const getStatusBadge = (sent: boolean, scheduledFor: string) => {
    const isScheduled = new Date(scheduledFor) > new Date();
    
    if (sent) {
      return (
        <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Enviado
        </Badge>
      );
    } else if (isScheduled) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
          <Bell className="h-3 w-3" />
          Agendado
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Falhou
        </Badge>
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-bronze-500" />
          Histórico de Alertas
        </CardTitle>
        <CardDescription>
          Visualize todos os alertas enviados e agendados
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Mensagem</TableHead>
                <TableHead>Agendado para</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alertHistory.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    <div className="font-medium">{alert.clientName}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(alert.type)}
                      <span>{getTypeLabel(alert.type)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={alert.message}>
                      {alert.message}
                    </div>
                  </TableCell>
                  <TableCell>{formatDateTime(alert.scheduledFor)}</TableCell>
                  <TableCell>{getStatusBadge(alert.sent, alert.scheduledFor)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {alertHistory.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum alerta no histórico</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertHistory;
