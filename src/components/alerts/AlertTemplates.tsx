
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { AlertType, AlertTiming, AlertTemplate } from "@/types/alerts";

const AlertTemplates = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<AlertTemplate | null>(null);

  // Mock templates
  const [templates, setTemplates] = useState<AlertTemplate[]>([
    {
      id: "1",
      name: "Confirmação 24h antes",
      type: AlertType.WHATSAPP,
      timing: AlertTiming.TWENTY_FOUR_HOURS,
      message: "Olá {nome}! Lembramos que seu bronzeamento está marcado para amanhã, {data} às {hora}. Confirme sua presença respondendo ✅",
      active: true,
    },
    {
      id: "2",
      name: "Lembrete 1h antes",
      type: AlertType.WHATSAPP,
      timing: AlertTiming.ONE_HOUR,
      message: "Oi {nome}! Seu bronzeamento é em 1 hora ({hora}). Chegue 15 minutos antes. Nos vemos em breve! 🌞",
      active: true,
    },
  ]);

  const [newTemplate, setNewTemplate] = useState<Partial<AlertTemplate>>({
    name: "",
    type: AlertType.WHATSAPP,
    timing: AlertTiming.TWENTY_FOUR_HOURS,
    message: "",
    active: true,
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.message) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    const template: AlertTemplate = {
      id: Date.now().toString(),
      name: newTemplate.name!,
      type: newTemplate.type!,
      timing: newTemplate.timing!,
      message: newTemplate.message!,
      active: newTemplate.active!,
    };

    setTemplates([...templates, template]);
    setNewTemplate({
      name: "",
      type: AlertType.WHATSAPP,
      timing: AlertTiming.TWENTY_FOUR_HOURS,
      message: "",
      active: true,
    });
    setIsCreating(false);
    toast.success("Modelo criado com sucesso!");
  };

  const handleToggleActive = (id: string) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, active: !t.active } : t
    ));
    toast.success("Status do modelo atualizado");
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success("Modelo excluído");
  };

  const getTimingLabel = (timing: AlertTiming) => {
    switch (timing) {
      case AlertTiming.THIRTY_MINUTES:
        return "30 minutos antes";
      case AlertTiming.ONE_HOUR:
        return "1 hora antes";
      case AlertTiming.THREE_HOURS:
        return "3 horas antes";
      case AlertTiming.TWENTY_FOUR_HOURS:
        return "24 horas antes";
      default:
        return timing;
    }
  };

  const getTypeLabel = (type: AlertType) => {
    switch (type) {
      case AlertType.WHATSAPP:
        return "WhatsApp";
      case AlertType.EMAIL:
        return "E-mail";
      case AlertType.PUSH:
        return "Push";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Modelos de Alerta</CardTitle>
              <CardDescription>
                Configure mensagens automáticas para seus agendamentos
              </CardDescription>
            </div>
            <Button onClick={() => setIsCreating(true)} className="bg-bronze-500 hover:bg-bronze-600">
              <Plus className="h-4 w-4 mr-2" />
              Novo Modelo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isCreating && (
            <Card className="mb-6 border-bronze-200">
              <CardHeader>
                <CardTitle className="text-lg">Criar Novo Modelo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome do Modelo</Label>
                    <Input
                      id="name"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      placeholder="Ex: Confirmação 24h"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Tipo de Alerta</Label>
                    <Select 
                      value={newTemplate.type} 
                      onValueChange={(value) => setNewTemplate({...newTemplate, type: value as AlertType})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={AlertType.WHATSAPP}>WhatsApp</SelectItem>
                        <SelectItem value={AlertType.EMAIL}>E-mail</SelectItem>
                        <SelectItem value={AlertType.PUSH}>Notificação Push</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="timing">Quando Enviar</Label>
                  <Select 
                    value={newTemplate.timing} 
                    onValueChange={(value) => setNewTemplate({...newTemplate, timing: value as AlertTiming})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={AlertTiming.THIRTY_MINUTES}>30 minutos antes</SelectItem>
                      <SelectItem value={AlertTiming.ONE_HOUR}>1 hora antes</SelectItem>
                      <SelectItem value={AlertTiming.THREE_HOURS}>3 horas antes</SelectItem>
                      <SelectItem value={AlertTiming.TWENTY_FOUR_HOURS}>24 horas antes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    value={newTemplate.message}
                    onChange={(e) => setNewTemplate({...newTemplate, message: e.target.value})}
                    placeholder="Use {nome}, {data}, {hora} para personalizar a mensagem"
                    className="min-h-[100px]"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Variáveis disponíveis: {"{nome}"}, {"{data}"}, {"{hora}"}, {"{tipo}"}
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateTemplate} className="bg-bronze-500 hover:bg-bronze-600">
                    Criar Modelo
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {templates.map((template) => (
              <Card key={template.id} className={`${template.active ? 'border-green-200' : 'border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{template.name}</h3>
                        <span className="text-sm bg-bronze-100 text-bronze-800 px-2 py-1 rounded">
                          {getTypeLabel(template.type)}
                        </span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {getTimingLabel(template.timing)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{template.message}</p>
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={template.active}
                          onCheckedChange={() => handleToggleActive(template.id)}
                        />
                        <span className="text-sm text-gray-500">
                          {template.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertTemplates;
