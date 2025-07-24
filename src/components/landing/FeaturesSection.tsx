import { useState } from 'react';
import { RotateCw, Brain, FileText, Search, ShieldCheck, Globe } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const features = [
  {
    icon: RotateCw,
    title: "Effortless Capture",
    description: "The Watch Layer records every sketch, mate, and feature in real time—no extra clicks."
  },
  {
    icon: Brain,
    title: "Contextual Intelligence", 
    description: "Our Context Engine links CAD actions to goals, constraints, and reference docs."
  },
  {
    icon: FileText,
    title: "Automated Docs",
    description: "DIF Generator turns raw CAD history into audit-ready PDFs and timelines."
  },
  {
    icon: Search,
    title: "Semantic Search",
    description: "Find parts by purpose, material, or 'why', not cryptic filenames—powered by Vault."
  },
  {
    icon: ShieldCheck,
    title: "Compliance Assurance",
    description: "Stay FAA-ready with traceable design intent that prevents costly certification delays."
  },
  {
    icon: Globe,
    title: "Cross-Platform Vision",
    description: "Built in SolidWorks today, engineered to support every major CAD platform tomorrow."
  }
];

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section id="features" className="w-full bg-[#F7F8F9] py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 max-sm:mb-10">
          <div className="inline-block bg-white rounded-full px-4 py-2 text-xs font-medium tracking-[0.08em] text-gray-600 uppercase mb-6">
            Game-Changing Features
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-sm:text-3xl">
            Discover Tandem's game-changing features
          </h1>
        </div>

        {/* Desktop: Features Grid */}
        <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-0">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLastInRow = (index + 1) % 3 === 0;
            const isBottomRow = index >= 3;
            
            return (
              <div
                key={feature.title}
                className={`
                  group relative px-8 py-12 text-center transition-all duration-200 hover:-translate-y-1
                  ${!isLastInRow && 'md:border-r border-[#E4E6E8]'}
                  ${!isBottomRow && 'border-b border-[#E4E6E8]'}
                `}
              >
                <div className="flex flex-col items-center">
                  <Icon 
                    size={24} 
                    strokeWidth={2} 
                    className="text-gray-900 group-hover:text-emerald-bright transition-colors duration-200 mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 group-hover:-translate-y-1 transition-transform duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-600 max-w-[31ch] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Swipeable Carousel */}
        <div className="sm:hidden">
          <Carousel 
            className="w-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <CarouselItem key={index}>
                    <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
                      <div className="flex flex-col items-center">
                        <Icon 
                          size={28} 
                          strokeWidth={2} 
                          className="text-gray-900 mb-4"
                        />
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                          {feature.title}
                        </h3>
                        <p className="text-base text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;