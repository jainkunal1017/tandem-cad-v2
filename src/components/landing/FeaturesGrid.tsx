
import { FileType, Search, Clock, Share, Lock, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: "Instant DIF generation",
    description: "Generate Design-Intent Files automatically during each CAD session.",
    icon: FileType,
  },
  {
    title: "Semantic search",
    description: "Find design decisions based on intent, not just file names or metadata.",
    icon: Search,
  },
  {
    title: "Timeline diff viewer",
    description: "Visualize design changes over time with intuitive comparison tools.",
    icon: Clock,
  },
  {
    title: "One-click sharing",
    description: "Effortlessly share design intent with stakeholders without CAD licenses.",
    icon: Share,
  },
  {
    title: "Role-based access",
    description: "Control who can view, comment, and approve design changes.",
    icon: Lock,
  },
  {
    title: "Audit-ready exports",
    description: "Generate compliant documentation for regulatory submission in seconds.",
    icon: FileText, // Changed from FileExport to FileText
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-12 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">Feature Highlights</h2>
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          Everything you need to streamline your design process.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-card">
              <CardHeader className="pb-2">
                <feature.icon className="h-6 w-6 mb-2 text-primary" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
