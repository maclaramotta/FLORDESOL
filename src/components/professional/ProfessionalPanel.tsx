
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Phone, Edit, Check, X, Users, CalendarCheck, AlertCircle, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Appointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
  phone: string;
  status: "pendente" | "confirmado" | "cancelado";
  service?: string;
}

const ProfessionalPanel: React.FC = () => {
  // Mock data - filtered and sorted as requested
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      clientName: "Maria Silva",
      date: "2025-06-13",
      time: "14:30",
      phone: "64999887766",
      status: "pendente",
      service: "Bronzeamento Spray"
    },
    {
      id: "2",
      clientName: "Ana Costa",
      date: "2025-06-13",
      time: "15:00",
      phone: "64988776655",
      status: "confirmado",
      service: "Bronzeamento Natural"
    },
    {
      id: "3",
      clientName: "João Santos",
      date: "2025-06-14",
      time: "09:30",
      phone: "64977665544",
      status: "pendente",
      service: "Bronzeamento em Cabine"
    },
    {
      id: "4",
      clientName: "Carla Pereira",
      date: "2025-06-15",
      time: "16:00",
      phone: "64966554433",
      status: "confirmado",
      service: "Bronzeamento Spray"
    }
  ].filter(agendamento => agendamento.status !== "cancelado")
   .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime()));

  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editForm, setEditForm] = useState({
    clientName: "",
    date: "",
    time: ""
  });

  // Calculate week statistics
  const currentWeek = getCurrentWeekRange();
  const weekAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    return aptDate >= currentWeek.start && aptDate <= currentWeek.end;
  });

  const confirmedCount = weekAppointments.filter(apt => apt.status === "confirmado").length;
  const pendingCount = weekAppointments.filter(apt => apt.status === "pendente").length;
  const totalWeekCount = weekAppointments.length;

  function getCurrentWeekRange() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return { start: startOfWeek, end: endOfWeek };
  }

  const mostrarAlerta = (mensagem: string, tipo: "sucesso" | "erro") => {
    if (tipo === "sucesso") {
      toast.success(mensagem);
    } else {
      toast.error(mensagem);
    }
  };

  const atualizarStatus = (id: string, novoStatus: "confirmado" | "cancelado") => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id 
        ? { ...apt, status: novoStatus }
        : apt
    ));
  };

  const enviarWhatsApp = (telefone: string, mensagem: string) => {
    // Simulate WhatsApp message sending
    console.log(`Enviando WhatsApp para ${telefone}: ${mensagem}`);
    toast.success(`Mensagem WhatsApp enviada para ${telefone}`);
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setEditForm({
      clientName: appointment.clientName,
      date: appointment.date,
      time: appointment.time
    });
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (!editingAppointment) return;

    setAppointments(prev => prev.map(apt => 
      apt.id === editingAppointment.id 
        ? { ...apt, ...editForm }
        : apt
    ));

    mostrarAlerta("Agendamento atualizado com sucesso!", "sucesso");
    setShowEditDialog(false);
    setEditingAppointment(null);
  };

  const handleConfirm = (agendamento: Appointment) => {
    atualizarStatus(agendamento.id, "confirmado");
    enviarWhatsApp(agendamento.phone, `Olá, seu agendamento no Flor de Sol foi confirmado para ${formatDate(agendamento.date)} às ${agendamento.time}.`);
    mostrarAlerta("Agendamento confirmado com sucesso!", "sucesso");
  };

  const handleCancel = (agendamento: Appointment) => {
    const confirmed = window.confirm("Tem certeza que deseja cancelar este agendamento?");
    if (confirmed) {
      atualizarStatus(agendamento.id, "cancelado");
      enviarWhatsApp(agendamento.phone, `Seu agendamento no Flor de Sol foi cancelado. Entre em contato para remarcar.`);
      // Remove from list since we filter out canceled appointments
      setAppointments(prev => prev.filter(apt => apt.id !== agendamento.id));
      mostrarAlerta("Agendamento cancelado com sucesso!", "sucesso");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado": return "bg-green-100 text-green-800 border-green-300";
      case "pendente": return "bg-orange-100 text-orange-800 border-orange-300";
      case "cancelado": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmado": return "Confirmado";
      case "pendente": return "Pendente";
      case "cancelado": return "Cancelado";
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Agendamentos na Semana</p>
                <p className="text-3xl font-bold text-bronze-600">{totalWeekCount}</p>
              </div>
              <div className="h-12 w-12 bg-bronze-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-bronze-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmados</p>
                <p className="text-3xl font-bold text-green-600">{confirmedCount}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CalendarCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Agendamentos</CardTitle>
          <CardDescription>
            Filtrados por status ativo e ordenados por data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((agendamento) => (
              <div key={agendamento.id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-10 w-10 bg-bronze-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-bronze-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{agendamento.clientName}</h3>
                        <p className="text-gray-600">{agendamento.service}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(agendamento.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{agendamento.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>{agendamento.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Badge className={getStatusColor(agendamento.status)}>
                      {getStatusLabel(agendamento.status)}
                    </Badge>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(agendamento)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Editar
                      </Button>
                      
                      {agendamento.status === "pendente" && (
                        <Button
                          size="sm"
                          onClick={() => handleConfirm(agendamento)}
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                        >
                          <Check className="h-4 w-4" />
                          Confirmar
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancel(agendamento)}
                        className="text-red-600 border-red-300 hover:bg-red-50 flex items-center gap-1"
                      >
                        <X className="h-4 w-4" />
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Agendamento</DialogTitle>
            <DialogDescription>
              Altere os dados do agendamento conforme necessário
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome da Cliente</Label>
              <Input
                id="edit-name"
                value={editForm.clientName}
                onChange={(e) => setEditForm(prev => ({...prev, clientName: e.target.value}))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-date">Data</Label>
              <Input
                id="edit-date"
                type="date"
                value={editForm.date}
                onChange={(e) => setEditForm(prev => ({...prev, date: e.target.value}))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-time">Horário</Label>
              <Input
                id="edit-time"
                type="time"
                value={editForm.time}
                onChange={(e) => setEditForm(prev => ({...prev, time: e.target.value}))}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} className="bg-bronze-500 hover:bg-bronze-600">
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfessionalPanel;
