import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, ChevronRight, Layers, Award } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface HeroSectionProps {
  onOpenQuoteModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuoteModal }) => {
  const { homePageContent } = useCMS();
  const hero = homePageContent.hero;

  return (
    <section className="relative min-h-[600px] lg:min-h-[720px] bg-brand-black flex items-center overflow-hidden">
      {/* Background Silo Photograph */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.image_url} 
          alt="Bali Group Grain Storage Silo Facility"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in zoom-in-105 duration-1000"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
          }}
        />
        {/* Architectural Vignette & Contrast Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/75 to-brand-black/40"
          style={{ opacity: Math.max(hero.overlay_opacity || 0.45, 0.4) }}
        />
        {/* Subtle grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10 bg-[radial-gradient(#FACC15_1px,transparent_1px)] [background-size:24px_24px]"
        />
      </div>

      {/* Hero Content Container */}
      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-yellow/15 border-l-4 border-brand-yellow text-brand-yellow text-xs font-heading font-extrabold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
            {hero.eyebrow}
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            {hero.headline}
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-gray-200 font-normal leading-relaxed mb-10 max-w-2xl">
            {hero.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link 
              to={hero.primary_btn_link || '/solutions'}
              className="btn-primary text-sm uppercase tracking-wider font-heading font-bold px-8 py-4 shadow-yellow-glow group flex items-center gap-2"
            >
              <span>{hero.primary_btn_text}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link 
              to={hero.secondary_btn_link || '/projects'}
              className="inline-flex items-center justify-center font-heading font-semibold text-sm tracking-wide px-8 py-4 rounded-none border-2 border-white text-white hover:bg-white hover:text-brand-black transition-all duration-200"
            >
              <span>{hero.secondary_btn_text}</span>
            </Link>

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-1.5 text-sm font-heading font-semibold text-brand-yellow hover:text-yellow-300 underline underline-offset-4 pl-2"
            >
              <span>Quick Technical RFQ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Key Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center text-brand-yellow shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xs font-heading font-bold uppercase">2.66" Corrugation</p>
                <p className="text-gray-400 text-[11px]">Maximum Hoop Resistance</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center text-brand-yellow shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xs font-heading font-bold uppercase">Up to 600 GSM</p>
                <p className="text-gray-400 text-[11px]">Heavy Galvanized Steel</p>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-9 h-9 bg-white/10 border border-white/20 flex items-center justify-center text-brand-yellow shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xs font-heading font-bold uppercase">4.5M+ Tonnes</p>
                <p className="text-gray-400 text-[11px]">Delivered Across 15+ Nations</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Architectural Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-yellow via-yellow-400 to-transparent" />
    </section>
  );
};
