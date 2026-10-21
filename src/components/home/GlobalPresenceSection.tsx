import React from 'react';
import { Globe, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const GlobalPresenceSection: React.FC = () => {
  const { homePageContent } = useCMS();
  const gp = homePageContent.global_presence;

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="badge-yellow mb-3">
            VERIFIED FOOTPRINT
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-black tracking-tight">
            {gp.heading}
          </h2>
          <p className="text-brand-text-grey text-base sm:text-lg mt-3 leading-relaxed">
            {gp.description}
          </p>
        </div>

        {/* Global Map Display with Verified Nodes */}
        <div className="bg-brand-light-grey border border-brand-border-grey p-8 sm:p-12 mb-12 relative overflow-hidden">
          
          {/* Subtle stylized SVG world map background */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 rounded-full bg-brand-yellow/20 border-2 border-brand-yellow flex items-center justify-center text-brand-black mb-4">
              <Globe className="w-8 h-8 text-brand-yellow-hover" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-black">
              15+ Countries & Growing
            </h3>
            <p className="text-sm text-brand-text-grey max-w-xl mt-2">
              Our turnkey grain silos, grain-handling elevators, and high-performance distilleries safeguard millions of metric tonnes across continents.
            </p>
          </div>

          {/* Country Badges Cloud */}
          <div className="relative z-10 mt-8 pt-6 border-t border-brand-border-grey flex flex-wrap justify-center gap-2 sm:gap-3">
            {gp.countries_list.map((country) => (
              <span 
                key={country}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-brand-border-grey text-brand-black text-xs font-heading font-bold shadow-2xs hover:border-brand-black transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                {country}
              </span>
            ))}
          </div>

        </div>

        {/* Regional Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gp.key_regions.map((reg) => (
            <div 
              key={reg.name}
              className="bg-white p-6 border-t-4 border-brand-yellow border-x border-b border-brand-border-grey shadow-sm hover:shadow-premium transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading font-bold text-base text-brand-black">
                  {reg.name}
                </h4>
                <span className="text-xs font-heading font-black bg-brand-yellow/20 px-2 py-0.5 text-brand-black">
                  {reg.installations}+ Sites
                </span>
              </div>
              <p className="text-xs text-brand-text-grey leading-relaxed">
                {reg.projects_summary}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
