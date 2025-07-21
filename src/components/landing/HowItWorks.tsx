import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw, Brain, FileText, Database } from 'lucide-react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      label: 'Capture Actions',
      number: '01',
      icon: RotateCcw,
      title: '01. Capture Actions',
      description: 'Tandem records every sketch, mate, feature, and parameter in real time with zero manual effort.',
      buttonText: 'Get Started',
      image: '/lovable-uploads/0034e2eb-b2dd-4b45-ab6a-1b4c219bae1e.png'
    },
    {
      id: 1,
      label: 'Data Integration',
      number: '02',
      icon: Database,
      title: '02. Data Integration',
      description: 'Connects directly to your existing file storage (e.g., Google Drive) or PLM systems to access historical CAD files and engineering data.',
      buttonText: 'Connect Systems',
      image: '/lovable-uploads/dd18cf98-ec4e-41e5-b80f-89d90248b2bd.png'
    },
    {
      id: 2,
      label: 'Contextualize Intent',
      number: '03',
      icon: Brain,
      title: '03. Contextualize Intent',
      description: 'LLMs map your edits to functional intent, so you and future teammates know why each change exists.',
      buttonText: 'Next Step',
      image: '/lovable-uploads/dd18cf98-ec4e-41e5-b80f-89d90248b2bd.png' // placeholder - will use IMG-HOW-2
    },
    {
      id: 3,
      label: 'Generate Docs',
      number: '04',
      icon: FileText,
      title: '04. Generate Docs',
      description: 'One click outputs FAA-ready PDFs, changelogs, and interactive timelines you can share anywhere.',
      buttonText: 'Export Sample Report',
      image: '/lovable-uploads/dd18cf98-ec4e-41e5-b80f-89d90248b2bd.png' // placeholder - will use IMG-HOW-3
    }
  ];

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#F7F8F9' }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Top Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 rounded-full border border-gray-200/50 text-xs font-medium text-gray-700 tracking-[0.08em] uppercase mb-6">
            Easy Onboarding
          </div>
          
          {/* Section Title */}
          <h1 className="text-5xl lg:text-[4.25rem] font-extrabold leading-tight text-gray-900">
            How it works?
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-700 mt-2">
            Watch and Assist
          </h2>
        </div>

        {/* Interactive Card */}
        <div 
          className="bg-white rounded-3xl p-10 lg:p-14 relative overflow-hidden max-sm:rounded-2xl"
          style={{
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)'
          }}
        >
          {/* Tab Bar */}
          <div className="relative mb-12 flex justify-center">
            <div className="relative flex bg-gray-50 rounded-full p-1.5 max-w-fit">
              {/* Background pill that slides */}
              <div 
                className="absolute h-[calc(100%-12px)] bg-white rounded-full transition-all duration-500 ease-in-out shadow-sm"
                style={{
                  width: `calc(${100 / tabs.length}% - 4px)`,
                  left: '6px',
                  top: '6px',
                  transform: `translateX(calc(${activeTab * 100}% + ${activeTab * 4}px))`
                }}
              />
              
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(index)}
                    className={`relative z-10 flex items-center justify-center space-x-3 px-6 py-3 rounded-full transition-all duration-300 min-w-[140px] ${
                      activeTab === index 
                        ? 'text-gray-900' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium text-sm">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Panel */}
          <div 
            key={activeTab}
            className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center animate-fade-in max-sm:flex max-sm:flex-col"
          >
            {/* Mobile: Image first, then text */}
            <div className="lg:col-span-3 order-first max-sm:order-1">
              <div className="relative">
                <img
                  src={tabs[activeTab].image}
                  alt={tabs[activeTab].title}
                  className="w-full h-auto rounded-2xl shadow-lg object-contain max-sm:max-w-full"
                />
              </div>
            </div>

            {/* Left Column - Text (40%) */}
            <div className="lg:col-span-2 space-y-6 max-sm:order-2">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {tabs[activeTab].title}
              </h3>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {tabs[activeTab].description}
              </p>
              
              <Button
                size="lg"
                className="bg-emerald-bright text-white hover:bg-emerald-bright/90 h-11 px-8 rounded-full font-medium text-base"
              >
                {tabs[activeTab].buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;