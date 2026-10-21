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
    <section className="relative min-h-[640px] lg:min-h-[760px] bg-brand-black flex items-center overflow-hidden">
      {/* Background Silo Photograph with enhanced brightness, depth, and contrast */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.image_url} 
          alt="Bali Group Grain Storage Silo Facility"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
          style={{ filter: 'brightness(1.10) contrast(1.05)' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
          }}
        />
        {/* Directional Gradient Overlay - Keeps text ultra-readable on left while leaving silo photography bright on right */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-brand-black/92 via-brand-black/65 50% to-brand-black/20 85% lg:to-transparent"
        />
        {/* Subtle Vertical Vignette to anchor top navbar and bottom transition */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black/50 pointer-events-none"
        />
        {/* Subtle engineering blueprint grid overlay with soft radial fade */}
        <div 
          className="absolute inset-0 bg-blueprint-grid-dark opacity-40 [mask-image:radial-gradient(ellipse_at_25%_50%,black_35%,transparent_85%)] pointer-events-none"
        />
      </div>

      {/* Engineering Blueprint Corner Registration (Desktop) */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-white/25 hidden lg:block pointer-events-none" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-white/25 hidden lg:block pointer-events-none" />

      {/* Hero Content Container */}
      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          
          {/* Eyebrow Badge & Technical Spec Readout */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/15 border-l-2 border-brand-yellow text-brand-yellow text-xs font-mono-tech uppercase tracking-widest backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
              {hero.eyebrow}
            </div>
            <span className="text-[10px] font-mono-tech text-gray-300 tracking-wider hidden sm:inline">
              // SPEC: 2.66" SINE PROFILE • 600 GSM ZINC • ASTM A653
            </span>
          </div>

          {/* Main Headline with Refined Spacing */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.85rem] font-heading font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            Engineering the Future<br className="hidden sm:inline" /> of Grain Storage.
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-normal leading-relaxed mb-10 max-w-2xl">
            {hero.subheadline}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Link 
              to={hero.primary_btn_link || '/solutions'}
              className="px-7 py-3.5 sm:px-8 sm:py-4 bg-brand-yellow text-brand-black hover:bg-yellow-400 font-heading font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-yellow-glow hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>{hero.primary_btn_text}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link 
              to={hero.secondary_btn_link || '/projects'}
              className="px-7 py-3.5 sm:px-8 sm:py-4 bg-white/10 hover:bg-white text-white hover:text-brand-black border border-white/35 hover:border-white font-heading font-bold text-xs uppercase tracking-wider backdrop-blur-xs hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
            >
              <span>{hero.secondary_btn_text}</span>
            </Link>

            <button
              onClick={onOpenQuoteModal}
              className="px-4 py-3 bg-brand-yellow/15 hover:bg-brand-yellow text-brand-yellow hover:text-brand-black border border-brand-yellow/40 hover:border-brand-yellow font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
            >
              <span>Quick Technical RFQ</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Key Technical Specification Cards - Refined Metallic Glass Aesthetic */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-white/20">
            <div className="relative p-3.5 sm:p-4 bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-brand-yellow/80 backdrop-blur-[2px] transition-all duration-300 flex items-center gap-3.5 group min-h-[82px] hover:-translate-y-0.5 shadow-sm">
              <CornerMarks color="border-white/25 group-hover:border-brand-yellow/90" />
              <div className="w-10 h-10 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 group-hover:border-brand-yellow transition-all">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-tight">2.66" Corrugation</p>
                <p className="text-gray-300 text-[10px] sm:text-[11px] font-mono-tech mt-0.5">Max Hoop Resistance</p>
              </div>
            </div>

            <div className="relative p-3.5 sm:p-4 bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-brand-yellow/80 backdrop-blur-[2px] transition-all duration-300 flex items-center gap-3.5 group min-h-[82px] hover:-translate-y-0.5 shadow-sm">
              <CornerMarks color="border-white/25 group-hover:border-brand-yellow/90" />
              <div className="w-10 h-10 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 group-hover:border-brand-yellow transition-all">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-tight">Up to 600 GSM</p>
                <p className="text-gray-300 text-[10px] sm:text-[11px] font-mono-tech mt-0.5">Heavy Galvanized Steel</p>
              </div>
            </div>

            <div className="relative p-3.5 sm:p-4 bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-brand-yellow/80 backdrop-blur-[2px] transition-all duration-300 flex items-center gap-3.5 group min-h-[82px] hover:-translate-y-0.5 shadow-sm">
              <CornerMarks color="border-white/25 group-hover:border-brand-yellow/90" />
              <div className="w-10 h-10 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 group-hover:border-brand-yellow transition-all">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-tight">4.5M+ Tonnes</p>
                <p className="text-gray-300 text-[10px] sm:text-[11px] font-mono-tech mt-0.5">Across 15+ Nations</p>
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
