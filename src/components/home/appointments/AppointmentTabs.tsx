
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarPlus, Clock, List } from "lucide-react";
import NewAppointmentTab from "./NewAppointmentTab";
import UpcomingAppointmentsTab from "./UpcomingAppointmentsTab";
import HistoryAppointmentsTab from "./HistoryAppointmentsTab";

const AppointmentTabs = () => {
  const [appointmentTab, setAppointmentTab] = useState("novo");

  return (
    <Tabs value={appointmentTab} onValueChange={setAppointmentTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="novo" className="flex items-center gap-2">
          <CalendarPlus size={18} />
          Novo Agendamento
        </TabsTrigger>
        <TabsTrigger value="proximos" className="flex items-center gap-2">
          <Clock size={18} />
          Próximos Horários
        </TabsTrigger>
        <TabsTrigger value="historico" className="flex items-center gap-2">
          <List size={18} />
          Histórico
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="novo">
        <NewAppointmentTab />
      </TabsContent>
      
      <TabsContent value="proximos">
        <UpcomingAppointmentsTab />
      </TabsContent>
      
      <TabsContent value="historico">
        <HistoryAppointmentsTab />
      </TabsContent>
    </Tabs>
  );
};

export default AppointmentTabs;
