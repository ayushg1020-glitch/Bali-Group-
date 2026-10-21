import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { SectionEditorialTag, CornerMarks } from '../common/IndustrialGraphics';

export const StatsSection: React.FC = () => {
  const { homePageContent } = useCMS();
  const stats = homePageContent.stats || [];

  return (
    <section className="bg-brand-light-grey/60 bg-blueprint-grid py-14 lg:py-18 border-b border-brand-border-grey relative overflow-hidden">
      <div className="container-custom relative z-10">
        
        {/* Editorial Section Header */}
        <SectionEditorialTag 
          number="01" 
          category="GLOBAL CAPACITY & SCALE" 
          spec="ANNUAL RUN-RATE // AUDITED"
          className="mb-8"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((item, idx) => (
              <div 
                key={item.id || idx} 
                className="relative bg-white p-6 sm:p-7 border border-brand-border-grey group hover:border-brand-black transition-all duration-300 shadow-sm hover:shadow-premium"
              >
                <CornerMarks color="border-gray-200 group-hover:border-brand-yellow transition-colors" />

                {/* Index marker */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono-tech text-[10px] text-gray-400 uppercase tracking-widest">
                    METRIC // 0{idx + 1}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                </div>

                <div className="flex items-baseline gap-1.5 mb-2">
                  <span className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-5xl text-brand-black tracking-tight">
                    {item.number}
                  </span>
                  <span className="font-heading font-bold text-2xl sm:text-3xl text-brand-yellow-hover">
                    {item.suffix}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-sm text-brand-black uppercase tracking-wider mb-1">
                  {item.label}
                </h4>

                <p className="text-xs text-brand-text-grey font-normal leading-relaxed">
                  {item.subtext}
                </p>

                {/* Bottom subtle accent bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent group-hover:bg-brand-yellow transition-colors" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
