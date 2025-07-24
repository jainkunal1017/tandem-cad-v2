
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import WaitlistForm from '@/components/landing/waitlist';
import { Zap, Hand } from 'lucide-react';

const Hero = () => {
  const [showDemoForm, setShowDemoForm] = useState(false);

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById('waitlist');
    if (waitlistSection) {
      waitlistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openCalendar = () => {
    window.open('https://calendly.com/lovable-ai/demo', '_blank');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-20 pb-8 min-h-[70vh]">
        <div 
          className="w-full max-w-7xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden relative"
          style={{ 
            background: 'radial-gradient(ellipse at 20% 30%, #000000 0%, #0A0A0A 25%, #1a3a32 60%, #4ade80 100%)'
          }}
        >
          <div className="flex flex-col items-start text-left space-y-8 animate-fade-up">
            {/* Built by section */}
            <div className="inline-flex items-center space-x-3 text-sm text-gray-300 bg-white/5 rounded-full px-4 py-2 border border-white/10 sm:flex-row sm:space-x-3 sm:space-y-0 flex-col space-y-2 sm:px-4 px-6 sm:py-2 py-3 sm:max-w-none max-w-[280px] text-center sm:text-left">
              <span className="sm:text-sm text-[14px] whitespace-nowrap">Built by Mechanical & AI engineers at</span>
              <div className="flex items-center space-x-4 flex-wrap justify-center sm:justify-start">
                <img 
                  src="/lovable-uploads/4b9cec9a-ee91-4d67-904d-636bd2be0171.png" 
                  alt="Rolls Royce" 
                  className="sm:h-4 h-5 object-contain brightness-0 invert max-w-6"
                />
                <img 
                  src="/lovable-uploads/32197b2b-4e31-4dbc-8cf8-19f78b0b823b.png" 
                  alt="AWS" 
                  className="sm:h-4 h-5 object-contain brightness-0 invert max-w-6"
                />
                <img 
                  src="/lovable-uploads/c5eb81bc-a7cb-4d44-b9d0-802ecabe5b5e.png" 
                  alt="Boeing" 
                  className="sm:h-4 h-5 object-contain brightness-0 invert max-w-6"
                />
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl lg:text-[4.25rem] font-extrabold leading-tight text-white">
                Your CAD data, <span className="text-emerald-bright">explained.</span>
              </h1>
            </div>

            {/* Body Text */}
            <p className="text-xl text-gray-300 max-w-[560px] leading-relaxed">
              Tandem captures every sketch, mate, and feature so engineers stop writing and start engineering.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToWaitlist}
                size="lg"
                className="bg-white text-black hover:bg-gray-100 h-11 px-8 rounded-full font-medium text-base"
              >
                Get Early Access
              </Button>
              <Button
                onClick={() => setShowDemoForm(true)}
                variant="ghost"
                size="lg"
                className="text-white border border-white/20 hover:bg-white/10 h-11 px-8 rounded-full font-medium text-base"
              >
                Book a Demo
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* Demo Request Dialog */}
      <Dialog open={showDemoForm} onOpenChange={setShowDemoForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request a Demo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <WaitlistForm 
              onSuccess={() => {
                setShowDemoForm(false);
                openCalendar();
              }} 
            />
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={openCalendar}
                className="w-full"
              >
                Skip to Calendar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Hero;
