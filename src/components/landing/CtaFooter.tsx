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
      <section className="py-16 px-4 text-primary-foreground bg-black">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">
            Ready to design, decide, and deliver in Tandem?
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 transition-transform hover:scale-[1.02] h-12 px-8 dark:text-black" 
              onClick={() => setShowDemoForm(true)}
            >
              Request Demo
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 transition-transform hover:scale-[1.02] h-12 px-8"
              onClick={scrollToWaitlist}
            >
              Join the Waitlist
            </Button>
            
            {/* Built by engineers badge - Boeing logo moved to the end */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 shadow-sm">
              <span className="text-sm text-gray-700 dark:text-gray-300">Built by mechanical &amp; AI engineers at</span>
              <div className="flex items-center">
                <div className="h-6 flex items-center">
                  {/* Use different logos based on dark mode */}
                  <img alt="Rolls Royce Logo" className="h-full object-contain hidden dark:block" src="/lovable-uploads/8c9ad3e3-5241-4b6b-a090-667209abfd44.png" />
                  <img alt="Rolls Royce Logo" className="h-full object-contain dark:hidden" src="/lovable-uploads/6ac61aab-1b56-4d2f-b957-2f99f3452b3f.png" />
                </div>
                <div className="h-5 flex items-center mx-2">
                  {/* Use different AWS logos based on dark mode */}
                  <img alt="AWS Logo" className="h-full object-contain hidden dark:block" src="/lovable-uploads/978993a1-0308-4440-bd20-b4e32762d56e.png" />
                  <img alt="AWS Logo" className="h-full object-contain dark:hidden" src="/lovable-uploads/f459a07d-11ba-4cf8-a527-5ea7d7d9ab56.png" />
                </div>
                <div className="h-7 flex items-center">
                  {/* Use different Boeing logos based on dark mode */}
                  <img alt="Boeing Logo" className="h-full object-contain hidden dark:block" src="/lovable-uploads/6ba3b3bc-6b23-4cc6-8bf4-0fbdb160e907.png" />
                  <img alt="Boeing Logo" className="h-full object-contain dark:hidden" src="/lovable-uploads/c52196ce-e4cb-4055-8d2a-f95151917d27.png" />
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
