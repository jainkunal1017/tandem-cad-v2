import { Clock, CpuIcon, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
const processSteps = [{
  number: 1,
  title: "Record CAD session",
  description: "Capture every design decision in real-time without disrupting your workflow.",
  icon: Clock
}, {
  number: 2,
  title: "Auto-summarize intent",
  description: "AI generates clear, concise documentation of your design rationale.",
  icon: CpuIcon
}, {
  number: 3,
  title: "Share & approve instantly",
  description: "Collaborate with stakeholders for immediate feedback and sign-off.",
  icon: Share2
}];
const HowItWorks = () => {
  return <section id="how-it-works" className="relative py-12 px-4 overflow-hidden">
      {/* Subtle vertical connecting lines */}
      
      <div className="absolute left-1/3 top-0 bottom-0 w-px bg-primary/5 hidden lg:block" aria-hidden="true"></div>
      
      
      {/* Curved line connecting cards */}
      

      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">How It Works</h2>
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          Three simple steps to transform your design workflow.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processSteps.map(step => <Card key={step.number} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="relative pb-2">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center absolute -top-4 -left-4">
                  {step.number}
                </div>
                <step.icon className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default HowItWorks;