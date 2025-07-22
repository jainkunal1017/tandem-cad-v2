
import { Button } from "@/components/ui/button";

const IntegrationsBand = () => {
  // Partner logos for the orbit animation
  const partnerLogos = [
    "/lovable-uploads/ad95a90e-baea-498a-9340-1ebc2b0e2aff.png", // FreeCAD logo
    "/lovable-uploads/e4dbaf6f-3040-49b1-9d47-42aaa3516252.png", // CATIA
    "/lovable-uploads/b766693c-c2f1-4b5e-b4f3-4e7330347cbb.png", // 3D viewer
    "/lovable-uploads/08660fa4-d479-4930-a581-c2a847bd5bd3.png", // V PRO
    "/lovable-uploads/08193c24-8027-4239-af2d-8e22cbabe4d4.png", // I logo
    "/lovable-uploads/d455c056-fb7d-4855-8199-bacad1c40731.png", // Green hexagonal
    "/lovable-uploads/53949a84-e044-47d3-ae75-6cf0233388a2.png", // NX
    "/lovable-uploads/362ceecd-e245-43b7-a4f6-111758ba7407.png", // Tc
    "/lovable-uploads/c3b46d51-f4db-4ae4-b37f-19dd552d8a8b.png", // SolidWorks
  ];

  // Calculate positions for logos on a circle (180px radius)
  const getLogoPosition = (index: number, total: number) => {
    const angle = (index * 360) / total;
    const radian = (angle * Math.PI) / 180;
    const radius = 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return {
      left: `calc(50% + ${x}px - 32px)`, // 32px = half of 64px logo size
      top: `calc(50% + ${y}px - 32px)`,
    };
  };

  return (
    <section className="w-full bg-[#F7F8F9] py-20 max-sm:py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* White card container */}
        <div className="bg-white rounded-3xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] max-w-[1200px] mx-auto">
          <div className="px-16 py-24 max-sm:px-4 max-sm:py-16">
            {/* Desktop: Two-column grid, Mobile: stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Left Column - Animated Logo Wheel (Desktop only side-by-side) */}
              <div className="flex justify-center">
                <div className="relative w-[420px] h-[420px] max-sm:w-[280px] max-sm:h-[280px]">
                  {/* Tandem logo in center */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <img 
                      src="/lovable-uploads/7628e1a6-b59d-4315-aba1-ae673d2921e6.png" 
                      alt="Tandem" 
                      className="w-24 h-24"
                    />
                  </div>
                  
                  {/* Orbiting logos container */}
                  <div className="absolute inset-0 animate-[spin_40s_linear_infinite]">
                    {partnerLogos.map((logo, index) => {
                      const position = getLogoPosition(index, partnerLogos.length);
                      
                      return (
                        <div
                          key={index}
                          className="absolute w-16 h-16"
                          style={position}
                        >
                          <img 
                            src={logo} 
                            alt={`Partner ${index + 1}`}
                            className="w-full h-full object-contain animate-[spin_40s_linear_infinite_reverse]"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column - Copy + CTA */}
              <div className="text-center lg:text-left lg:pl-8">
                {/* Badge */}
                <div className="inline-block bg-gray-100 px-3 py-1 rounded-full mb-6 max-sm:mb-4">
                  <span className="text-xs font-medium tracking-[0.08em] text-gray-600 uppercase">
                    WORK WITH YOUR TOOLS
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-[48px] lg:text-[52px] font-semibold leading-tight text-gray-900 mb-6 max-sm:text-3xl max-sm:mt-4 max-sm:mb-3">
                  Seamless Integrations,<br />
                  Zero Hassle
                </h2>

                {/* Body copy */}
                <p className="text-base text-gray-600 max-w-[420px] mx-auto lg:mx-0 mb-8 max-sm:text-[15px] max-sm:leading-[1.5] max-sm:mb-6">
                  Connect your favorite tools in seconds—Tandem agents work wherever your engineers do.
                </p>

                {/* CTA Button */}
                <Button 
                  className="bg-black text-white hover:bg-gray-800 rounded-full h-11 px-8 text-sm font-medium max-sm:mx-auto max-sm:mb-8 max-sm:py-3 max-sm:px-6 max-sm:text-[15px] max-sm:block"
                >
                  Explore Features
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsBand;
