import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface HeroSectionProps {
  onOpenQuoteModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { homePageContent } = useCMS();
  const hero = homePageContent.hero;

  // Active hero image: CMS configured or genuine reference silo installation
  // If explicitly cleared/removed (''), heroImgSrc is null (removes images)
  const isImageRemoved = hero.image_url === '';
  const heroImgSrc = isImageRemoved 
    ? null 
    : (hero.image_url || '/images/silos/hero-industrial-silos.jpg');

  return (
    <section 
      aria-label="Hero Section"
      className="relative w-full min-h-[640px] lg:h-[720px] xl:h-[760px] bg-[#FFFFFF] overflow-hidden flex flex-col justify-center border-b border-brand-border-grey"
    >
      {/* =========================================================================
          SYMMETRICAL DIAGONAL INDUSTRIAL FRAMING
          Left Image:  Exact same silo asset, inward backslash diagonal (\)
          Right Image: Exact same silo asset, inward forward slash diagonal (/)
          If removed by admin, these blocks are cleanly omitted
          ========================================================================= */}

      {heroImgSrc && (
        <>
          {/* 1. LEFT INDUSTRIAL SILO IMAGE (DESKTOP & LAPTOP >= 960px: INWARD BACKSLASH \) */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-[16vw] lg:w-[18vw] xl:w-[25vw] 2xl:w-[29vw] hidden min-[960px]:block z-0 pointer-events-none select-none"
            aria-hidden="true"
          >
            <div 
              className="relative w-full h-full overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 75% 0, 100% 100%, 0 100%)' }}
            >
              <img 
                src={heroImgSrc}
                alt="Bali Group Grain Silos Installation"
                className="w-full h-full object-cover object-[35%_center] xl:object-[38%_center]"
                style={{ filter: 'brightness(0.98) contrast(1.04)' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                }}
              />
              {/* Subtle ambient gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-brand-black/5" />
            </div>

            {/* Crisp Architectural Brand-Yellow Accent Seam along the diagonal (\) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10" 
              preserveAspectRatio="none" 
              viewBox="0 0 100 100"
            >
              <line 
                x1="75" 
                y1="0" 
                x2="100" 
                y2="100" 
                stroke="#FACC15" 
                strokeWidth="2.5" 
                vectorEffect="non-scaling-stroke" 
              />
            </svg>
          </div>

          {/* 2. RIGHT INDUSTRIAL SILO IMAGE (DESKTOP & LAPTOP >= 960px: INWARD FORWARD SLASH /) */}
          <div 
            className="absolute top-0 right-0 bottom-0 w-[16vw] lg:w-[18vw] xl:w-[25vw] 2xl:w-[29vw] hidden min-[960px]:block z-0 pointer-events-none select-none"
            aria-hidden="true"
          >
            <div 
              className="relative w-full h-full overflow-hidden"
              style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)' }}
            >
              <img 
                src={heroImgSrc}
                alt="Bali Group Grain Silo Facility"
                className="w-full h-full object-cover object-[80%_center] xl:object-[82%_center]"
                style={{ filter: 'brightness(1.02) contrast(1.02)' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                }}
              />
              {/* Subtle ambient gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/25 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-brand-black/5" />
            </div>

            {/* Crisp Architectural Brand-Yellow Accent Seam along the diagonal (/) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-10" 
              preserveAspectRatio="none" 
              viewBox="0 0 100 100"
            >
              <line 
                x1="25" 
                y1="0" 
                x2="0" 
                y2="100" 
                stroke="#FACC15" 
                strokeWidth="2.5" 
                vectorEffect="non-scaling-stroke" 
              />
            </svg>
          </div>
        </>
      )}

      {/* MOBILE & TABLET INDUSTRIAL IMAGE BANNER (< 960px: Clean decorative top banner) */}
      {heroImgSrc && (
        <div 
          className="min-[960px]:hidden relative w-full h-48 sm:h-56 md:h-64 overflow-hidden select-none shrink-0"
          aria-hidden="true"
        >
          <img 
            src={heroImgSrc}
            alt="Bali Group Silos Mobile Preview"
            className="w-full h-full object-cover object-[center_35%]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
          <div className="absolute bottom-0 inset-x-0 h-1 bg-brand-yellow" />
        </div>
      )}

      {/* =========================================================================
          CENTER HERO CONTENT: TRUE HORIZONTAL & VERTICAL CENTERING
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-12 lg:py-16 flex flex-col items-center justify-center text-center">
        
        {/* 1. EYEBROW LABEL */}
        <div className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3.5 py-1.5 bg-neutral-100 border border-neutral-200/90 text-brand-black text-[11px] sm:text-xs font-mono-tech font-extrabold uppercase tracking-[0.24em] select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0" />
          <span>GRAIN STORAGE SOLUTIONS</span>
        </div>

        {/* 2. MAIN HEADLINE */}
        <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[4.25rem] font-heading font-extrabold text-brand-black tracking-tight leading-[1.06] select-text">
          Engineering the<br />
          Future of<br />
          <span className="text-amber-500 inline-block drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
            Grain Storage.
          </span>
        </h1>

        {/* 3. SUPPORTING DESCRIPTION */}
        <p className="mt-5 sm:mt-6 text-neutral-600 text-base sm:text-lg xl:text-xl font-normal leading-relaxed max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto select-text">
          {hero.subheadline || 'Precision-engineered storage, high-throughput material handling, and turnkey industrial installations built for long-term performance and food security.'}
        </p>

        {/* 4. PRIMARY CALL-TO-ACTION BUTTONS */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
          
          {/* PRIMARY: EXPLORE SOLUTIONS */}
          <Link
            to={hero.primary_btn_link || '/solutions'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-yellow text-brand-black hover:bg-yellow-400 font-heading font-bold text-xs uppercase tracking-wider rounded-none transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer shrink-0"
          >
            <span>EXPLORE SOLUTIONS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          {/* SECONDARY: VIEW PROJECTS */}
          <Link
            to={hero.secondary_btn_link || '/projects'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white hover:bg-brand-black text-brand-black hover:text-white border-2 border-brand-black font-heading font-bold text-xs uppercase tracking-wider rounded-none transition-all duration-200 shadow-xs hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer shrink-0"
          >
            <span>VIEW PROJECTS</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

        </div>

      </div>
    </section>
  );
};
