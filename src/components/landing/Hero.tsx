
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
      <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
        <div 
          className="w-full max-w-7xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden relative"
          style={{ 
            background: 'radial-gradient(ellipse at 20% 30%, #000000 0%, #0A0A0A 25%, #1a3a32 60%, #4ade80 100%)'
          }}
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Mobile: Switch to column-reverse layout */}
            <div className="lg:col-span-7 space-y-8 animate-fade-up max-sm:order-2 max-sm:text-center">
              {/* Built by section */}
              <div className="inline-flex items-center space-x-3 text-sm text-gray-300 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <span>Built by Mechanical & AI engineers at</span>
                <div className="flex items-center space-x-4">
                  <img 
                    src="/lovable-uploads/4b9cec9a-ee91-4d67-904d-636bd2be0171.png" 
                    alt="Rolls Royce" 
                    className="h-4 object-contain brightness-0 invert"
                  />
                  <img 
                    src="/lovable-uploads/32197b2b-4e31-4dbc-8cf8-19f78b0b823b.png" 
                    alt="AWS" 
                    className="h-4 object-contain brightness-0 invert"
                  />
                  <img 
                    src="/lovable-uploads/c5eb81bc-a7cb-4d44-b9d0-802ecabe5b5e.png" 
                    alt="Boeing" 
                    className="h-4 object-contain brightness-0 invert"
                  />
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-[4.25rem] font-extrabold leading-tight text-white">
                  Design documentation
                </h1>
                <h1 className="text-5xl lg:text-[4.25rem] font-extrabold leading-tight text-white">
                  on <span className="text-emerald-bright">autopilot.</span>
                </h1>
              </div>

              {/* Body Text */}
              <p className="text-xl text-gray-300 max-w-[460px] leading-relaxed max-sm:mx-auto">
                Tandem captures every sketch, mate, and feature so engineers stop writing and start engineering.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 max-sm:w-full">
                <Button
                  onClick={scrollToWaitlist}
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100 h-11 px-8 rounded-full font-medium text-base max-sm:w-full max-sm:h-[44px]"
                >
                  Get Early Access
                </Button>
                <Button
                  onClick={() => setShowDemoForm(true)}
                  variant="ghost"
                  size="lg"
                  className="text-white border border-white/20 hover:bg-white/10 h-11 px-8 rounded-full font-medium text-base max-sm:w-full max-sm:h-[44px]"
                >
                  Book a Demo
                </Button>
              </div>

              {/* Perk Row */}
              <div className="flex flex-col sm:flex-row gap-8 pt-4 max-sm:flex-wrap max-sm:gap-4 max-sm:justify-center">
                <div className="flex items-start space-x-3 max-sm:w-[calc(50%-8px)]">
                  <div className="w-6 h-6 rounded-full bg-emerald-bright/20 flex items-center justify-center mt-0.5">
                    <Zap className="w-3 h-3 text-emerald-bright" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-white">Built for Speed</div>
                    <div className="text-sm text-gray-300">Get started in minutes</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3 max-sm:w-[calc(50%-8px)]">
                  <div className="w-6 h-6 rounded-full bg-emerald-bright/20 flex items-center justify-center mt-0.5">
                    <Hand className="w-3 h-3 text-emerald-bright" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-white">No-Code Friendly</div>
                    <div className="text-sm text-gray-300">Launch and manage easily</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Product Screenshot */}
            <div className="lg:col-span-5 animate-slide-in-right opacity-0 max-sm:order-1">
              <div className="relative max-sm:w-full max-sm:max-w-[320px] max-sm:mx-auto">
                {/* MacBook Frame */}
                <div 
                  className="bg-gray-800 rounded-xl p-1 shadow-2xl"
                  style={{
                    transform: 'rotate(11deg) scale(1.1)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 60px rgba(24, 212, 122, 0.12)'
                  }}
                >
                  <div className="bg-black rounded-lg overflow-hidden">
                    {/* MacBook notch */}
                    <div className="h-6 bg-black flex items-center justify-center">
                      <div className="w-32 h-4 bg-black rounded-b-xl"></div>
                    </div>
                    {/* Screenshot */}
                    <img
                      src="/lovable-uploads/dd18cf98-ec4e-41e5-b80f-89d90248b2bd.png"
                      alt="Tandem Dashboard"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
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
