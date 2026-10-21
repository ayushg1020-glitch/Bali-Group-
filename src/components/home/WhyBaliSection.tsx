import React from 'react';
import { ShieldCheck, Layers, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { SectionEditorialTag, CornerMarks } from '../common/IndustrialGraphics';

export const WhyBaliSection: React.FC = () => {
  const { homePageContent } = useCMS();
  const why = homePageContent.why_bali_group;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-7 h-7 text-brand-black" />;
      case 'Layers': return <Layers className="w-7 h-7 text-brand-black" />;
      case 'Award': return <Award className="w-7 h-7 text-brand-black" />;
      default: return <TrendingUp className="w-7 h-7 text-brand-black" />;
    }
  };

  return (
    <section className="bg-brand-light-grey/60 bg-paper-grain py-20 lg:py-28 border-t border-brand-border-grey relative">
      <div className="container-custom">
        
        {/* Section Editorial Header */}
        <div className="flex justify-center mb-4">
          <SectionEditorialTag 
            number="08" 
            category="CORE ENGINEERING PILLARS" 
            spec="BENCHMARKED INDUSTRIAL INTEGRITY"
          />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-black tracking-tight leading-tight">
            {why.title}
          </h2>
          <p className="text-brand-text-grey text-base sm:text-lg mt-3 leading-relaxed">
            {why.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {why.pillars.map((pillar, idx) => (
            <div 
              key={pillar.title}
              className="relative bg-white p-8 border border-brand-border-grey hover:border-brand-black transition-all duration-300 shadow-sm hover:shadow-premium group flex flex-col justify-between"
            >
              <CornerMarks color="border-gray-200 group-hover:border-brand-yellow transition-colors" />

              <div>
                <div className="w-14 h-14 bg-brand-yellow/15 border-2 border-brand-yellow flex items-center justify-center mb-6 group-hover:bg-brand-yellow transition-colors">
                  {getIcon(pillar.icon)}
                </div>
                
                <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-brand-text-grey">
                  PILLAR 0{idx + 1} // VERIFIED
                </span>

                <h3 className="font-heading font-bold text-lg text-brand-black mt-1.5 mb-3 group-hover:text-brand-yellow-hover transition-colors leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-sm text-brand-text-grey leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs text-brand-black font-semibold font-mono-tech">
                <CheckCircle className="w-3.5 h-3.5 text-brand-yellow-hover shrink-0" />
                <span>Verified Bali Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
