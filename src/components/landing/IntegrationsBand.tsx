
import { useState } from 'react';

// CAD system logos and names
const integrations = [{
  name: "SOLIDWORKS",
  logo: "/lovable-uploads/2f51a828-c9e3-4b46-99be-466768155b5c.png" // Updated to the new SOLIDWORKS logo
}, {
  name: "Inventor",
  logo: "/lovable-uploads/b52aa918-f6d2-4caf-b99b-759aafbb973e.png" // Updated to the new Inventor logo
}, {
  name: "Onshape",
  logo: "/lovable-uploads/7478c2e3-4685-447b-81da-e27486fcb138.png" // Updated to the new Onshape logo
}, {
  name: "Fusion 360",
  logo: "/lovable-uploads/c110873b-ac05-48a8-a75c-7b3021a773bd.png" // Updated to the new Fusion 360 logo
}];

const IntegrationsBand = () => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Integrations coming soon...</h2>
        <p className="text-xl text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Seamlessly connect with your favorite CAD tools.
        </p>
        
        <div className="relative flex justify-center items-center py-16">
          {/* Dotted connector lines - now with negative z-index to appear behind everything */}
          <div className="absolute top-1/2 w-full border-t border-dashed border-primary/30 -z-10"></div>
          
          {/* Center Tandem symbol - updated to use the new uploaded image */}
          <div className="absolute z-10 bg-background rounded-full p-6 shadow-lg">
            <img 
              src="/lovable-uploads/e5550669-1cc4-43f2-8c6c-eb6f6b66553c.png" 
              alt="Tandem Integration Hub" 
              className="h-32 w-32 object-contain" 
            />
          </div>
          
          {/* Integration logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full">
            {integrations.map((integration, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center"
                onMouseEnter={() => setFocusedIndex(index)}
                onMouseLeave={() => setFocusedIndex(null)}
              >
                <div className={`
                  w-24 h-24 rounded-md border flex items-center justify-center p-2
                  transition-all duration-300 bg-white z-0
                  ${focusedIndex === index ? 'opacity-100 scale-110 shadow-md' : 'opacity-70'}
                  ${focusedIndex !== null && focusedIndex !== index ? 'opacity-40' : ''}
                `}>
                  <img 
                    src={integration.logo} 
                    alt={`${integration.name} logo`} 
                    className="max-w-full max-h-full object-contain" 
                  />
                </div>
                <div className="mt-3 text-sm font-medium">{integration.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsBand;
