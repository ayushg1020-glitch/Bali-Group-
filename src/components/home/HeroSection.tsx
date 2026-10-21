import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Award, 
  ChevronDown, 
  HardHat, 
  CheckCircle2, 
  Wind 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { CornerMarks } from '../common/IndustrialGraphics';

interface HeroSectionProps {
  onOpenQuoteModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuoteModal }) => {
  const { homePageContent } = useCMS();
  const hero = homePageContent.hero;

  const scrollToNextSection = () => {
    const nextElem = document.getElementById('editorial-intro') || document.querySelector('section:nth-of-type(2)');
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 650, behavior: 'smooth' });
    }
  };

  // Determine active hero image (CMS configured or high-impact reference facility)
  const heroImgSrc = hero.image_url && hero.image_url !== '/images/silos/flat-bottom1.jpg' 
    ? hero.image_url 
    : '/images/silos/hero-industrial-silos.jpg';

  return (
    <section 
      aria-label="Hero Section"
      className="relative w-full min-h-[660px] lg:h-[720px] xl:h-[750px] bg-[#FFFFFF] overflow-hidden flex flex-col justify-between"
    >
      {/* =========================================================================
          BACKGROUND LAYER: TWO-ZONE COMPOSITION
          Left: Pure White + Engineering Blueprint Grid
          Right: Large Silo Facility Photography with Angled Diagonal Transition
          ========================================================================= */}
      
      {/* LEFT ZONE: Engineering Blueprint Graphics */}
      <div className="absolute inset-0 z-0 bg-[#FFFFFF]">
        {/* Subtle Architectural Blueprint Grid */}
        <div className="absolute inset-0 bg-blueprint-grid opacity-55 pointer-events-none" />

        {/* Faint Architectural Silo CAD Wireframe Watermark */}
        <svg 
          className="absolute left-[-20px] bottom-[-10px] w-[500px] h-[500px] text-neutral-900 opacity-[0.035] pointer-events-none hidden lg:block"
          viewBox="0 0 400 400" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.2"
        >
          <rect x="80" y="140" width="240" height="230" rx="4" />
          <path d="M 80 140 L 200 40 L 320 140 Z" />
          <path d="M 120 140 L 200 40 L 280 140" strokeDasharray="4 4" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1="80" y1={170 + i * 22} x2="320" y2={170 + i * 22} />
          ))}
          <line x1="130" y1="140" x2="130" y2="370" strokeWidth="2" />
          <line x1="180" y1="140" x2="180" y2="370" strokeWidth="2" />
          <line x1="220" y1="140" x2="220" y2="370" strokeWidth="2" />
          <line x1="270" y1="140" x2="270" y2="370" strokeWidth="2" />
          <line x1="200" y1="90" x2="200" y2="370" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="200" cy="40" r="12" stroke="currentColor" />
        </svg>

        {/* Thin Architectural Yellow Accent Line on Left Margin */}
        <div className="absolute top-1/4 left-0 w-1.5 h-16 bg-brand-yellow hidden lg:block" />
      </div>

      {/* RIGHT ZONE: Large Cinematic Silo Facility Photograph with Angled Transition */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-full lg:w-[54%] xl:w-[53%] z-0 overflow-hidden lg:[clip-path:polygon(20%_0,100%_0,100%_100%,0%_100%)] pointer-events-none drop-shadow-xl"
      >
        <img 
          src={heroImgSrc}
          alt="Bali Group Grain Storage Silo Facility"
          className="w-full h-full object-cover object-[center_35%] lg:object-[center_28%] transition-transform duration-1000 ease-out"
          style={{ filter: 'brightness(1.02) contrast(1.02)' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
          }}
        />

        {/* Soft Ambient Bleed on the Angled Edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/10 hidden lg:block" />

        {/* Mobile/Tablet Overlay: Solid white on top half smoothly revealing photo at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 55% to-white/30 lg:hidden" />
      </div>

      {/* =========================================================================
          MAIN HERO CONTENT (UPPER/MIDDLE)
          ========================================================================= */}
      <div className="container-custom relative z-10 w-full pt-10 sm:pt-14 lg:pt-16 pb-4 sm:pb-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT EDITORIAL COLUMN (~46-50% width on Desktop) */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-5 sm:space-y-6">
            
            {/* 1. SECTION NUMBER AND EYEBROW */}
            <div className="flex items-start gap-3.5">
              {/* "01" with Thin Vertical Yellow Line */}
              <div className="flex flex-col items-center select-none pt-0.5">
                <span className="text-sm font-extrabold font-heading text-brand-black tracking-wider leading-none">
                  01
                </span>
                <div className="w-[2px] h-5 bg-brand-yellow mt-1.5" />
              </div>

              {/* "GRAIN STORAGE SOLUTIONS" with Thin Yellow Underline */}
              <div className="pt-0.5">
                <span className="text-xs font-heading font-extrabold text-brand-black uppercase tracking-[0.2em] border-b-2 border-brand-yellow pb-0.5 inline-block">
                  GRAIN STORAGE SOLUTIONS
                </span>
              </div>
            </div>

            {/* 2. MAIN HEADLINE */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[4.1rem] font-heading font-extrabold text-brand-black tracking-tight leading-[1.04]">
              Engineering the<br />
              Future of<br />
              <span className="text-amber-500 inline-block drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                Grain Storage.
              </span>
            </h1>

            {/* 3. SUPPORTING DESCRIPTION */}
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-[500px] font-normal">
              {hero.subheadline || 'Precision-engineered storage, high-throughput material handling, and turnkey industrial installations built for long-term performance and food security.'}
            </p>

            {/* 4. THREE CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 pt-1">
              
              {/* PRIMARY: EXPLORE SOLUTIONS → */}
              <Link
                to={hero.primary_btn_link || '/solutions'}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 bg-brand-yellow text-brand-black hover:bg-yellow-400 font-heading font-bold text-xs uppercase tracking-wider rounded-none transition-all duration-300 group cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 shrink-0"
              >
                <span>EXPLORE SOLUTIONS</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {/* SECONDARY: VIEW PROJECTS → */}
              <Link
                to={hero.secondary_btn_link || '/projects'}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 bg-white hover:bg-brand-black text-brand-black hover:text-white border-2 border-brand-black font-heading font-bold text-xs uppercase tracking-wider rounded-none transition-all duration-300 cursor-pointer shadow-xs hover:-translate-y-0.5 active:translate-y-0 shrink-0"
              >
                <span>VIEW PROJECTS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* TERTIARY: QUICK TECHNICAL RFQ → */}
              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-1.5 py-2 px-1 text-brand-black hover:text-neutral-800 font-heading font-bold text-xs uppercase tracking-wider border-b-2 border-brand-yellow hover:border-brand-black transition-all duration-200 group cursor-pointer shrink-0"
              >
                <span>QUICK TECHNICAL RFQ</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

            </div>

          </div>

          {/* RIGHT COLUMN (DESKTOP): FLOATING TECHNICAL PANEL */}
          <div className="lg:col-span-5 xl:col-span-6 relative hidden lg:flex justify-end items-center pr-2 xl:pr-6">
            
            <aside 
              aria-label="Technical Highlights"
              className="relative w-[300px] xl:w-[325px] bg-[#1A1A1A] text-white border border-neutral-700/80 shadow-2xl p-5 sm:p-6 group select-text"
            >
              <CornerMarks color="border-neutral-600 group-hover:border-brand-yellow transition-colors" />

              {/* Panel Header */}
              <div className="flex items-center justify-between border-b border-neutral-700/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                  <span className="text-[11px] font-mono-tech uppercase tracking-widest text-brand-yellow font-bold">
                    // TECHNICAL HIGHLIGHTS
                  </span>
                </div>
                <span className="text-[9px] font-mono-tech text-neutral-400 uppercase tracking-widest">
                  BALI-SPEC
                </span>
              </div>

              {/* Three Highlighted Technical Attributes */}
              <div className="space-y-3.5">
                
                {/* 1. Corrugation Specification */}
                <div className="flex items-start gap-3 border-b border-neutral-800 pb-3">
                  <div className="w-8 h-8 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-heading font-bold uppercase tracking-tight">
                      2.66" SINE PROFILE
                    </p>
                    <p className="text-neutral-400 text-[11px] font-mono-tech mt-0.5 leading-snug">
                      Max Hoop Stress Resistance
                    </p>
                  </div>
                </div>

                {/* 2. Galvanized Steel Specification */}
                <div className="flex items-start gap-3 border-b border-neutral-800 pb-3">
                  <div className="w-8 h-8 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-heading font-bold uppercase tracking-tight">
                      UP TO 600 GSM
                    </p>
                    <p className="text-neutral-400 text-[11px] font-mono-tech mt-0.5 leading-snug">
                      Heavy Zinc Coating ASTM A653
                    </p>
                  </div>
                </div>

                {/* 3. Installed Storage Capacity */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0 group-hover:scale-105 transition-transform">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-heading font-bold uppercase tracking-tight">
                      4.5M+ TONNES
                    </p>
                    <p className="text-neutral-400 text-[11px] font-mono-tech mt-0.5 leading-snug">
                      Installed Global Storage Capacity
                    </p>
                  </div>
                </div>

              </div>

              {/* Panel Footer */}
              <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[10px] font-mono-tech text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-yellow" />
                  CHANDIGARH FACILITY
                </span>
                <span className="text-brand-yellow font-bold">100% IN-HOUSE EPC</span>
              </div>
            </aside>

          </div>

        </div>
      </div>

      {/* =========================================================================
          LOWER SECTION: BOTTOM TECHNICAL SPECIFICATION STRIP & SCROLL INDICATOR
          ========================================================================= */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-stretch lg:items-end justify-between gap-4">
          
          {/* THE DISTINCTIVE BLACK ANGULAR SPECIFICATION STRIP */}
          <div 
            className="w-full lg:w-[66%] xl:w-[62%] bg-[#111111] text-white border-t-2 border-brand-yellow shadow-2xl py-3.5 px-5 sm:px-6 lg:px-8 lg:[clip-path:polygon(0_0,calc(100%-34px)_0,100%_100%,0_100%)] select-text"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800">
              
              {/* Column 1: Metallurgy */}
              <div className="flex items-center gap-3 pt-2 sm:pt-0">
                <div className="w-8 h-8 rounded-none bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0">
                  <HardHat className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white text-xs font-heading font-extrabold tracking-tight uppercase">
                    GRADE 350 / 450 MPa
                  </p>
                  <p className="text-neutral-400 text-[10px] sm:text-[11px] font-mono-tech mt-0.5">
                    High-Tensile Structural Steel
                  </p>
                </div>
              </div>

              {/* Column 2: Compliance */}
              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-5">
                <div className="w-8 h-8 rounded-none bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-white text-xs font-heading font-extrabold tracking-tight uppercase">
                    EN 1991-4 • DIN 1055
                  </p>
                  <p className="text-neutral-400 text-[10px] sm:text-[11px] font-mono-tech mt-0.5">
                    Eurocode & Global Standards
                  </p>
                </div>
              </div>

              {/* Column 3: Wind & Seismic */}
              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-5">
                <div className="w-8 h-8 rounded-none bg-brand-yellow/15 border border-brand-yellow/40 flex items-center justify-center text-brand-yellow shrink-0">
                  <Wind className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-brand-yellow text-xs font-heading font-extrabold tracking-tight uppercase">
                    ZONE IV • 200 KM/H
                  </p>
                  <p className="text-neutral-400 text-[10px] sm:text-[11px] font-mono-tech mt-0.5">
                    Seismic & Wind Resistance
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* MINIMAL SCROLL DOWN INDICATOR */}
          <button
            onClick={scrollToNextSection}
            className="hidden lg:inline-flex items-center gap-2.5 pb-3 text-neutral-400 hover:text-brand-black transition-colors duration-200 group cursor-pointer"
            aria-label="Scroll down to next section"
          >
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] font-semibold group-hover:text-brand-black">
              SCROLL DOWN
            </span>
            <div className="w-6 h-6 rounded-full border border-neutral-400/80 group-hover:border-brand-black flex items-center justify-center transition-all group-hover:translate-y-0.5">
              <ChevronDown className="w-3.5 h-3.5 text-brand-yellow group-hover:text-brand-black animate-bounce" />
            </div>
          </button>

        </div>
      </div>

      {/* Hairline Architectural Bottom Border */}
      <div className="w-full h-px bg-neutral-200/80" />
    </section>
  );
};
