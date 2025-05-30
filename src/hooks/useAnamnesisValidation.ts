
import { useState, useEffect } from "react";

interface AnamnesisStatus {
  hasAnamnesis: boolean;
  isLoading: boolean;
  clientId?: string;
}

export const useAnamnesisValidation = (clientId?: string) => {
  const [anamnesisStatus, setAnamnesisStatus] = useState<AnamnesisStatus>({
    hasAnamnesis: false,
    isLoading: true,
    clientId
  });

  useEffect(() => {
    const checkAnamnesisStatus = async () => {
      setAnamnesisStatus(prev => ({ ...prev, isLoading: true }));
      
      try {
        // Mock API call - replace with real API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock logic: check if client has anamnesis
        // In real app, this would check the database
        const hasAnamnesis = localStorage.getItem(`anamnesis_${clientId}`) !== null;
        
        setAnamnesisStatus({
          hasAnamnesis,
          isLoading: false,
          clientId
        });
      } catch (error) {
        console.error("Error checking anamnesis status:", error);
        setAnamnesisStatus(prev => ({ ...prev, isLoading: false }));
      }
    };

    if (clientId) {
      checkAnamnesisStatus();
    } else {
      setAnamnesisStatus({ hasAnamnesis: false, isLoading: false });
    }
  }, [clientId]);

  const markAnamnesisCompleted = (clientId: string) => {
    localStorage.setItem(`anamnesis_${clientId}`, "completed");
    setAnamnesisStatus(prev => ({ ...prev, hasAnamnesis: true }));
  };

  return {
    ...anamnesisStatus,
    markAnamnesisCompleted
  };
};
