
export enum SkinType {
  TYPE_I = "TIPO I",
  TYPE_II = "TIPO II",
  TYPE_III = "TIPO III",
  TYPE_IV = "TIPO IV",
  TYPE_V = "TIPO V",
  TYPE_VI = "TIPO VI",
}

export enum BronzingMethod {
  NATURAL = "NATURAL",
  SPRAY = "SPRAY",
  BOOTH = "CABINE",
  CREAM = "CREME",
}

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthdate: string;
  profileImageUrl?: string;
  skinType?: SkinType;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type AnamnesisQuestion = {
  id: string;
  question: string;
  type: "boolean" | "text" | "select" | "multiselect";
  required: boolean;
  options?: string[];
  warningTrigger?: boolean | string[];
  warningMessage?: string;
};

export type AnamnesisResponse = {
  questionId: string;
  response: boolean | string | string[];
};

export type Anamnesis = {
  id: string;
  clientId: string;
  responses: AnamnesisResponse[];
  signatureUrl: string;
  createdAt: string;
  professionalNotes?: string;
  recommendations?: string;
  bronzingMethod?: BronzingMethod;
  exposureTime?: number;
  contraindications: string[];
};

export type Appointment = {
  id: string;
  clientId: string;
  date: string;
  status: "scheduled" | "confirmed" | "completed" | "canceled" | "no-show";
  bronzingMethod: BronzingMethod;
  duration: number;
  professionalId: string;
  notes?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  satisfactionRating?: number;
  createdAt: string;
  updatedAt: string;
};

export type Professional = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "professional";
  profileImageUrl?: string;
  specialties?: BronzingMethod[];
};

export type FeatureInfo = {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
};
