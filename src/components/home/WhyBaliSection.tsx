import React from 'react';
import { ShieldCheck, Layers, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const WhyBaliSection: React.FC = () => {
  const { homePageContent } = useCMS();
  const why = homePageContent.why_bali_group;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-8 h-8 text-brand-black" />;
      case 'Layers': return <Layers className="w-8 h-8 text-brand-black" />;
      case 'Award': return <Award className="w-8 h-8 text-brand-black" />;
      default: return <TrendingUp className="w-8 h-8 text-brand-black" />;
    }
  };

  return (
    <section className="bg-brand-light-grey py-20 lg:py-28 border-t border-brand-border-grey">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-yellow mb-3 inline-flex">
            {why.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-black tracking-tight">
            {why.title}
          </h2>
          <p className="text-brand-text-grey text-base sm:text-lg mt-3">
            {why.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {why.pillars.map((pillar, idx) => (
            <div 
              key={pillar.title}
              className="bg-white p-8 border border-brand-border-grey hover:border-brand-black transition-all duration-300 shadow-sm hover:shadow-premium group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-brand-yellow/20 border-2 border-brand-yellow flex items-center justify-center mb-6 group-hover:bg-brand-yellow transition-colors">
                  {getIcon(pillar.icon)}
                </div>
                
                <span className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-brand-text-grey">
                  PILLAR 0{idx + 1}
                </span>

                <h3 className="font-heading font-bold text-lg text-brand-black mt-1 mb-3 group-hover:text-brand-yellow-hover transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-brand-text-grey leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs text-brand-black font-semibold">
                <CheckCircle className="w-3.5 h-3.5 text-brand-yellow-hover" />
                <span>Verified Bali Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
