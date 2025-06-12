import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Clock, Bell, CalendarCheck, Calendar, MessageCircle, FileText, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import AppointmentScheduler from "@/components/appointments/AppointmentScheduler";

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

  const handleCancelAppointment = (id: number) => {
    toast.success(`Agendamento #${id} cancelado com sucesso`);
  };

  const handleReschedule = (id: number) => {
    setActiveTab("new");
    toast.info(`Vamos reagendar o horário #${id}`);
  };

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/5564996170209?text=Oi%2C+quero+tirar+uma+d%C3%BAvida+sobre+meu+bronze+🌞", "_blank");
  };

  const handleWhatsAppAppointment = (date: string, time: string) => {
    const message = `Olá!%20Sobre%20meu%20agendamento%20em%20${encodeURIComponent(date)}%20às%20${encodeURIComponent(time)}`;
    window.open(`https://wa.me/5564996170209?text=${message}`, "_blank");
  };

  const handleWhatsAppReschedule = (date: string, time: string) => {
    const message = `Gostaria%20de%20reagendar%20meu%20agendamento%20de%20${encodeURIComponent(date)}%20às%20${encodeURIComponent(time)}`;
    window.open(`https://wa.me/5564996170209?text=${message}`, "_blank");
  };

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
                
                <div className="mt-8 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">
                    ✨ Prepare-se para o Bronze
                  </h3>
                  
                  <div className="text-amber-900 space-y-4">
                    <p className="text-center text-lg font-medium text-amber-700 mb-6">
                      🌞 Dicas para um Bronzeado Perfeito
                    </p>
                    <p className="text-center text-sm text-amber-600 mb-6">
                      Antes do seu bronze, siga essas recomendações para garantir um resultado lindo, uniforme e seguro:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-white/50 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-800 mb-2">1️⃣ Esfolie sua pele</h4>
                        <p className="text-sm">Faça uma esfoliação suave 1 dia antes do bronze. Isso remove as células mortas e ajuda a deixar a pele mais uniforme.</p>
                      </div>
                      
                      <div className="bg-white/50 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-800 mb-2">2️⃣ Evite cremes e óleos</h4>
                        <p className="text-sm">No dia do bronze, <strong>não use hidratantes, perfumes ou óleos</strong> na pele. Isso pode atrapalhar o resultado final.</p>
                      </div>
                      
                      <div className="bg-white/50 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-800 mb-2">3️⃣ Use roupas leves</h4>
                        <p className="text-sm">Venha com roupas soltas, de preferência de tecido escuro, para não marcar o corpo depois do bronze.</p>
                      </div>
                      
                      <div className="bg-white/50 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-800 mb-2">4️⃣ Hidrate-se bem</h4>
                        <p className="text-sm">Beba bastante água antes e depois do procedimento para manter sua pele saudável e bonita!</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-amber-200">
                      <h4 className="font-semibold text-amber-800 mb-3 text-center">💬 Dúvidas?</h4>
                      <p className="text-sm text-amber-700 text-center mb-4">
                        Fale com a gente pelo WhatsApp clicando no botão abaixo:
                      </p>
                      
                      <div className="flex justify-center">
                        <Button 
                          onClick={handleWhatsAppContact}
                          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Falar com a equipe 💬
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <Card className="border shadow-md">
              <CardContent className="pt-6">
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <p className="text-yellow-800 text-sm">
                    <strong>⚠️ Você será lembrada 24h antes no WhatsApp para confirmar.</strong>
                  </p>
                </div>

                <h3 className="text-xl font-semibold mb-4">Seus Próximos Agendamentos</h3>
                
                <div className="space-y-4">
                  {upcomingAppointments.map(appointment => (
                    <div key={appointment.id} className="p-6 border rounded-lg bg-white shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-bronze-100 flex items-center justify-center">
                            <Bell className="h-6 w-6 text-bronze-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-lg">{appointment.type}</h4>
                            <p className="text-gray-500">Sessão: {appointment.duration}</p>
                            <p className="text-sm font-medium text-bronze-600">Status: {appointment.status}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-lg">{appointment.date}</div>
                          <div className="text-sm text-gray-500">{appointment.time}</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-4">
                        <Button 
                          asChild
                          variant="outline" 
                          className="flex items-center gap-2"
                        >
                          <Link to="/anamnesis">
                            <FileText className="h-4 w-4" />
                            📋 Preencher Ficha (opcional)
                          </Link>
                        </Button>

                        <Button 
                          variant="outline"
                          className="flex items-center gap-2 text-green-600 border-green-300 hover:bg-green-50"
                          onClick={() => handleWhatsAppAppointment(appointment.date, appointment.time)}
                        >
                          <MessageCircle className="h-4 w-4" />
                          Falar com a gente 💬
                        </Button>

                        <Button 
                          variant="outline"
                          className="flex items-center gap-2 text-orange-600 border-orange-300 hover:bg-orange-50"
                          onClick={() => handleWhatsAppReschedule(appointment.date, appointment.time)}
                        >
                          <Calendar className="h-4 w-4" />
                          Cancelar/Reagendar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
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
                          <p className="text-sm text-green-600">Status: {appointment.status}</p>
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
