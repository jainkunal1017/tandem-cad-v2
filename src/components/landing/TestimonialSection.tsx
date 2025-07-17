
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
    quote: "I love to design for customers. But every review turns into proving I followed the rules. That's not why I became an engineer. If Tandem can take care of that, it's a game changer.",
    author: "Andrew Shutte",
    title: "Mechanical Engineer Consultant, Leader of the largest Solidworks User Group",
    company: "",
    experience: "",
    avatar: "/lovable-uploads/d982388e-eccf-4fa6-b6f0-063b74993b07.png"
  },
  {
    quote: "A lot of people in the CAD review weren't looking at my file every day like I was... Having even a super concise doc, what the part is, why it's there, would help them come in familiar and actually contribute better. It shifts the review from just nodding along to real idea generation.",
    author: "Josh Cox",
    title: "Mechanical Engineer",
    company: "Daylight Solutions, Herrick Laboratories",
    experience: "",
    avatar: "/lovable-uploads/15b9dd48-2103-48c9-b9a6-a2c4b7b5d327.png"
  },
  {
    quote: "Every time I look at an old part, there's always something off, wrong descriptions, bad file names, or no clear build order. I end up digging through the model tree just trying to figure out what someone else did. And if things aren't labeled clearly, it becomes a guessing game. Change one feature and suddenly everything downstream breaks.",
    author: "Kyle Suh",
    title: "Mechanical Engineer + Project Engineer",
    company: "Johnson Controls",
    experience: "",
    avatar: "/lovable-uploads/fbe5e963-fb47-42a9-b117-b0325710bbbf.png"
  },
  {
    quote: "What you're building is spot on. Most organizations don't have the discipline, staff, or time to clean up design documentation, and it takes full time effort to do it right. I love your approach of using AI to trace design steps, connect related files, and surface what matters. Pulling in context like FEA runs or cut sheets, things that influenced key decisions, makes a huge difference.",
    author: "Todd Mansfield",
    title: "Director of Product",
    company: "OneIPM",
    experience: "ex COO of House of Design Robotics, ex VP of Eng ECCO Safety Group",
    avatar: "/lovable-uploads/0386da4d-83c4-4035-948d-4121e6f00d74.png"
  },
  {
    quote: "Our change process is extremely manual. We create a PDF to generate an engineering change number, fill out the entire form by hand, list all the part numbers, figure numbers, and revisions in a spreadsheet, then copy and paste it into PowerApp for approvals. Even small changes go through the same workflow. Writing up why the change is happening takes time, and the information often comes from back-and-forth with the plant or digging through past discussions. It's time-consuming, repetitive, and error-prone.",
    author: "Odell Jimenez",
    title: "Product Development Engineer",
    company: "NIBCO INC.",
    experience: "",
    avatar: "/lovable-uploads/56fb73a9-2b38-4dce-8a8d-8af75789449a.png"
  }
];

const TestimonialSection = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-scroll functionality
  React.useEffect(() => {
    if (!api) {
      return;
    }

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        if (api.canScrollNext()) {
          api.scrollNext();
        } else {
          api.scrollTo(0);
        }
      }, 4000);
    };

    const stopAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    startAutoScroll();

    return () => {
      stopAutoScroll();
    };
  }, [api]);

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Engineers can't wait</h2>
        
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
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
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="relative static mx-0 left-0 translate-y-0" />
              <CarouselNext className="relative static mx-0 right-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
