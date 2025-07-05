
import { useEffect } from 'react';
import LandingLayout from '@/components/landing/LandingLayout';

// Landing page sections
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import IntegrationsBand from '@/components/landing/IntegrationsBand';
import JoinWaitlist from '@/components/landing/JoinWaitlist';
import FAQ from '@/components/landing/FAQ';
import CtaFooter from '@/components/landing/CtaFooter';
import ProductOverview from '@/components/landing/ProductOverview';
import UseCases from '@/components/landing/UseCases';
import TestimonialSection from '@/components/landing/TestimonialSection';

const LandingPage = () => {
  // Update document title when component mounts
  useEffect(() => {
    document.title = 'Tandem - Design History On Autopilot';
  }, []);

  return (
    <LandingLayout>
      {/* Main hero section */}
      <Hero />
      
      {/* Product overview section - with ID for navigation */}
      <section id="product">
        <ProductOverview />
      </section>
      
      {/* How it works section - moved down */}
      <HowItWorks />
      
      {/* Integrations band section */}
      <IntegrationsBand />
      
      {/* Use cases section - moved before waitlist */}
      <UseCases />
      
      {/* Join waitlist section with ID for navigation */}
      <section id="waitlist">
        <JoinWaitlist />
      </section>
      
      {/* Customer testimonials section */}
      <TestimonialSection />
      
      {/* FAQ section */}
      <FAQ />
      
      {/* Call to action footer - with ID for contact */}
      <section id="contact">
        <CtaFooter />
      </section>
    </LandingLayout>
  );
};

export default LandingPage;
