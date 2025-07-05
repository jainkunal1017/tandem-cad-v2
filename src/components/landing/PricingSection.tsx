
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const PricingSection = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  
  const pricingTiers: PricingTier[] = [
    {
      name: "Starter",
      price: billingCycle === "annual" ? "$49" : "$59",
      description: "Perfect for small teams getting started with design documentation.",
      features: [
        "Up to 5 team members",
        "10 projects",
        "Basic DIF generation",
        "14-day history retention",
        "Email support"
      ],
      buttonText: "Start Free Trial"
    },
    {
      name: "Professional",
      price: billingCycle === "annual" ? "$99" : "$119",
      description: "Advanced features for growing engineering teams.",
      features: [
        "Up to 20 team members",
        "Unlimited projects",
        "Advanced DIF generation",
        "1-year history retention",
        "Priority support",
        "Custom export formats",
        "API access"
      ],
      buttonText: "Start Free Trial",
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Custom solutions for large organizations with complex needs.",
      features: [
        "Unlimited team members",
        "Unlimited projects",
        "Premium DIF generation",
        "Unlimited history retention",
        "Dedicated support manager",
        "Custom integrations",
        "On-premise deployment",
        "Compliance assistance"
      ],
      buttonText: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Transparent Pricing</h2>
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          Choose the plan that's right for your team.
        </p>
        
        {/* Billing cycle toggle */}
        <div className="flex justify-center items-center mb-12">
          <div className="bg-background rounded-lg p-1 inline-flex">
            <button 
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                billingCycle === "monthly" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                billingCycle === "annual" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setBillingCycle("annual")}
            >
              Annual <span className="text-xs opacity-75">(Save 20%)</span>
            </button>
          </div>
        </div>
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`border ${tier.isPopular ? 'border-primary shadow-lg relative' : 'shadow-sm'}`}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.price !== "Custom" && (
                    <span className="text-muted-foreground">/{billingCycle === "annual" ? "year" : "month"}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{tier.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={tier.isPopular ? "default" : "outline"} className="w-full">
                  {tier.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
