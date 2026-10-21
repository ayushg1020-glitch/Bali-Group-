import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, ChevronRight, Layers, Award } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { CornerMarks } from '../common/IndustrialGraphics';
import { HeroSilo3D } from './HeroSilo3D';

interface HeroSectionProps {
  onOpenQuoteModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuoteModal }) => {
  const { homePageContent } = useCMS();
  const hero = homePageContent.hero;

  return (
    <section className="relative min-h-[680px] lg:min-h-[820px] bg-brand-black flex items-center overflow-hidden">
      {/* Background Silo Architectural Ambience */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.image_url} 
          alt="Bali Group Grain Storage Silo Facility"
          className="w-full h-full object-cover object-center scale-102 opacity-25"
          style={{ filter: 'brightness(1.10) contrast(1.05)' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
          }}
        />
        {/* Directional Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 60% to-brand-black/75"
        />
        {/* Subtle Vertical Vignette */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black/80 pointer-events-none"
        />
        {/* Subtle engineering blueprint grid overlay */}
        <div 
          className="absolute inset-0 bg-blueprint-grid-dark opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)] pointer-events-none"
        />
      </div>

      {/* Engineering Blueprint Corner Registration (Desktop) */}
      <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-white/25 hidden lg:block pointer-events-none" />
      <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-white/25 hidden lg:block pointer-events-none" />

      {/* Hero Content Container - Split Grid Layout */}
      <div className="container-custom relative z-10 py-16 lg:py-22">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Supporting Text, Action CTAs & Key Metrics */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6">
            
            {/* Eyebrow Badge & Technical Spec Readout */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-yellow/15 border-l-2 border-brand-yellow text-brand-yellow text-xs font-mono-tech uppercase tracking-widest backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                {hero.eyebrow}
              </div>
              <span className="text-[10px] font-mono-tech text-gray-300 tracking-wider hidden sm:inline">
                // SPEC: 2.66" SINE PROFILE • 600 GSM ZINC
              </span>
            </div>

            {/* Main Headline with Refined Spacing */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-heading font-extrabold text-white tracking-tight leading-[1.08]">
              Engineering the Future<br className="hidden sm:inline" /> of Grain Storage.
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-normal leading-relaxed max-w-xl">
              {hero.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link 
                to={hero.primary_btn_link || '/solutions'}
                className="px-6 py-3.5 sm:px-7 sm:py-3.5 bg-brand-yellow text-brand-black hover:bg-yellow-400 font-heading font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-yellow-glow hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <span>{hero.primary_btn_text}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link 
                to={hero.secondary_btn_link || '/projects'}
                className="px-6 py-3.5 sm:px-7 sm:py-3.5 bg-white/10 hover:bg-white text-white hover:text-brand-black border border-white/35 hover:border-white font-heading font-bold text-xs uppercase tracking-wider backdrop-blur-xs hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <span>{hero.secondary_btn_text}</span>
              </Link>

              <button
                onClick={onOpenQuoteModal}
                className="px-3.5 py-3 bg-brand-yellow/15 hover:bg-brand-yellow text-brand-yellow hover:text-brand-black border border-brand-yellow/40 hover:border-brand-yellow font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Quick Technical RFQ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Key Technical Specification Cards - Refined Metallic Glass Aesthetic */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/15">
              <div className="relative p-3 bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-brand-yellow/80 backdrop-blur-[2px] transition-all duration-300 flex items-center gap-2.5 group hover:-translate-y-0.5 shadow-sm">
                <CornerMarks color="border-white/20 group-hover:border-brand-yellow/90" />
                <div className="w-8 h-8 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 transition-all">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white text-xs font-heading font-bold uppercase tracking-tight">2.66" Pitch</p>
                  <p className="text-gray-300 text-[10px] font-mono-tech">Max Hoop Strength</p>
                </div>
              </div>

              <div className="relative p-3 bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-brand-yellow/80 backdrop-blur-[2px] transition-all duration-300 flex items-center gap-2.5 group hover:-translate-y-0.5 shadow-sm">
                <CornerMarks color="border-white/20 group-hover:border-brand-yellow/90" />
                <div className="w-8 h-8 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 transition-all">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white text-xs font-heading font-bold uppercase tracking-tight">600 GSM Zinc</p>
                  <p className="text-gray-300 text-[10px] font-mono-tech">Heavy Galvanizing</p>
                </div>
              </div>

              <div className="relative p-3 bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-brand-yellow/80 backdrop-blur-[2px] transition-all duration-300 flex items-center gap-2.5 group hover:-translate-y-0.5 shadow-sm">
                <CornerMarks color="border-white/20 group-hover:border-brand-yellow/90" />
                <div className="w-8 h-8 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 transition-all">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white text-xs font-heading font-bold uppercase tracking-tight">4.5M+ Tonnes</p>
                  <p className="text-gray-300 text-[10px] font-mono-tech">Across 15+ Nations</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Silo Model Stage */}
          <div className="lg:col-span-5 xl:col-span-6 w-full">
            <div className="relative border border-white/20 bg-brand-black/70 backdrop-blur-sm shadow-2xl overflow-hidden group">
              <CornerMarks color="border-white/30 group-hover:border-brand-yellow/80" />
              <HeroSilo3D className="h-[460px] sm:h-[520px] lg:h-[580px]" />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Architectural Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-yellow via-yellow-400 to-transparent" />
    </section>
  );
};

