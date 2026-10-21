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
    <section className="relative min-h-[680px] lg:min-h-[820px] bg-neutral-950 flex items-center overflow-hidden">
      {/* Background Silo Photography - Natural lighting, clearly visible, CMS configurable */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.image_url || '/images/silos/flat-bottom1.jpg'} 
          alt="Bali Group Grain Storage Silo Facility"
          className="w-full h-full object-cover object-[center_35%] lg:object-[center_25%] transition-transform duration-1000 ease-out"
          style={{ filter: 'brightness(1.08) contrast(1.03)' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
          }}
        />
        {/* Directional Vignette: protects text readability on left while revealing bright silo photo on center & right */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 45% to-black/15 75% lg:to-transparent pointer-events-none"
        />
        {/* Subtle Top & Bottom Cinematic Edge Vignette */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/50 pointer-events-none"
        />
        {/* Fine Architectural Blueprint CAD Grid (Subtle Texture) */}
        <div 
          className="absolute inset-0 bg-blueprint-grid-dark opacity-15 pointer-events-none [mask-image:radial-gradient(circle_at_center,black_30%,transparent_85%)]"
        />
      </div>

      {/* Engineering Blueprint Corner Registration (Desktop) */}
      <div className="absolute top-6 left-6 w-5 h-5 border-t-2 border-l-2 border-white/30 hidden lg:block pointer-events-none" />
      <div className="absolute top-6 right-6 w-5 h-5 border-t-2 border-r-2 border-white/30 hidden lg:block pointer-events-none" />

      {/* Hero Content Container */}
      <div className="container-custom relative z-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Main Editorial Narrative Column */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-7">
            
            {/* Eyebrow Badge & Technical Spec Readout */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-yellow/15 border-l-2 border-brand-yellow text-brand-yellow text-xs font-mono-tech uppercase tracking-widest backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                {hero.eyebrow}
              </div>
              <span className="text-[10px] font-mono-tech text-gray-300 tracking-wider hidden sm:inline bg-black/40 px-2.5 py-1 border border-white/10 backdrop-blur-xs">
                // SPEC: 2.66" SINE PROFILE • 600 GSM ZINC • ASTM A653
              </span>
            </div>

            {/* Main Headline with High-Impact Typography & Depth */}
            <h1 className="text-4xl sm:text-5xl lg:text-[4.25rem] font-heading font-extrabold text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
              Engineering the Future<br className="hidden sm:inline" /> of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow">Grain Storage</span>.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-200 font-normal leading-relaxed max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {hero.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link 
                to={hero.primary_btn_link || '/solutions'}
                className="px-7 py-3.5 sm:px-8 sm:py-4 bg-brand-yellow text-brand-black hover:bg-yellow-400 font-heading font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-yellow-glow hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
              >
                <span>{hero.primary_btn_text}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link 
                to={hero.secondary_btn_link || '/projects'}
                className="px-7 py-3.5 sm:px-8 sm:py-4 bg-white/10 hover:bg-white text-white hover:text-brand-black border border-white/35 hover:border-white font-heading font-bold text-xs uppercase tracking-wider backdrop-blur-sm hover:-translate-y-0.5 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <span>{hero.secondary_btn_text}</span>
              </Link>

              <button
                onClick={onOpenQuoteModal}
                className="px-5 py-3.5 bg-black/40 hover:bg-brand-yellow text-brand-yellow hover:text-brand-black border border-brand-yellow/50 hover:border-brand-yellow font-heading font-bold text-xs uppercase tracking-wider backdrop-blur-sm transition-all duration-300 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
              >
                <span>Quick Technical RFQ</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Key Technical Specification Cards - Refined Metallic Glass Aesthetic */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-6 border-t border-white/20">
              <div className="relative p-4 bg-black/40 hover:bg-black/60 border border-white/20 hover:border-brand-yellow/80 backdrop-blur-md transition-all duration-300 flex items-center gap-3.5 group min-h-[86px] hover:-translate-y-0.5 shadow-lg">
                <CornerMarks color="border-white/25 group-hover:border-brand-yellow/90" />
                <div className="w-10 h-10 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 group-hover:bg-brand-yellow group-hover:text-brand-black transition-all">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-tight">2.66" Corrugation</p>
                  <p className="text-gray-300 text-[10px] sm:text-[11px] font-mono-tech mt-0.5">Max Hoop Resistance</p>
                </div>
              </div>

              <div className="relative p-4 bg-black/40 hover:bg-black/60 border border-white/20 hover:border-brand-yellow/80 backdrop-blur-md transition-all duration-300 flex items-center gap-3.5 group min-h-[86px] hover:-translate-y-0.5 shadow-lg">
                <CornerMarks color="border-white/25 group-hover:border-brand-yellow/90" />
                <div className="w-10 h-10 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 group-hover:bg-brand-yellow group-hover:text-brand-black transition-all">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-tight">Up to 600 GSM</p>
                  <p className="text-gray-300 text-[10px] sm:text-[11px] font-mono-tech mt-0.5">Heavy Galvanized Steel</p>
                </div>
              </div>

              <div className="relative p-4 bg-black/40 hover:bg-black/60 border border-white/20 hover:border-brand-yellow/80 backdrop-blur-md transition-all duration-300 flex items-center gap-3.5 group min-h-[86px] hover:-translate-y-0.5 shadow-lg">
                <CornerMarks color="border-white/25 group-hover:border-brand-yellow/90" />
                <div className="w-10 h-10 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 group-hover:bg-brand-yellow group-hover:text-brand-black transition-all">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white text-xs sm:text-sm font-heading font-bold uppercase tracking-tight">4.5M+ Tonnes</p>
                  <p className="text-gray-300 text-[10px] sm:text-[11px] font-mono-tech mt-0.5">Across 15+ Nations</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Engineering Matrix HUD Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="relative p-6 sm:p-7 bg-neutral-950/75 backdrop-blur-xl border border-white/20 hover:border-brand-yellow/60 transition-colors duration-500 shadow-2xl space-y-5">
              <CornerMarks color="border-white/35 group-hover:border-brand-yellow/80" />

              <div className="flex items-center justify-between border-b border-white/15 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-yellow animate-ping" />
                  <span className="text-[11px] font-mono-tech uppercase tracking-widest text-brand-yellow font-bold">
                    // ENGINEERING MATRIX
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech text-gray-400 uppercase tracking-wider">
                  BALI-SPEC V4
                </span>
              </div>

              <div className="space-y-3.5 text-xs text-gray-200 font-heading">
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2.5 hover:text-white transition-colors">
                  <span className="text-gray-400">Single Bin Capacity</span>
                  <span className="font-bold text-white text-right">50 MT to 15,000 MT</span>
                </div>
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2.5 hover:text-white transition-colors">
                  <span className="text-gray-400">Terminal Complexes</span>
                  <span className="font-bold text-white text-right">Up to 100,000+ MT</span>
                </div>
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2.5 hover:text-white transition-colors">
                  <span className="text-gray-400">Steel Metallurgy</span>
                  <span className="font-bold text-white text-right">Grade 350 / 450 MPa</span>
                </div>
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2.5 hover:text-white transition-colors">
                  <span className="text-gray-400">Design Standards</span>
                  <span className="font-bold text-white text-right">EN 1991-4 • DIN 1055</span>
                </div>
                <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2.5 hover:text-white transition-colors">
                  <span className="text-gray-400">Wind & Seismic Rating</span>
                  <span className="font-bold text-brand-yellow text-right">Zone IV • 200 km/h</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-gray-400">Galvanization Weight</span>
                  <span className="font-bold text-brand-yellow text-right">Up to 600 g/m² Zinc</span>
                </div>
              </div>

              {/* Matrix Footer Badges */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-tech text-gray-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-yellow" />
                  <span>CHANDIGARH PLANT</span>
                </div>
                <span className="text-gray-400">100% IN-HOUSE EPC</span>
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


