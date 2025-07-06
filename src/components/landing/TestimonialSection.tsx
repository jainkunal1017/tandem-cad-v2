import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "I never wanted to be a clerk. I wanted to be an engineer. Tandem gives that ability",
    author: "Jim Doxey",
    title: "Product Data Professional",
    company: "Tonal",
    experience: "Ex: Facebook, Oculus, Google, Dropbox, and Boeing",
    avatar: "/lovable-uploads/9508512a-49d5-4352-bfa7-02865a035457.png"
  },
  {
    quote: "The documentation needed in decision making is painful to find and create. So if you guys can hit that, that would be like a major quality of life improvement.",
    author: "Louis Nguyen",
    title: "Senior Design Engineer",
    company: "Boeing",
    experience: "Ex: Collins Aerospace",
    avatar: "/lovable-uploads/b648c8d7-a957-4a6c-ad8e-6c2ffbf5f345.png"
  },
  {
    quote: "We've eliminated the tribal knowledge problem. New team members get up to speed in days, not months.",
    author: "Michael Chen",
    title: "Engineering Director",
    company: "EV Motors",
    experience: "",
    avatar: "/lovable-uploads/49eec77b-b23d-4b6c-99fe-fe72252525c6.png"
  },
  {
    quote: "Communication with suppliers has never been clearer. No more back-and-forth explaining design intent.",
    author: "Alex Rivera",
    title: "Supply Chain Manager",
    company: "MedTech Solutions",
    experience: "",
    avatar: "/lovable-uploads/fa942f5a-e8a2-4c51-81b4-9411ed94c43a.png"
  },
  {
    quote: "Tandem's DIF files have become our single source of truth. It's transformed our design review process.",
    author: "Priya Patel",
    title: "Quality Assurance Lead",
    company: "Medical Devices Co.",
    experience: "",
    avatar: "/lovable-uploads/bc95c9da-5321-45c2-971f-cfd7ef79f1e6.png"
  },
  {
    quote: "Our ISO audits used to take weeks of preparation. Now we just export from Tandem and we're ready.",
    author: "David Wilson",
    title: "Compliance Manager",
    company: "Advanced Robotics",
    experience: "",
    avatar: "/lovable-uploads/49eec77b-b23d-4b6c-99fe-fe72252525c6.png"
  }
];

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
  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Engineers can't wait</h2>
        
        <div className="relative">
          {/* Blurred edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10"></div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
              skipSnaps: true,
              dragFree: true
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3 transition-opacity duration-500">
                  <Card className="bg-background border shadow-sm h-full">
                    <CardContent className="pt-6 flex flex-col h-full">
                      <Quote className="h-8 w-8 text-primary/40 mb-4" />
                      <p className="text-lg mb-6 flex-grow">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-start gap-3">
                        <Avatar className="mt-1">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                          <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-base">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground font-medium">{testimonial.title}</p>
                          <p className="text-sm font-semibold text-foreground">{testimonial.company}</p>
                          {testimonial.experience && (
                            <p className="text-xs text-muted-foreground mt-1">{testimonial.experience}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <CarouselPrevious className="relative static mx-2 left-0 translate-y-0" />
              <CarouselNext className="relative static mx-2 right-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
