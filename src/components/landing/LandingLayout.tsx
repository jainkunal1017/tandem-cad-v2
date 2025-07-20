
import { ReactNode, useState } from 'react';
import useCalCom from '@/hooks/useCalCom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import WaitlistForm from '@/components/landing/waitlist';
import LandingHeader from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';
import BackgroundLines from '@/components/landing/BackgroundLines';
import { Button } from '@/components/ui/button';

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  const { openCalCom } = useCalCom();
  const [showDemoForm, setShowDemoForm] = useState(false);
  
  const handleRequestDemo = () => {
    setShowDemoForm(true);
  };
  
  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundColor: '#F7F8F9' }}>
      {/* Background design elements */}
      <BackgroundLines />

      {/* Header with navigation */}
      <LandingHeader 
        onShowWaitlist={scrollToWaitlist} 
        onRequestDemo={handleRequestDemo}
      />
      
      {/* Demo Request Dialog */}
      <Dialog open={showDemoForm} onOpenChange={setShowDemoForm}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Request a demo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            <WaitlistForm onSuccess={(userData) => {
              setShowDemoForm(false);
              openCalCom(userData);
            }} />
            
            {/* Bypass option for users already on the waitlist */}
            <div className="mt-4 pt-4 border-t text-center">
              <Button 
                variant="outline"
                onClick={() => {
                  setShowDemoForm(false);
                  openCalCom();
                }}
                className="w-full"
              >
                Skip to calendar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Main content */}
      <main className="flex-1 relative z-10">
        {children}
      </main>
      
      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingLayout;
