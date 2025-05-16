
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Clock, Bell, List, CalendarCheck, Calendar } from "lucide-react";
import { toast } from "sonner";
import AppointmentScheduler from "@/components/appointments/AppointmentScheduler";
import { Form } from "@/components/ui/form";

const Scheduling = () => {
  const [activeTab, setActiveTab] = useState("new");

  // Mock upcoming appointments data
  const upcomingAppointments = [
    {
      id: 1,
      type: "Bronzeamento em Cabine",
      duration: "20 minutos",
      date: "28 Maio, 2025",
      time: "15:30"
    },
    {
      id: 2,
      type: "Bronzeamento Natural",
      duration: "30 minutos",
      date: "10 Junho, 2025",
      time: "10:00"
    }
  ];

  // Mock history data
  const appointmentHistory = [
    {
      id: 101,
      type: "Bronzeamento Spray",
      duration: "15 minutos",
      date: "15 Abril, 2025",
      time: "14:00"
    },
    {
      id: 102,
      type: "Bronzeamento em Cabine",
      duration: "20 minutos",
      date: "1 Março, 2025",
      time: "11:30"
    },
    {
      id: 103,
      type: "Bronzeamento Natural",
      duration: "25 minutos",
      date: "15 Fevereiro, 2025",
      time: "09:45"
    }
  ];

  const handleCancelAppointment = (id: number) => {
    toast.success(`Agendamento #${id} cancelado com sucesso`);
    // Here you would handle the cancellation logic
  };

  const handleReschedule = (id: number) => {
    setActiveTab("new");
    toast.info(`Vamos reagendar o horário #${id}`);
    // Here you would handle the rescheduling logic
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-6 tracking-tight text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              Agendamento de Bronzeamento
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl mx-auto">
            Escolha o horário ideal para o seu bronzeamento e receba lembretes personalizados 
            para uma experiência perfeita.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="new" className="flex items-center gap-2">
              <CalendarPlus size={18} />
              Novo Agendamento
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <CalendarCheck size={18} />
              Próximos Horários
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Calendar size={18} />
              Histórico
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new">
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
          </TabsContent>
          
          <TabsContent value="upcoming">
            <Card className="border shadow-md">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Seus Próximos Agendamentos</h3>
                
                <div className="space-y-4">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="p-4 border rounded-lg bg-white flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-bronze-100 flex items-center justify-center">
                          <Bell className="h-6 w-6 text-bronze-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{appointment.type}</h4>
                          <p className="text-gray-500">Sessão: {appointment.duration}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{appointment.date}</div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {upcomingAppointments.length > 0 && (
                  <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      variant="outline" 
                      className="text-bronze-600 border-bronze-300"
                      onClick={() => handleCancelAppointment(upcomingAppointments[0].id)}
                    >
                      Cancelar Agendamento
                    </Button>
                    <Button 
                      className="bg-bronze-500 hover:bg-bronze-600"
                      onClick={() => handleReschedule(upcomingAppointments[0].id)}
                    >
                      Reagendar Horário
                    </Button>
                  </div>
                )}
                
                {upcomingAppointments.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">Você não possui agendamentos futuros.</p>
                    <Button 
                      className="bg-bronze-500 hover:bg-bronze-600"
                      onClick={() => setActiveTab("new")}
                    >
                      Agendar Nova Sessão
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="border shadow-md">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Histórico de Bronzeamentos</h3>
                
                <div className="space-y-4">
                  {appointmentHistory.map(appointment => (
                    <div key={appointment.id} className="p-4 border rounded-lg bg-white flex justify-between items-center opacity-80 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <Clock className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{appointment.type}</h4>
                          <p className="text-gray-500">Sessão: {appointment.duration}</p>
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
                    onClick={() => setActiveTab("new")}
                  >
                    Agendar Nova Sessão
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-bronze-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">Cuidados Pós-Bronzeamento</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2 text-bronze-700">Primeiras 24 horas</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Evite banhos quentes e prolongados</li>
                <li>• Não use produtos esfoliantes</li>
                <li>• Mantenha-se hidratado</li>
                <li>• Evite atividades que causem transpiração intensa</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2 text-bronze-700">Manutenção do Bronze</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Hidrate a pele diariamente</li>
                <li>• Use produtos específicos para bronzeamento</li>
                <li>• Evite exposição excessiva ao sol</li>
                <li>• Agende suas sessões respeitando o intervalo recomendado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
