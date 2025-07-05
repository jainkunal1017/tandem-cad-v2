
import { useState, useEffect } from 'react';

interface UserData {
  full_name?: string;
  email?: string;
  job_title?: string;
  company?: string;
}

declare global {
  interface Window {
    Cal?: any;
  }
}

export const useCalCom = () => {
  const [calComLoaded, setCalComLoaded] = useState(false);
  
  useEffect(() => {
    // Check if Cal.com is already loaded and initialized
    if (window.Cal && typeof window.Cal === 'function') {
      setCalComLoaded(true);
      return;
    }
    
    // Check for initialization in case the script was loaded in index.html
    const checkInterval = setInterval(() => {
      if (window.Cal && typeof window.Cal === 'function') {
        console.log("Cal.com detected");
        clearInterval(checkInterval);
        setCalComLoaded(true);
      }
    }, 100);
    
    // Clean up interval on unmount
    return () => clearInterval(checkInterval);
  }, []);

  const openCalCom = (userData?: UserData) => {
    console.log("Opening Cal.com with user data:", userData);
    
    if (!window.Cal) {
      console.error("Cal.com is not loaded");
      window.open('https://cal.com/kunaljain1017/30min', '_blank');
      return;
    }
    
    try {
      // Convert userData to Cal.com prefill format
      const prefill = userData ? {
        name: userData.full_name || '',
        email: userData.email || '',
        notes: `Job Title: ${userData.job_title || 'Not provided'}\nCompany: ${userData.company || 'Not provided'}`
      } : {};
      
      // Create a temporary button with the necessary attributes
      const button = document.createElement('button');
      button.setAttribute('data-cal-link', 'kunaljain1017/30min');
      button.setAttribute('data-cal-namespace', '30min');
      button.setAttribute('data-cal-config', JSON.stringify({
        layout: "month_view",
        hideEventTypeDetails: false,
        prefill
      }));
      
      // Add the button to the document (it can be hidden)
      button.style.display = 'none';
      document.body.appendChild(button);
      
      // Initialize the button's Cal.com functionality
      window.Cal("init", "30min", {origin: "https://cal.com"});
      
      // Click the button programmatically
      setTimeout(() => {
        // Trigger a click event on the button
        button.click();
        
        // Clean up after a delay
        setTimeout(() => {
          document.body.removeChild(button);
        }, 1000);
      }, 100);
    } catch (error) {
      console.error("Error opening Cal.com:", error);
      // Fallback to direct link if there's an error
      window.open('https://cal.com/kunaljain1017/30min', '_blank');
    }
  };

  return { calComLoaded, openCalCom };
};

export default useCalCom;
