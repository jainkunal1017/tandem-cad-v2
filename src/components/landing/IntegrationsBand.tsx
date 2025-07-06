
import { useState } from 'react';

const IntegrationsBand = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Integrations coming soon...</h2>
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
          Seamlessly connect with your favorite CAD tools.
        </p>
        
        <div className="flex justify-center items-center py-8">
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/e5550669-1cc4-43f2-8c6c-eb6f6b66553c.png" 
              alt="CAD Integrations Coming Soon" 
              className="w-[400px] h-auto object-contain" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsBand;
