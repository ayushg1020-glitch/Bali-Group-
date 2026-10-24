import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { CornerMarks, MeasurementRuler } from '../common/IndustrialGraphics';

export const EngineeringIntroSection: React.FC = () => {
  const { homePageContent } = useCMS();
  const intro = homePageContent.engineering_intro || {
    label: 'BUILT ON PRECISION. DRIVEN BY ENGINEERING.',
    heading: 'More Than Storage. Engineering Confidence.',
    description: "Discover the engineering expertise, manufacturing precision and integrated solutions behind Bali Group's grain storage infrastructure.",
    image_url: '/images/silos/flat-bottom2.jpg',
    cta_text: 'Discover Our Engineering Legacy',
    cta_link: '/about',
    highlights: [
      '2.66" sine corrugation profile maximizing hoop strength',
      '350–600 GSM heavy galvanization for superior corrosion resistance',
      'Turnkey EPC execution from foundation to SCADA automation',
    ],
  };

  const hasIntroImage = Boolean(intro.image_url && intro.image_url.trim() !== '');

  return (
    <section className="bg-white bg-paper-grain relative overflow-hidden py-16 lg:py-24 border-b border-brand-border-grey">
      {/* Subtle Blueprint Grid Accent */}
      <div 
        className="absolute inset-0 bg-blueprint-grid opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_top_right,black_30%,transparent_80%)]" 
      />

      {/* Decorative Technical Top Rule */}
      <div className="container-custom relative z-10 mb-8">
        <div className="flex items-center gap-4 text-[10px] font-mono-tech text-gray-400 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-brand-yellow shrink-0" />
          <span>EDITORIAL INTRO // REF: AISC 360 & EN 1991-4</span>
          <div className="flex-1 h-px bg-brand-border-grey hidden sm:block" />
          <span className="hidden md:inline">// ESTABLISHED 1993</span>
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className={`grid grid-cols-1 ${hasIntroImage ? 'lg:grid-cols-12 gap-12 lg:gap-16' : 'max-w-4xl'} items-center`}>
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className={hasIntroImage ? "lg:col-span-6 space-y-6" : "space-y-6"}>
            
            {/* Small Label with Glowing Yellow Detail */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-brand-yellow/15 border-l-2 border-brand-yellow text-brand-black text-[11px] font-mono-tech font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow animate-pulse" />
              <span>{intro.label}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-black tracking-tight leading-[1.12]">
              {intro.heading}
            </h2>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-brand-text-grey font-normal leading-relaxed">
              {intro.description}
            </p>

            {/* Key Engineering Highlights */}
            {intro.highlights && intro.highlights.length > 0 && (
              <div className="space-y-3 pt-2">
                {intro.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 group">
                    <span className="w-5 h-5 rounded-none bg-brand-yellow/20 border border-brand-yellow text-brand-black flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-brand-black" />
                    </span>
                    <span className="text-xs sm:text-sm font-heading font-medium text-brand-black leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link 
                to={intro.cta_link || '/about'}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-brand-black text-white hover:bg-neutral-800 font-heading font-bold text-xs uppercase tracking-wider group transition-all duration-300 border-l-4 border-brand-yellow shadow-sm hover:shadow-premium"
              >
                <span>{intro.cta_text || 'Discover Our Engineering Legacy'}</span>
                <ArrowRight className="w-4 h-4 text-brand-yellow transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

          {/* Right Column: Genuine Installation Photography Showcase */}
          {hasIntroImage && (
            <div className="lg:col-span-6 relative">
            <div className="relative border-2 border-brand-border-grey group overflow-hidden shadow-premium bg-white">
              <CornerMarks color="border-gray-300 group-hover:border-brand-yellow transition-colors" />
              
              <img 
                src={intro.image_url} 
                alt="Bali Group Grain Silo Engineering Installation"
                className="w-full h-[360px] sm:h-[440px] object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/silos/flat-bottom2.jpg';
                }}
              />

              {/* Technical Overlay Tag */}
              <div className="absolute top-4 left-4 bg-brand-black/90 text-white px-3 py-1.5 text-[10px] font-mono-tech uppercase tracking-wider border-l-2 border-brand-yellow z-20 backdrop-blur-xs">
                // CERTIFIED GRAIN TERMINAL INSTALLATION
              </div>

              {/* Bottom Inset Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-black/85 via-brand-black/50 to-transparent p-4 z-20">
                <p className="text-white text-xs font-heading font-bold uppercase tracking-wide">
                  High-Throughput Turnkey Commercial Grain Terminal
                </p>
                <p className="text-[10px] text-gray-300 font-mono-tech mt-0.5">
                  Galvanized Corrugated Sidewalls • High-Tensile Steel Grade 350/450 MPa
                </p>
              </div>
            </div>

            {/* Subtle Drafting Ticks Below */}
            <div className="mt-3 hidden sm:block">
              <MeasurementRuler ticks={20} className="opacity-25" />
            </div>
          </div>
          )}

        </div>
      </div>
    </section>
  );
};
