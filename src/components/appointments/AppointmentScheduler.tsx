import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Appointment, BronzingMethod, Client } from "@/types";
import { useNavigate } from "react-router-dom";
import { MessageCircle, User, Phone, Mail } from "lucide-react";
import WeatherForecast from "@/components/weather/WeatherForecast";
import { useWeatherForecast } from "@/hooks/useWeatherForecast";
interface AppointmentSchedulerProps {
  client?: Client;
  onSchedule?: (appointment: Appointment) => void;
}
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}
const AppointmentScheduler: React.FC<AppointmentSchedulerProps> = ({
  client,
  onSchedule
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined);
  const [selectedMethod, setSelectedMethod] = useState<BronzingMethod | undefined>(undefined);
  const [clientName, setClientName] = useState(client?.name || "");
  const [clientPhone, setClientPhone] = useState(client?.phone || "");
  const [clientEmail, setClientEmail] = useState(client?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();
  const {
    weatherData
  } = useWeatherForecast();

  // Mock time slots
  const timeSlots: TimeSlot[] = [{
    id: "t1",
    time: "09:00",
    available: true
  }, {
    id: "t2",
    time: "09:30",
    available: true
  }, {
    id: "t3",
    time: "10:00",
    available: false
  }, {
    id: "t4",
    time: "10:30",
    available: true
  }, {
    id: "t5",
    time: "11:00",
    available: true
  }, {
    id: "t6",
    time: "11:30",
    available: true
  }, {
    id: "t7",
    time: "12:00",
    available: false
  }, {
    id: "t8",
    time: "14:00",
    available: true
  }, {
    id: "t9",
    time: "14:30",
    available: true
  }, {
    id: "t10",
    time: "15:00",
    available: true
  }, {
    id: "t11",
    time: "15:30",
    available: false
  }, {
    id: "t12",
    time: "16:00",
    available: true
  }, {
    id: "t13",
    time: "16:30",
    available: true
  }, {
    id: "t14",
    time: "17:00",
    available: true
  }, {
    id: "t15",
    time: "17:30",
    available: true
  }];
  const bronzingMethods = [{
    id: BronzingMethod.NATURAL,
    label: "Bronzeamento Natural"
  }, {
    id: BronzingMethod.SPRAY,
    label: "Bronzeamento a Spray"
  }, {
    id: BronzingMethod.BOOTH,
    label: "Cabine de Bronzeamento"
  }, {
    id: BronzingMethod.CREAM,
    label: "Creme Bronzeador"
  }];
  const formatDateForWhatsApp = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };
  const generateWhatsAppLink = () => {
    if (!selectedDate || !selectedTimeSlot || !clientName) return "";
    const phone = "5564996170209";
    const formattedDate = formatDateForWhatsApp(selectedDate);
    const message = `Olá! Gostaria de completar minha ficha de anamnese para o bronze no dia ${formattedDate} às ${selectedTimeSlot}. Meu nome é ${clientName}.`;
    return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  };

  // Function to check if a date is a sunny day
  const isSunnyDay = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return weatherData.some(day => day.date === dateString && day.isSunny);
  };
  const handleScheduleAppointment = async () => {
    if (!selectedDate || !selectedTimeSlot || !selectedMethod || !clientName || !clientPhone) {
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
        date: new Date(selectedDate.setHours(parseInt(selectedTimeSlot.split(':')[0]), parseInt(selectedTimeSlot.split(':')[1]))).toISOString(),
        status: "scheduled",
        bronzingMethod: selectedMethod,
        duration: 30,
        professionalId: "mock-professional",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      if (onSchedule) {
        onSchedule(mockAppointment);
      }

      // Reset form
      setSelectedDate(undefined);
      setSelectedTimeSlot(undefined);
      setSelectedMethod(undefined);
      setClientName("");
      setClientPhone("");
      setClientEmail("");

      // Show success dialog
      setShowSuccessDialog(true);
    } catch (error) {
      toast.error("Erro ao agendar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleFillAnamnesisNow = () => {
    setShowSuccessDialog(false);
    navigate("/anamnesis");
  };
  const handleFillAnamnesisLater = () => {
    setShowSuccessDialog(false);
    toast.success("Pronto! ✨ Se quiser, complete depois ou envie por WhatsApp.");
  };
  const isScheduleDisabled = !selectedDate || !selectedTimeSlot || !selectedMethod || !clientName || !clientPhone || isSubmitting;
  return <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Agendar Sessão</CardTitle>
          <CardDescription>
            Preencha seus dados e selecione data, horário e método de bronzeamento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Client Information Section */}
          <div className="space-y-4 p-4 bg-bronze-50 rounded-lg">
            <h3 className="font-semibold text-bronze-800 flex items-center gap-2">
              <User className="h-4 w-4" />
              Seus Dados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input id="name" type="text" placeholder="Seu nome completo" value={clientName} onChange={e => setClientName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                <Input id="phone" type="tel" placeholder="(64) 99999-9999" value={clientPhone} onChange={e => setClientPhone(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail (opcional)</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Selecione uma data</Label>
              <div className="rounded-md border">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={date => {
                // Disable past dates and Sundays
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today || date.getDay() === 0;
              }} className="rounded-md border p-3" modifiers={{
                sunny: date => isSunnyDay(date)
              }} modifiersStyles={{
                sunny: {
                  backgroundColor: '#fef3c7',
                  color: '#d97706',
                  fontWeight: 'bold'
                }
              }} />
              </div>
              {selectedDate && isSunnyDay(selectedDate) && <div className="text-center text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                  ☀️ Dia perfeito para bronzeamento!
                </div>}
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Método de Bronzeamento</Label>
                <Select onValueChange={value => setSelectedMethod(value as BronzingMethod)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    {bronzingMethods.map(method => <SelectItem key={method.id} value={method.id}>
                        {method.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label>Horários disponíveis</Label>
                {selectedDate ? <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(slot => <Button key={slot.id} variant={selectedTimeSlot === slot.time ? "default" : "outline"} className={`
                          ${selectedTimeSlot === slot.time ? "bg-bronze-500 hover:bg-bronze-600" : ""} 
                          ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}
                        `} onClick={() => slot.available && setSelectedTimeSlot(slot.time)} disabled={!slot.available}>
                        {slot.time}
                      </Button>)}
                  </div> : <div className="text-center p-4 border rounded-md bg-gray-50 text-gray-500">
                    Selecione uma data para ver os horários disponíveis
                  </div>}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleScheduleAppointment} disabled={isScheduleDisabled} className="ml-auto bg-bronze-500 hover:bg-bronze-600">
            {isSubmitting ? "Agendando..." : "Agendar Agora ☀️"}
          </Button>
        </CardFooter>
      </Card>

      {/* Weather Forecast Component */}
      <WeatherForecast />

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">🎉 Agendamento confirmado!</DialogTitle>
            <DialogDescription className="text-center">
              Seu bronze foi agendado com sucesso! Deseja preencher sua ficha de anamnese agora?
            </DialogDescription>
          </DialogHeader>
          <div className="text-center text-sm text-gray-600 py-4">
        </div>
          <DialogFooter className="flex-col gap-2">
            <Button onClick={handleFillAnamnesisNow} className="w-full bg-bronze-500 hover:bg-bronze-600">
              📋 Sim, preencher agora
            </Button>
            
            {selectedDate && selectedTimeSlot && clientName && <Button variant="outline" onClick={() => window.open(generateWhatsAppLink(), '_blank')} className="w-full text-green-600 border-green-300 hover:bg-green-50 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                💬 Completar pelo WhatsApp
              </Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>;
};
export default AppointmentScheduler;