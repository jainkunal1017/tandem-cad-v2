
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    quote: "Our change process is fully manual. We generate a PDF, fill out forms by hand, list part numbers and revisions in a spreadsheet, then paste it all into PowerApp for approval. Even small updates follow the same process. Writing up the rationale takes time and usually comes from scattered discussions. It's slow and easy to mess up.",
    author: "Odell Jimenez",
    title: "Product Development Engineer",
    company: "NIBCO INC.",
    experience: "",
    avatar: "/lovable-uploads/56fb73a9-2b38-4dce-8a8d-8af75789449a.png"
  }
];

// Create testimonial card component
const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <div className="bg-[#131613] border-2 border-[#1E221E] rounded-xl p-6 min-h-[104px] relative overflow-hidden">
    {/* Subtle diagonal noise overlay */}
    <div 
      className="absolute inset-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c0 8-8 8-8 16s8 8 8 16 8-8 16-8 8 8 16 8 8-8 8-16-8-8-8-16 8-8 16-8 8 8 16 8' stroke='%23ffffff' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
        backgroundSize: '32px 32px'
      }}
    />
    
    <p className="text-white text-sm leading-5 mb-4">
      "{testimonial.quote}"
    </p>
    
    <div className="flex items-center gap-3">
      <Avatar className="w-8 h-8">
        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
        <AvatarFallback className="text-xs">{testimonial.author.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-white text-lg font-semibold">{testimonial.author}</p>
        <p className="text-gray-400 text-sm">
          {testimonial.title}
          {testimonial.company && ` · ${testimonial.company}`}
        </p>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  // Split testimonials into three columns
  const leftColumn = [testimonials[0], testimonials[3], testimonials[6]];
  const middleColumn = [testimonials[1], testimonials[4]];
  const rightColumn = [testimonials[2], testimonials[5]];

  return (
    <section 
      id="testimonials" 
      className="w-full pt-24 pb-30 px-4"
      style={{
        background: 'radial-gradient(ellipse at center, #0F2F23 0%, #0D0D0D 100%)'
      }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-white">
          People Can't Stop{' '}
          <span className="italic font-serif">Talking</span>
          {' '}About Tandem
        </h2>
        
        {/* Desktop: 3-column animated grid */}
        <div className="hidden sm:block">
          <div className="overflow-hidden">
            <div className="grid grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="carousel-col left">
                {/* Duplicate for seamless loop */}
                {[...leftColumn, ...leftColumn].map((testimonial, index) => (
                  <TestimonialCard key={`left-${index}`} testimonial={testimonial} />
                ))}
              </div>
              
              {/* Middle Column */}
              <div className="carousel-col middle">
                {/* Duplicate for seamless loop */}
                {[...middleColumn, ...middleColumn].map((testimonial, index) => (
                  <TestimonialCard key={`middle-${index}`} testimonial={testimonial} />
                ))}
              </div>
              
              {/* Right Column */}
              <div className="carousel-col right">
                {/* Duplicate for seamless loop */}
                {[...rightColumn, ...rightColumn].map((testimonial, index) => (
                  <TestimonialCard key={`right-${index}`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Simple vertical stack */}
        <div className="sm:hidden">
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`mobile-${index}`} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
