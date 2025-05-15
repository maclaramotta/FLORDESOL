
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { SkinType, Client } from "@/types";
import SkinTypeTest from "./SkinTypeTest";
import { format } from "date-fns";

interface ClientProfileProps {
  client?: Client;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ client }) => {
  const [name, setName] = useState(client?.name || "");
  const [email, setEmail] = useState(client?.email || "");
  const [phone, setPhone] = useState(client?.phone || "");
  const [birthdate, setBirthdate] = useState(client?.birthdate || "");
  const [skinType, setSkinType] = useState<SkinType | undefined>(client?.skinType);
  const [notes, setNotes] = useState(client?.notes || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(client ? "Perfil atualizado com sucesso!" : "Cliente cadastrado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar os dados.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkinTypeChange = (type: SkinType) => {
    setSkinType(type);
    toast.info(`Tipo de pele definido como ${type}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="skin-test">Teste de Tipo de Pele</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Perfil do Cliente</CardTitle>
              <CardDescription>
                Preencha os dados pessoais do cliente para criar ou atualizar o perfil.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-bronze-200">
                      {profileImage ? (
                        <img 
                          src={URL.createObjectURL(profileImage)} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                        />
                      ) : client?.profileImageUrl ? (
                        <img 
                          src={client.profileImageUrl} 
                          alt={client.name} 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-bronze-100 flex items-center justify-center text-bronze-500">
                          <span className="text-4xl">👤</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="profile-image" className="cursor-pointer text-sm text-bronze-500 hover:text-bronze-600">
                        Alterar foto
                      </Label>
                      <Input
                        id="profile-image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfileImageChange}
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <Label htmlFor="name">Nome completo</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome completo"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@exemplo.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(00) 00000-0000"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="birthdate">Data de nascimento</Label>
                        <Input
                          id="birthdate"
                          type="date"
                          value={birthdate}
                          onChange={(e) => setBirthdate(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="skin-type">Tipo de pele</Label>
                        <div className="flex items-center h-10 mt-1">
                          {skinType ? (
                            <div className="flex items-center">
                              <span className="text-sm font-medium">{skinType}</span>
                              <Button 
                                variant="link" 
                                onClick={() => setSkinType(undefined)} 
                                className="text-bronze-500 p-0 h-auto ml-2"
                              >
                                Alterar
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">
                              Realize o teste de tipo de pele
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label htmlFor="notes">Observações</Label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Observações importantes sobre o cliente..."
                    className="w-full min-h-[100px] p-2 border rounded-md"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="bg-bronze-500 hover:bg-bronze-600 ml-auto"
                  disabled={isLoading}
                >
                  {isLoading ? "Salvando..." : "Salvar perfil"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="skin-test" className="mt-6">
          <SkinTypeTest 
            currentSkinType={skinType} 
            onComplete={handleSkinTypeChange} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientProfile;
