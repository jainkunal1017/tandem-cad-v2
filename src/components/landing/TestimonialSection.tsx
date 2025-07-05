import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
const testimonials = [{
  quote: "Tandem changed how we document design decisions. Our audit prep time was reduced by 80%.",
  author: "Sarah Johnson",
  title: "Lead Design Engineer, Aerospace Inc.",
  avatar: "/lovable-uploads/bc95c9da-5321-45c2-971f-cfd7ef79f1e6.png"
}, {
  quote: "We've eliminated the tribal knowledge problem. New team members get up to speed in days, not months.",
  author: "Michael Chen",
  title: "Engineering Director, EV Motors",
  avatar: "/lovable-uploads/49eec77b-b23d-4b6c-99fe-fe72252525c6.png"
}, {
  quote: "Communication with suppliers has never been clearer. No more back-and-forth explaining design intent.",
  author: "Alex Rivera",
  title: "Supply Chain Manager, MedTech Solutions",
  avatar: "/lovable-uploads/fa942f5a-e8a2-4c51-81b4-9411ed94c43a.png"
}, {
  quote: "Tandem's DIF files have become our single source of truth. It's transformed our design review process.",
  author: "Priya Patel",
  title: "Quality Assurance Lead, Medical Devices Co.",
  avatar: "/lovable-uploads/bc95c9da-5321-45c2-971f-cfd7ef79f1e6.png"
}, {
  quote: "Our ISO audits used to take weeks of preparation. Now we just export from Tandem and we're ready.",
  author: "David Wilson",
  title: "Compliance Manager, Advanced Robotics",
  avatar: "/lovable-uploads/49eec77b-b23d-4b6c-99fe-fe72252525c6.png"
}, {
  quote: "When we onboard new engineers, Tandem cuts their ramp-up time in half. The design rationale is all there.",
  author: "Emma Rodriguez",
  title: "Senior Manager, Automotive Systems",
  avatar: "/lovable-uploads/fa942f5a-e8a2-4c51-81b4-9411ed94c43a.png"
}];
const TestimonialSection = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [isPaused, setIsPaused] = React.useState(false);
  const scrollAnimationRef = useRef<number | null>(null);
  const scrollSpeedRef = useRef(0.0005); // Very slow continuous scroll

  // Set up automatic scrolling
  useEffect(() => {
    if (!api) return;
    const autoScroll = () => {
      if (!isPaused) {
        // Move the carousel forward a small amount
        const currentPosition = api.scrollProgress();
        api.scrollTo(currentPosition + scrollSpeedRef.current);
      }

      // Continue the animation loop
      scrollAnimationRef.current = requestAnimationFrame(autoScroll);
    };

    // Start the animation
    scrollAnimationRef.current = requestAnimationFrame(autoScroll);

    // Pause/resume on hover
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    // Add event listeners to the carousel container
    const carouselElement = document.querySelector('[role="region"][aria-roledescription="carousel"]');
    if (carouselElement) {
      carouselElement.addEventListener('mouseenter', handleMouseEnter);
      carouselElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Cleanup
    return () => {
      if (scrollAnimationRef.current !== null) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
      if (carouselElement) {
        carouselElement.removeEventListener('mouseenter', handleMouseEnter);
        carouselElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [api, isPaused]);
  return <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Engineers can't wait</h2>
        
        
        <div className="relative">
          {/* Blurred edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>
          
          <Carousel opts={{
          align: "start",
          loop: true,
          skipSnaps: true,
          // Allow partial slides for smooth scrolling
          dragFree: true // Enable momentum scrolling
        }} setApi={setApi} className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 transition-opacity duration-500">
                  <Card className="bg-background border shadow-sm h-full">
                    <CardContent className="pt-6 flex flex-col h-full">
                      <Quote className="h-8 w-8 text-primary/40 mb-4" />
                      <p className="text-lg mb-6 flex-grow">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                          <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static mx-2 left-0 translate-y-0" />
              <CarouselNext className="relative static mx-2 right-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>;
};
export default TestimonialSection;