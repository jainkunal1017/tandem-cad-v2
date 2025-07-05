
import { useState, useEffect } from 'react';

interface UserData {
  full_name?: string;
  email?: string;
  job_title?: string;
  company?: string;
}

declare global {
  interface Window {
    Calendly: any;
  }
}

export const useCalendly = () => {
  const [calendlyLoaded, setCalendlyLoaded] = useState(false);
  
  useEffect(() => {
    // Check if Calendly is already loaded
    if (window.Calendly) {
      setCalendlyLoaded(true);
      return;
    }

    // Set up an interval to check for Calendly
    const checkInterval = setInterval(() => {
      if (window.Calendly) {
        setCalendlyLoaded(true);
        clearInterval(checkInterval);
      }
    }, 100); // Check every 100ms

    // Clear interval on unmount
    return () => clearInterval(checkInterval);
  }, []);

  const openCalendly = (userData?: UserData) => {
    if (window.Calendly) {
      const prefill = userData ? {
        name: userData.full_name,
        email: userData.email,
        customAnswers: {
          a1: userData.job_title || '',
          a2: userData.company || ''
        }
      } : {};

      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/d/cnc9-tx5-dhr/tandem-meeting',
        prefill
      });
    } else {
      // Fallback - open in new tab if Calendly isn't loaded
      window.open('https://calendly.com/d/cnc9-tx5-dhr/tandem-meeting', '_blank');
    }
  };

  return { calendlyLoaded, openCalendly };
};

export default useCalendly;
