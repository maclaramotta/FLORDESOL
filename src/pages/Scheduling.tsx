
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarPlus, CalendarCheck, Calendar } from "lucide-react";
import AppointmentScheduler from "@/components/appointments/AppointmentScheduler";
import UpcomingAppointmentsTab from "@/components/appointments/UpcomingAppointmentsTab";
import AppointmentHistoryTab from "@/components/appointments/AppointmentHistoryTab";
import PreparationTips from "@/components/appointments/PreparationTips";
import PostBronzeCare from "@/components/appointments/PostBronzeCare";

const Scheduling = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("new");
  const [clientName, setClientName] = useState<string>("");

  useEffect(() => {
    // Get client name from navigation state or localStorage
    const nameFromState = location.state?.clientName;
    const nameFromStorage = localStorage.getItem("client_name_mock-client-id");
    
    if (nameFromState) {
      setClientName(nameFromState);
    } else if (nameFromStorage) {
      setClientName(nameFromStorage);
    }
  }, [location.state]);

  // Mock upcoming appointments data
  const upcomingAppointments = [
    {
      id: 1,
      type: "Bronzeamento em Cabine",
      duration: "20 minutos",
      date: "28 Maio, 2025",
      time: "15:30",
      status: "Confirmado"
    },
    {
      id: 2,
      type: "Bronzeamento Natural",
      duration: "30 minutos",
      date: "10 Junho, 2025",
      time: "10:00",
      status: "Pendente"
    }
  ];

  // Mock history data
  const appointmentHistory = [
    {
      id: 101,
      type: "Bronzeamento Spray",
      duration: "15 minutos",
      date: "15 Abril, 2025",
      time: "14:00",
      status: "Concluído"
    },
    {
      id: 102,
      type: "Bronzeamento em Cabine",
      duration: "20 minutos",
      date: "1 Março, 2025",
      time: "11:30",
      status: "Concluído"
    },
    {
      id: 103,
      type: "Bronzeamento Natural",
      duration: "25 minutos",
      date: "15 Fevereiro, 2025",
      time: "09:45",
      status: "Concluído"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-6 tracking-tight text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-bronze-600 to-bronze-800">
              {clientName ? `Olá, ${clientName}!` : "Meus Agendamentos"}
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 text-center max-w-2xl mx-auto">
            {clientName 
              ? "Agora você pode agendar seu bronzeamento!"
              : "Gerencie seus agendamentos de bronzeamento e mantenha-se sempre em dia com seus horários marcados."
            }
          </p>
          
          {location.state?.anamnesisCompleted && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-green-800 font-medium">
                ✅ Anamnese concluída com sucesso!
              </p>
            </div>
          )}
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
                <PreparationTips />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <UpcomingAppointmentsTab 
              appointments={upcomingAppointments}
              onSetActiveTab={setActiveTab}
            />
          </TabsContent>
          
          <TabsContent value="history">
            <AppointmentHistoryTab 
              appointments={appointmentHistory}
              onSetActiveTab={setActiveTab}
            />
          </TabsContent>
        </Tabs>

        <PostBronzeCare />
      </div>
    </div>
  );
};

export default Scheduling;
