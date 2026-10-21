import React from 'react';
import { useCMS } from '../../context/CMSContext';

export const StatsSection: React.FC = () => {
  const { homePageContent } = useCMS();
  const stats = homePageContent.stats || [];

  return (
    <section className="bg-white py-12 lg:py-16 border-b border-brand-border-grey relative">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((item, idx) => (
              <div 
                key={item.id || idx} 
                className="relative pl-6 border-l-4 border-brand-yellow group hover:translate-x-1 transition-transform duration-200"
              >
                <div className="flex items-baseline gap-1">
                  <span className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-black tracking-tight">
                    {item.number}
                  </span>
                  <span className="font-heading font-bold text-2xl sm:text-3xl text-brand-yellow-hover">
                    {item.suffix}
                  </span>
                </div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-brand-black uppercase tracking-wider mt-2">
                  {item.label}
                </h4>
                <p className="text-xs sm:text-sm text-brand-text-grey mt-1 font-normal">
                  {item.subtext}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};
