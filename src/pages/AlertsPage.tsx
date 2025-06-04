
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Calendar, MessageCircle } from "lucide-react";
import TodayAppointments from "@/components/alerts/TodayAppointments";
import AlertTemplates from "@/components/alerts/AlertTemplates";
import AlertHistory from "@/components/alerts/AlertHistory";

const AlertsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Bell className="h-8 w-8 text-bronze-500" />
          Sistema de Alertas de Agendamento
        </h1>
        <p className="text-gray-600">
          Gerencie notificações e confirmações de agendamentos
        </p>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Hoje
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Modelos
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Histórico
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <TodayAppointments />
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <AlertTemplates />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <AlertHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsPage;
