import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, ChevronRight, Layers, Award } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { CornerMarks } from '../common/IndustrialGraphics';

interface HeroSectionProps {
  onOpenQuoteModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuoteModal }) => {
  const { homePageContent } = useCMS();
  const hero = homePageContent.hero;

  return (
    <section className="relative min-h-[620px] lg:min-h-[740px] bg-brand-black flex items-center overflow-hidden">
      {/* Background Silo Photograph with enhanced depth and contrast */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.image_url} 
          alt="Bali Group Grain Storage Silo Facility"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
          }}
        />
        {/* Architectural Vignette & Contrast Overlay - Keeps hero bright while maximizing text legibility */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/80 to-brand-black/35"
          style={{ opacity: Math.max(hero.overlay_opacity || 0.45, 0.4) }}
        />
        {/* Subtle engineering blueprint grid overlay with soft radial fade */}
        <div 
          className="absolute inset-0 bg-blueprint-grid-dark opacity-60 [mask-image:radial-gradient(ellipse_at_30%_50%,black_40%,transparent_90%)]"
        />
      </div>

      {/* Engineering Blueprint Corner Registration (Desktop) */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-white/20 hidden lg:block pointer-events-none" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-white/20 hidden lg:block pointer-events-none" />

      {/* Hero Content Container */}
      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          
          {/* Eyebrow Badge & Technical Spec Readout */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/15 border-l-2 border-brand-yellow text-brand-yellow text-xs font-mono-tech uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              {hero.eyebrow}
            </div>
            <span className="text-[10px] font-mono-tech text-gray-400 tracking-wider hidden sm:inline">
              // SPEC: 2.66" SINE PROFILE • 600 GSM ZINC • ASTM A653
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            {hero.headline}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-normal leading-relaxed mb-10 max-w-2xl">
            {hero.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link 
              to={hero.primary_btn_link || '/solutions'}
              className="btn-primary px-8 py-4 shadow-yellow-glow group flex items-center gap-2"
            >
              <span>{hero.primary_btn_text}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link 
              to={hero.secondary_btn_link || '/projects'}
              className="btn-outline-white px-8 py-4"
            >
              <span>{hero.secondary_btn_text}</span>
            </Link>

            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-heading font-bold text-brand-yellow hover:text-yellow-300 underline underline-offset-4 pl-2 cursor-pointer transition-colors"
            >
              <span>Quick Technical RFQ</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Key Value Badges with Refined Glass/Brushed Aesthetic */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/15">
            <div className="relative p-3.5 bg-white/10 backdrop-blur-sm border border-white/15 group hover:border-brand-yellow/60 transition-colors">
              <CornerMarks color="border-white/20 group-hover:border-brand-yellow/80" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white text-xs font-heading font-bold uppercase tracking-tight">2.66" Corrugation</p>
                  <p className="text-gray-300 text-[10px] font-mono-tech">Max Hoop Resistance</p>
                </div>
              </div>
            </div>

            <div className="relative p-3.5 bg-white/10 backdrop-blur-sm border border-white/15 group hover:border-brand-yellow/60 transition-colors">
              <CornerMarks color="border-white/20 group-hover:border-brand-yellow/80" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white text-xs font-heading font-bold uppercase tracking-tight">Up to 600 GSM</p>
                  <p className="text-gray-300 text-[10px] font-mono-tech">Heavy Galvanized Steel</p>
                </div>
              </div>
            </div>

            <div className="relative p-3.5 bg-white/10 backdrop-blur-sm border border-white/15 group hover:border-brand-yellow/60 transition-colors col-span-2 sm:col-span-1">
              <CornerMarks color="border-white/20 group-hover:border-brand-yellow/80" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white text-xs font-heading font-bold uppercase tracking-tight">4.5M+ Tonnes</p>
                  <p className="text-gray-300 text-[10px] font-mono-tech">Across 15+ Nations</p>
                </div>
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
