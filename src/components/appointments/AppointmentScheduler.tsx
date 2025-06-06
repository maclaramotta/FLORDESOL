
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Appointment, BronzingMethod, Client } from "@/types";
import { useNavigate } from "react-router-dom";

interface AppointmentSchedulerProps {
  client?: Client;
  onSchedule?: (appointment: Appointment) => void;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({ client, onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined);
  const [selectedMethod, setSelectedMethod] = useState<BronzingMethod | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnamnesisDialog, setShowAnamnesisDialog] = useState(false);
  const navigate = useNavigate();

  // Mock time slots
  const timeSlots: TimeSlot[] = [
    { id: "t1", time: "09:00", available: true },
    { id: "t2", time: "09:30", available: true },
    { id: "t3", time: "10:00", available: false },
    { id: "t4", time: "10:30", available: true },
    { id: "t5", time: "11:00", available: true },
    { id: "t6", time: "11:30", available: true },
    { id: "t7", time: "12:00", available: false },
    { id: "t8", time: "14:00", available: true },
    { id: "t9", time: "14:30", available: true },
    { id: "t10", time: "15:00", available: true },
    { id: "t11", time: "15:30", available: false },
    { id: "t12", time: "16:00", available: true },
    { id: "t13", time: "16:30", available: true },
    { id: "t14", time: "17:00", available: true },
    { id: "t15", time: "17:30", available: true },
  ];

  const bronzingMethods = [
    { id: BronzingMethod.NATURAL, label: "Bronzeamento Natural" },
    { id: BronzingMethod.SPRAY, label: "Bronzeamento a Spray" },
    { id: BronzingMethod.BOOTH, label: "Cabine de Bronzeamento" },
    { id: BronzingMethod.CREAM, label: "Creme Bronzeador" },
  ];

  const handleScheduleAppointment = async () => {
    if (!selectedDate || !selectedTimeSlot || !selectedMethod) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    setIsSubmitting(true);

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockAppointment: Appointment = {
        id: `mock-${Date.now()}`,
        clientId: client?.id || "guest",
        date: new Date(selectedDate.setHours(
          parseInt(selectedTimeSlot.split(':')[0]),
          parseInt(selectedTimeSlot.split(':')[1])
        )).toISOString(),
        status: "scheduled",
        bronzingMethod: selectedMethod,
        duration: 30,
        professionalId: "mock-professional",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      toast.success("Agendamento realizado com sucesso!");
      
      if (onSchedule) {
        onSchedule(mockAppointment);
      }
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTimeSlot(undefined);
      setSelectedMethod(undefined);
      
      // Show anamnesis dialog
      setShowAnamnesisDialog(true);
    } catch (error) {
      toast.error("Erro ao agendar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillAnamnesisNow = () => {
    setShowAnamnesisDialog(false);
    navigate("/anamnesis");
  };

  const handleFillAnamnesisLater = () => {
    setShowAnamnesisDialog(false);
    toast.success("✨ Obrigada por agendar com a gente! Você pode preencher sua ficha mais tarde se quiser.");
  };

  const isScheduleDisabled = !selectedDate || !selectedTimeSlot || !selectedMethod || isSubmitting;

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agendar Sessão</CardTitle>
          <CardDescription>
            Selecione a data, horário e método de bronzeamento para agendar sua sessão
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Selecione uma data</Label>
              <div className="rounded-md border">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    // Disable past dates and Sundays
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today || date.getDay() === 0;
                  }}
                  className="rounded-md border p-3"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Método de Bronzeamento</Label>
                <Select onValueChange={(value) => setSelectedMethod(value as BronzingMethod)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    {bronzingMethods.map((method) => (
                      <SelectItem key={method.id} value={method.id}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label>Horários disponíveis</Label>
                {selectedDate ? (
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                        className={`
                          ${selectedTimeSlot === slot.time ? "bg-bronze-500 hover:bg-bronze-600" : ""} 
                          ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                        onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                        disabled={!slot.available}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border rounded-md bg-gray-50 text-gray-500">
                    Selecione uma data para ver os horários disponíveis
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleScheduleAppointment}
            disabled={isScheduleDisabled}
            className="ml-auto bg-bronze-500 hover:bg-bronze-600"
          >
            {isSubmitting ? "Agendando..." : "Agendar Agora"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showAnamnesisDialog} onOpenChange={setShowAnamnesisDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">✨ Seu agendamento foi realizado com sucesso!</DialogTitle>
            <DialogDescription className="text-center">
              Deseja preencher sua ficha de anamnese agora?
            </DialogDescription>
          </DialogHeader>
          <div className="text-center text-sm text-gray-600 py-4">
            Preencher a ficha de anamnese é opcional, mas ajuda a gente a te atender melhor.
            Se quiser, você pode fazer isso agora ou mais tarde pelo WhatsApp 💬
          </div>
          <DialogFooter className="flex-col gap-2">
            <Button 
              onClick={handleFillAnamnesisNow}
              className="w-full bg-bronze-500 hover:bg-bronze-600"
            >
              Sim, preencher agora
            </Button>
            <Button 
              variant="outline" 
              onClick={handleFillAnamnesisLater}
              className="w-full"
            >
              Depois
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentScheduler;
