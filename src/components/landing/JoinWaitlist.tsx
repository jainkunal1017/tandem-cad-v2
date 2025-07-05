
import { useState } from 'react';
import WaitlistForm from '@/components/landing/waitlist';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const JoinWaitlist = () => {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  
  return (
    <section className="py-12 relative overflow-hidden" id="join-waitlist">
      <div className="container mx-auto max-w-6xl relative z-10 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 animate-fade-in">Join the Waitlist</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Want early access? Join the waitlist and we'll keep you in the loop.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-xl mx-auto animate-fade-in">
          <WaitlistForm onSuccess={() => setShowWaitlistForm(false)} />
        </div>
      </div>
    </section>
  );
};

export default JoinWaitlist;
