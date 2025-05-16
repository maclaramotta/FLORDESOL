
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentScheduler from "@/components/appointments/AppointmentScheduler";

const NewAppointmentTab = () => {
  return (
    <Card className="border shadow-md">
      <CardContent className="pt-6">
        <AppointmentScheduler />
      </CardContent>
    </Card>
  );
};

export default NewAppointmentTab;
