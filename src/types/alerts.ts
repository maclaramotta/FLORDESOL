
export enum AlertType {
  WHATSAPP = "WHATSAPP",
  EMAIL = "EMAIL",
  PUSH = "PUSH",
}

export enum AlertTiming {
  ONE_HOUR = "1_HOUR",
  TWENTY_FOUR_HOURS = "24_HOURS",
  THREE_HOURS = "3_HOURS",
  THIRTY_MINUTES = "30_MINUTES",
}

export type Alert = {
  id: string;
  appointmentId: string;
  clientId: string;
  type: AlertType;
  timing: AlertTiming;
  message: string;
  sent: boolean;
  scheduledFor: string;
  createdAt: string;
};

export type AlertTemplate = {
  id: string;
  name: string;
  type: AlertType;
  timing: AlertTiming;
  message: string;
  active: boolean;
};
