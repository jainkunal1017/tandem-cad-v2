import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import useCalCom from '@/hooks/useCalCom';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import WaitlistForm from '@/components/landing/waitlist';

const CtaFooter = () => {
  const { openCalCom } = useCalCom();
  const [showDemoForm, setShowDemoForm] = useState(false);
  
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
    <>
      <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div 
          className="w-full max-w-7xl mx-auto rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden relative"
          style={{ 
            background: 'radial-gradient(ellipse at 20% 30%, #000000 0%, #0A0A0A 25%, #1a3a32 60%, #4ade80 100%)'
          }}
        >
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to design, decide, and deliver in Tandem?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 h-11 px-8 rounded-full font-medium text-base" 
                onClick={() => setShowDemoForm(true)}
              >
                Request Demo
              </Button>
              
              <Button 
                size="lg" 
                variant="ghost"
                className="text-white border border-white/20 hover:bg-white/10 h-11 px-8 rounded-full font-medium text-base"
                onClick={scrollToWaitlist}
              >
                Join the Waitlist
              </Button>
            </div>
            
            {/* Built by engineers badge */}
            <div className="inline-flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm text-gray-300 bg-white/5 rounded-full px-3 sm:px-4 py-2 border border-white/10 flex-col sm:flex-row space-y-1 sm:space-y-0">
              <span className="whitespace-nowrap text-center sm:text-left">Built by engineers at</span>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <img 
                  src="/lovable-uploads/4b9cec9a-ee91-4d67-904d-636bd2be0171.png" 
                  alt="Rolls Royce" 
                  className="h-3 sm:h-4 object-contain brightness-0 invert"
                />
                <img 
                  src="/lovable-uploads/32197b2b-4e31-4dbc-8cf8-19f78b0b823b.png" 
                  alt="AWS" 
                  className="h-3 sm:h-4 object-contain brightness-0 invert"
                />
                <img 
                  src="/lovable-uploads/c5eb81bc-a7cb-4d44-b9d0-802ecabe5b5e.png" 
                  alt="Boeing" 
                  className="h-3 sm:h-4 object-contain brightness-0 invert"
                />
              </div>
            </div>

            {/* Footer content */}
            <div className="border-t border-white/10 pt-8 mt-12">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <img src="/lovable-uploads/1b27103c-6057-451b-8485-9e865676ad9e.png" alt="Tandem Symbol" className="h-6 w-6 brightness-0 invert" />
                  <span className="text-lg font-bold text-white">Tandem</span>
                </div>
                
                {/* Copyright */}
                <div className="text-sm text-gray-300 text-center sm:text-right">
                  © 2025 Tandem AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
};

export default CtaFooter;
