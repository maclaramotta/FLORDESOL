
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Phone, Edit, Check, X, Users, CalendarCheck, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Appointment {
  id: string;
  clientName: string;
  date: string;
  time: string;
  phone: string;
  status: "Pendente" | "Confirmado" | "Cancelado";
  service?: string;
}

const ProfessionalPanel: React.FC = () => {
  // Mock data - in production this would come from a database
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      clientName: "Maria Silva",
      date: "2025-06-13",
      time: "14:30",
      phone: "64999887766",
      status: "Pendente",
      service: "Bronzeamento Spray"
    },
    {
      id: "2",
      clientName: "Ana Costa",
      date: "2025-06-13",
      time: "15:00",
      phone: "64988776655",
      status: "Confirmado",
      service: "Bronzeamento Natural"
    },
    {
      id: "3",
      clientName: "João Santos",
      date: "2025-06-14",
      time: "09:30",
      phone: "64977665544",
      status: "Pendente",
      service: "Bronzeamento em Cabine"
    },
    {
      id: "4",
      clientName: "Carla Pereira",
      date: "2025-06-15",
      time: "16:00",
      phone: "64966554433",
      status: "Confirmado",
      service: "Bronzeamento Spray"
    }
  ]);

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

  const confirmedCount = weekAppointments.filter(apt => apt.status === "Confirmado").length;
  const pendingCount = weekAppointments.filter(apt => apt.status === "Pendente").length;
  const totalWeekCount = weekAppointments.length;

  function getCurrentWeekRange() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return { start: startOfWeek, end: endOfWeek };
  }

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

    toast.success("Agendamento atualizado com sucesso!");
    setShowEditDialog(false);
    setEditingAppointment(null);
  };

  const handleConfirm = (id: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id 
        ? { ...apt, status: "Confirmado" as const }
        : apt
    ));
    toast.success("Presença confirmada com sucesso!");
  };

  const handleCancel = (id: string) => {
    const confirmed = window.confirm("Tem certeza que deseja cancelar este agendamento?");
    if (confirmed) {
      setAppointments(prev => prev.filter(apt => apt.id !== id));
      toast.success("Agendamento cancelado com sucesso!");
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado": return "bg-green-100 text-green-800 border-green-300";
      case "Pendente": return "bg-orange-100 text-orange-800 border-orange-300";
      case "Cancelado": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
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
          <CardTitle>Agenda de Clientes</CardTitle>
          <CardDescription>
            Gerencie todos os agendamentos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-10 w-10 bg-bronze-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-bronze-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.clientName}</h3>
                        <p className="text-gray-600">{appointment.service}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        <span>{appointment.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status}
                    </Badge>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(appointment)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Editar
                      </Button>
                      
                      {appointment.status === "Pendente" && (
                        <Button
                          size="sm"
                          onClick={() => handleConfirm(appointment.id)}
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                        >
                          <Check className="h-4 w-4" />
                          Confirmar
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancel(appointment.id)}
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
