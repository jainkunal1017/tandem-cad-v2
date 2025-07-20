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
      <section className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div 
          className="w-full max-w-7xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden relative"
          style={{ background: 'var(--hero-gradient)' }}
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column - Content */}
            <div className="lg:col-span-7 space-y-8 animate-fade-up">
              {/* Built by section */}
              <div className="inline-flex items-center space-x-3 text-sm text-gray-300 bg-white/5 rounded-full px-4 py-2 border border-white/10">
                <span>Built by Mechanical & AI engineers at</span>
                <div className="flex items-center space-x-4">
                  <img 
                    src="/lovable-uploads/fbe5e963-fb47-42a9-b117-b0325710bbbf.png" 
                    alt="Rolls Royce" 
                    className="h-4 object-contain brightness-0 invert"
                  />
                  <img 
                    src="/lovable-uploads/d1587fe7-24e3-4ec5-a704-627f8ca50802.png" 
                    alt="AWS" 
                    className="h-4 object-contain brightness-0 invert"
                  />
                  <img 
                    src="/lovable-uploads/abbb308e-a76a-4f3f-8896-9207cdac38a7.png" 
                    alt="Boeing" 
                    className="h-4 object-contain brightness-0 invert"
                  />
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-[4.25rem] font-extrabold leading-tight text-white">
                  Document Designs
                </h1>
                <h1 className="text-5xl lg:text-[4.25rem] font-extrabold leading-tight text-white">
                  in <span className="text-emerald-bright">Minutes.</span>
                </h1>
              </div>

              {/* Body Text */}
              <p className="text-xl text-gray-300 max-w-[460px] leading-relaxed">
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


              {/* Perk Row */}
              <div className="flex flex-col sm:flex-row gap-8 pt-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-bright/20 flex items-center justify-center mt-0.5">
                    <Zap className="w-3 h-3 text-emerald-bright" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-white">Built for Speed</div>
                    <div className="text-sm text-gray-300">Get started in minutes</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
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
            <div className="lg:col-span-5 animate-slide-in-right opacity-0">
              <div className="relative">
                {/* MacBook Frame */}
                <div 
                  className="bg-gray-800 rounded-xl p-1 shadow-2xl transform rotate-2"
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(24, 212, 122, 0.1)'
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
                      className="w-full h-auto"
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