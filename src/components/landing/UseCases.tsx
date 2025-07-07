
import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, FileCheck, Clock } from 'lucide-react';

const useCases = [
  {
    title: "Knowledge Retention",
    description: "Preserve tribal knowledge when designers leave your organization by capturing the 'why' behind every design decision.",
    icon: Users
  },
  {
    title: "Regulatory Compliance",
    description: "Streamline audit preparation with instant, version-controlled history and comprehensive documentation.",
    icon: FileText
  },
  {
    title: "Supplier Communication",
    description: "Eliminate misinterpretations by sharing clear, human-readable summaries of design intent with suppliers.",
    icon: FileCheck
  },
  {
    title: "Design Reviews",
    description: "Accelerate design reviews with contextual information and complete design history at your fingertips.",
    icon: Clock
  }
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-12 px-4 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Use Cases</h2>
        <p className="text-xl text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          See how Tandem solves real-world engineering challenges.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <useCase.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
