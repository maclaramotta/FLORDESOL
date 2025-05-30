
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAnamnesisValidation } from "@/hooks/useAnamnesisValidation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles } from "lucide-react";

interface AnamnesisGuardProps {
  children: React.ReactNode;
}

const AnamnesisGuard: React.FC<AnamnesisGuardProps> = ({ children }) => {
  const location = useLocation();
  const mockClientId = "mock-client-123"; // In real app, this would come from authentication
  const { hasAnamnesis, isLoading } = useAnamnesisValidation(mockClientId);

  // Routes that don't require anamnesis
  const publicRoutes = ["/", "/login", "/register", "/features", "/bronze-simulator", "/privacy", "/terms", "/lgpd"];
  const isPublicRoute = publicRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith("/features/")
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Show loading state while checking anamnesis status
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bronze-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Verificando seu perfil...</p>
          </div>
        </div>
      </div>
    );
  }

  // If anamnesis is not completed and user is not on anamnesis page, redirect
  if (!hasAnamnesis && location.pathname !== "/anamnesis") {
    return <Navigate to="/anamnesis" replace />;
  }

  // If anamnesis is completed or user is on anamnesis page, allow access
  return <>{children}</>;
};

export default AnamnesisGuard;
