import React from 'react';
import { Sparkles, FileText, Globe2, Coins, ShieldCheck, ArrowRight } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}

function Step({ icon, title, description, index, isLast }: StepProps) {
  return (
    <div className="group relative h-full">
      <div className="bg-surface-100 rounded-2xl p-6 border border-surface-200 hover:border-brand-500/30 transition-all duration-500 hover:shadow-xl hover:shadow-brand-500/5 relative z-10 h-full flex">
        <div className="flex gap-5 items-start">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-surface-200 to-surface-300/50 flex items-center justify-center group-hover:scale-110 transition-all duration-500 ease-out shadow-lg border border-surface-300/50 flex-shrink-0">
            <div className="w-5 h-5 text-brand-500">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-surface-900 tracking-tight">{title}</h3>
              {!isLast && (
                <ArrowRight className="w-4 h-4 text-surface-600 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-surface-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
      
      {!isLast && (
        <>
          {/* Horizontal connector (for same row) */}
          <div className={`absolute top-1/2 -right-4 w-8 h-px bg-brand-500 scale-x-0 origin-left 
            transition-transform duration-500 hidden md:block
            ${index % 2 === 0 ? 'group-hover:scale-x-100' : ''}`} 
          />
          
          {/* Vertical connector (for column change) */}
          <div className={`absolute md:left-1/2 md:-bottom-4 md:w-px md:h-8 
            w-px h-8 left-1/2 -bottom-4
            bg-brand-500 scale-y-0 origin-top 
            transition-transform duration-500
            ${index % 2 === 1 ? 'group-hover:scale-y-100' : ''}`}
          />
        </>
      )}
    </div>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: <FileText className="animate-pulse" />,
      title: "Create & Mint",
      description: "Upload your digital content and mint it as an NFT with customizable royalty settings"
    },
    {
      icon: <Globe2 className="animate-pulse" />,
      title: "Enable Features",
      description: "Choose which features to enable, including AI translations, licensing options, and usage rights"
    },
    {
      icon: <Coins />,
      title: "List & Share",
      description: "List your content on the marketplace and share it with a global audience"
    },
    {
      icon: <ShieldCheck />,
      title: "Earn & Track",
      description: "Earn from sales, translations, and usage while tracking your content's performance"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 border-t border-surface-200">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-surface-200/50 border border-surface-300/50 text-surface-700">
            <Sparkles className="w-4 h-4 mr-2 text-brand-500" />
            <span className="text-sm font-semibold">Simple & Secure Process</span>
          </div>
          <h2 className="text-3xl font-bold text-surface-900 mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-base text-surface-700 max-w-2xl mx-auto leading-relaxed">
            Turn your digital content into valuable assets with our streamlined platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
          {steps.map((step, index) => (
            <Step 
              key={step.title} 
              {...step} 
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}