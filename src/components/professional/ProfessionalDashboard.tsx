
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BronzingMethod, Client, Appointment } from "@/types";

const ProfessionalDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [satisfactionRating, setSatisfactionRating] = useState<number | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  // Mock data
  const todaysAppointments: (Appointment & { client: Client })[] = [
    {
      id: "apt1",
      clientId: "c1",
      client: {
        id: "c1",
        name: "Maria Silva",
        email: "maria@example.com",
        phone: "(11) 98765-4321",
        birthdate: "1990-05-15",
        skinType: "TIPO III" as any,
        createdAt: "2023-01-10T00:00:00.000Z",
        updatedAt: "2023-01-10T00:00:00.000Z",
      },
      date: new Date().toISOString(),
      status: "scheduled",
      bronzingMethod: BronzingMethod.SPRAY,
      duration: 30,
      professionalId: "p1",
      createdAt: "2023-05-10T00:00:00.000Z",
      updatedAt: "2023-05-10T00:00:00.000Z",
    },
    {
      id: "apt2",
      clientId: "c2",
      client: {
        id: "c2",
        name: "João Santos",
        email: "joao@example.com",
        phone: "(11) 91234-5678",
        birthdate: "1985-08-22",
        skinType: "TIPO II" as any,
        createdAt: "2023-02-15T00:00:00.000Z",
        updatedAt: "2023-02-15T00:00:00.000Z",
      },
      date: new Date().toISOString(),
      status: "scheduled",
      bronzingMethod: BronzingMethod.BOOTH,
      duration: 45,
      professionalId: "p1",
      createdAt: "2023-05-12T00:00:00.000Z",
      updatedAt: "2023-05-12T00:00:00.000Z",
    },
    {
      id: "apt3",
      clientId: "c3",
      client: {
        id: "c3",
        name: "Ana Oliveira",
        email: "ana@example.com",
        phone: "(11) 99876-5432",
        birthdate: "1992-11-30",
        skinType: "TIPO IV" as any,
        createdAt: "2023-03-05T00:00:00.000Z",
        updatedAt: "2023-03-05T00:00:00.000Z",
      },
      date: new Date().toISOString(),
      status: "scheduled",
      bronzingMethod: BronzingMethod.NATURAL,
      duration: 60,
      professionalId: "p1",
      createdAt: "2023-05-15T00:00:00.000Z",
      updatedAt: "2023-05-15T00:00:00.000Z",
    },
  ];

  const recentClients: Client[] = [
    {
      id: "c1",
      name: "Maria Silva",
      email: "maria@example.com",
      phone: "(11) 98765-4321",
      birthdate: "1990-05-15",
      skinType: "TIPO III" as any,
      notes: "Cliente prefere bronzeamento mais suave",
      createdAt: "2023-01-10T00:00:00.000Z",
      updatedAt: "2023-01-10T00:00:00.000Z",
    },
    {
      id: "c2",
      name: "João Santos",
      email: "joao@example.com",
      phone: "(11) 91234-5678",
      birthdate: "1985-08-22",
      skinType: "TIPO II" as any,
      notes: "Pele sensível, evitar exposição prolongada",
      createdAt: "2023-02-15T00:00:00.000Z",
      updatedAt: "2023-02-15T00:00:00.000Z",
    },
    {
      id: "c3",
      name: "Ana Oliveira",
      email: "ana@example.com",
      phone: "(11) 99876-5432",
      birthdate: "1992-11-30",
      skinType: "TIPO IV" as any,
      createdAt: "2023-03-05T00:00:00.000Z",
      updatedAt: "2023-03-05T00:00:00.000Z",
    },
    {
      id: "c4",
      name: "Carlos Pereira",
      email: "carlos@example.com",
      phone: "(11) 97654-3210",
      birthdate: "1988-12-10",
      skinType: "TIPO III" as any,
      notes: "Primeira vez fazendo bronzeamento",
      createdAt: "2023-04-20T00:00:00.000Z",
      updatedAt: "2023-04-20T00:00:00.000Z",
    },
  ];

  const getBronzingMethodLabel = (method: BronzingMethod) => {
    switch (method) {
      case BronzingMethod.NATURAL: return "Natural";
      case BronzingMethod.SPRAY: return "Spray";
      case BronzingMethod.BOOTH: return "Cabine";
      case BronzingMethod.CREAM: return "Creme";
      default: return method;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "canceled": return "bg-red-100 text-red-800";
      case "no-show": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatAppointmentTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeUntilNextSession = (skinType: string) => {
    // Minimum time recommendations based on skin type
    switch (skinType) {
      case "TIPO I": return "48 horas";
      case "TIPO II": return "36 horas";
      case "TIPO III": return "24 horas";
      case "TIPO IV": return "24 horas";
      case "TIPO V": return "24 horas";
      case "TIPO VI": return "24 horas";
      default: return "24 horas";
    }
  };

  const handleCompleteAppointment = (appointmentId: string, clientId: string) => {
    setSelectedClientId(clientId);
  };

  const handleSubmitSatisfaction = () => {
    if (satisfactionRating === null) {
      toast.error("Por favor, selecione uma avaliação");
      return;
    }

    // Here you would save the satisfaction rating and notes
    toast.success("Sessão finalizada com sucesso");
    setSatisfactionRating(null);
    setNotes("");
    setSelectedClientId(null);
  };

  const filteredClients = recentClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Agendamentos de Hoje</CardTitle>
            <CardDescription>
              Gerencie os agendamentos do dia
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Horário</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todaysAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {appointment.client.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{appointment.client.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatAppointmentTime(appointment.date)}</TableCell>
                      <TableCell>{getBronzingMethodLabel(appointment.bronzingMethod)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status === "scheduled" ? "Agendado" : 
                           appointment.status === "completed" ? "Concluído" : 
                           appointment.status === "canceled" ? "Cancelado" : "Não compareceu"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleCompleteAppointment(appointment.id, appointment.clientId)}
                              >
                                Finalizar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Finalizar Sessão</DialogTitle>
                                <DialogDescription>
                                  Registre a satisfação do cliente e observações da sessão
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Avaliação do Cliente</Label>
                                  <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                      <Button
                                        key={rating}
                                        type="button"
                                        variant={satisfactionRating === rating ? "default" : "outline"}
                                        className={satisfactionRating === rating ? "bg-bronze-500 hover:bg-bronze-600" : ""}
                                        onClick={() => setSatisfactionRating(rating)}
                                      >
                                        {rating}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Observações</Label>
                                  <textarea
                                    className="w-full min-h-[100px] p-2 border rounded-md"
                                    placeholder="Adicione observações sobre a sessão..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  onClick={() => {
                                    setSatisfactionRating(null);
                                    setNotes("");
                                  }}
                                >
                                  Cancelar
                                </Button>
                                <Button 
                                  type="button" 
                                  className="bg-bronze-500 hover:bg-bronze-600" 
                                  onClick={handleSubmitSatisfaction}
                                >
                                  Salvar e Finalizar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button size="sm" variant="outline">Ver Anamnese</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Próximas Sessões</CardTitle>
            <CardDescription>
              Informações para as próximas sessões
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="time">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="time">Tempo Mínimo</TabsTrigger>
                <TabsTrigger value="stats">Estatísticas</TabsTrigger>
              </TabsList>
              <TabsContent value="time" className="pt-4 space-y-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Tempo mínimo até próxima sessão por tipo de pele:
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Tipo I</span>
                      <span className="font-medium">48 horas</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Tipo II</span>
                      <span className="font-medium">36 horas</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Tipo III</span>
                      <span className="font-medium">24 horas</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Tipo IV</span>
                      <span className="font-medium">24 horas</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span>Tipo V</span>
                      <span className="font-medium">24 horas</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span>Tipo VI</span>
                      <span className="font-medium">24 horas</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="stats" className="pt-4">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-2xl font-bold">94%</div>
                    <div className="text-sm text-gray-500">Taxa de satisfação</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm text-gray-500">Sessões hoje</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="text-2xl font-bold">7</div>
                    <div className="text-sm text-gray-500">Novos clientes esta semana</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clientes Recentes</CardTitle>
          <CardDescription>
            Histórico e informações dos clientes
          </CardDescription>
          <div className="pt-2">
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Tipo de Pele</TableHead>
                  <TableHead>Próxima Sessão</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          {client.profileImageUrl ? (
                            <AvatarImage src={client.profileImageUrl} alt={client.name} />
                          ) : (
                            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                          )}
                        </Avatar>
                        <span>{client.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{client.email}</div>
                        <div className="text-gray-500">{client.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{client.skinType}</TableCell>
                    <TableCell>Mínimo: {getTimeUntilNextSession(client.skinType || "")}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          Ver Histórico
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          Nova Anamnese
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfessionalDashboard;
