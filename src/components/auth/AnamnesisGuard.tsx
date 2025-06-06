
import React from "react";
import { useLocation } from "react-router-dom";

interface AnamnesisGuardProps {
  children: React.ReactNode;
}

const AnamnesisGuard: React.FC<AnamnesisGuardProps> = ({ children }) => {
  const location = useLocation();

  // Routes that don't require any authentication or checks
  const publicRoutes = ["/", "/login", "/register", "/features", "/bronze-simulator", "/privacy", "/terms", "/lgpd"];
  const isPublicRoute = publicRoutes.some(route => 
    location.pathname === route || location.pathname.startsWith("/features/")
  );

  // If it's a public route, allow access
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // For all other routes, just allow access since anamnesis is now optional
  return <>{children}</>;
};

export default AnamnesisGuard;
