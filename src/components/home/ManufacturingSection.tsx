import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const ManufacturingSection: React.FC = () => {
  const { homePageContent } = useCMS();
  const mfg = homePageContent.manufacturing;

  return (
    <section className="bg-brand-light-grey py-20 lg:py-28 border-y border-brand-border-grey">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="badge-yellow mb-3">
            {mfg.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-black tracking-tight">
            {mfg.heading}
          </h2>
          <p className="text-brand-text-grey text-base sm:text-lg mt-3 leading-relaxed">
            {mfg.description}
          </p>
        </div>

        {/* Alternating Editorial Layouts */}
        <div className="space-y-16">
          {mfg.facilities.map((fac, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div 
                key={fac.title}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-6 sm:p-10 border border-brand-border-grey shadow-sm ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Photo Column */}
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative overflow-hidden group">
                    <img 
                      src={fac.image_url} 
                      alt={fac.title}
                      className="w-full h-[300px] sm:h-[380px] object-cover object-center group-hover:scale-102 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-brand-black/90 text-brand-yellow font-heading font-black text-xs px-3 py-1 border-l-2 border-brand-yellow">
                      STAGE 0{idx + 1}
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-black">
                    {fac.title}
                  </h3>
                  <p className="text-brand-text-grey text-sm sm:text-base leading-relaxed">
                    {fac.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    {fac.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-yellow-hover shrink-0" />
                        <span className="text-xs sm:text-sm font-semibold text-brand-black">{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link 
                      to="/manufacturing"
                      className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-brand-black hover:text-brand-yellow-hover"
                    >
                      <span>Explore Facility Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Quality Commitments Strip */}
        <div className="mt-16 bg-brand-black text-white p-8 sm:p-10 border-l-4 border-brand-yellow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mfg.quality_commitments.map((qc, qIdx) => (
              <div key={qIdx} className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                <span className="text-xs text-gray-300 leading-relaxed font-medium">
                  {qc}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
