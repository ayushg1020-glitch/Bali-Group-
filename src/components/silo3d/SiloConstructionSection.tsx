import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SiloCanvas } from './SiloCanvas';
import { SiloConstructionSectionContent } from '../../types';
import { ArrowRight, Layers, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { MeasurementRuler, CornerMarks } from '../common/IndustrialGraphics';

gsap.registerPlugin(ScrollTrigger);

interface SiloConstructionSectionProps {
  content?: SiloConstructionSectionContent;
}

export const SiloConstructionSection: React.FC<SiloConstructionSectionProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // If section is explicitly disabled in CMS, do not render
  if (content && content.enabled === false) {
    return null;
  }

  // Fallback content in case props are not yet loaded
  const heading = content?.heading || 'ENGINEERED FROM THE GROUND UP';
  const subheading =
    content?.subheading ||
    'From the first foundation to the final structure, discover the precision behind every Bali Group storage solution.';
  const stages = content?.stages || [];
  const finalHeading = content?.final_heading || 'PRECISION IN EVERY STRUCTURE.';
  const finalSubheading =
    content?.final_subheading ||
    'Engineered for decades of continuous industrial grain protection and maximum return on investment.';
  const ctaBtnText = content?.cta_btn_text || 'Explore Our Solutions';
  const ctaBtnLink = content?.cta_btn_link || '/solutions';

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // GSAP ScrollTrigger setup for scrubbed scroll construction
  useEffect(() => {
    if (isReducedMotion) {
      setProgress(1.0);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReducedMotion]);

  // Determine current active stage (0 to 4)
  const getActiveStageIndex = (p: number): number => {
    if (p < 0.18) return 0;
    if (p < 0.55) return 1;
    if (p < 0.75) return 2;
    if (p < 0.90) return 3;
    return 4;
  };

  const currentStageIndex = getActiveStageIndex(progress);
  const activeStage = stages[currentStageIndex] || stages[0];

  // Helper to jump directly to a stage by scrolling
  const scrollToStage = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const stageTargets = [0.05, 0.35, 0.65, 0.82, 0.95];
    const targetP = stageTargets[index] || 0;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const totalHeight = container.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + targetP * totalHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  // If user prefers reduced motion, render a static, elegant completed showcase
  if (isReducedMotion) {
    return (
      <section className="py-24 bg-[#F8FAFC] border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-yellow/30 text-brand-black border border-brand-yellow/50 uppercase tracking-widest mb-4">
              <Layers className="w-3.5 h-3.5 text-brand-black" />
              Silo Engineering Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-brand-black uppercase tracking-tight mb-4">
              {heading}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">{subheading}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-gray-200">
            <div className="lg:col-span-7 h-[500px] w-full rounded-2xl overflow-hidden bg-[#F8FAFC]">
              <SiloCanvas progress={1.0} isReducedMotion={true} className="w-full h-full" />
            </div>
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest bg-brand-black px-2.5 py-1 rounded">
                  Fully Assembled
                </span>
                <h3 className="text-2xl font-heading font-bold text-brand-black">{finalHeading}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{finalSubheading}</p>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-brand-black">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0" />
                  <span>2.66" Narrow Corrugation & 350–600 GSM Zinc</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-brand-black">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0" />
                  <span>30° Engineered Rafter Roof Truss System</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-brand-black">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow shrink-0" />
                  <span>OSHA/EN-Compliant Safety Caged Ladders</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to={ctaBtnLink}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-yellow text-brand-black font-heading font-bold text-sm tracking-wider uppercase hover:bg-yellow-400 transition-all shadow-md hover:shadow-lg"
                >
                  {ctaBtnText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      id="silo-construction-experience"
      className="relative min-h-[460vh] bg-[#F8FAFC]"
    >
      {/* Pinned / Sticky Viewport Section */}
      <section className="sticky top-0 pt-20 sm:pt-24 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#F8FAFC] bg-blueprint-grid border-y border-gray-200 select-none">
        {/* Subtle Architectural Blueprint Grid Ambient Fade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(248,250,252,0.85)_100%)] pointer-events-none z-0" />

        {/* Top Minimal Navigation & Stage Header */}
        <header className="relative z-20 w-full px-6 sm:px-10 lg:px-14 xl:px-16 pt-3 pb-2 bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent pointer-events-none">
          <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-3 pointer-events-auto">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-yellow/30 text-brand-black border border-brand-yellow/50 uppercase tracking-widest font-mono-tech">
                  <Layers className="w-3 h-3 text-brand-black" />
                  03 / Interactive 3D Engineering
                </span>
                <span className="text-xs text-gray-500 font-mono-tech hidden sm:inline-block">
                  Stage {currentStageIndex + 1} of 5 // REF: CAD-BG2026
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-brand-black uppercase tracking-tight mt-1">
                {heading}
              </h2>
            </div>

            {/* Quick-Jump Stage Pills (Desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-xl border border-gray-200 shadow-sm">
              {['Foundation', 'Wall Rings', '30° Roof', 'Ladder & Cage', 'Inspection'].map(
                (label, idx) => {
                  const isActive = currentStageIndex === idx;
                  return (
                    <button
                      key={label}
                      onClick={() => scrollToStage(idx)}
                      type="button"
                      className={`px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-brand-black text-white shadow-sm'
                          : 'text-gray-600 hover:text-brand-black hover:bg-gray-100'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-brand-yellow' : 'bg-gray-300'
                        }`}
                      />
                      {label}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </header>

        {/* Technical Coordinate Indicators (Desktop) */}
        <div className="absolute right-8 top-28 z-10 hidden xl:flex flex-col items-end text-[10px] font-mono-tech text-gray-400 pointer-events-none space-y-0.5">
          <span>// CAD-ENV: ARCHITECTURAL 36° FOV</span>
          <span>// SILO MODEL: BG-FB-15K COMMERCIAL</span>
          <span>// AXIS: X0.00 Y4.90 Z0.00 [NORMALIZED]</span>
        </div>

        {/* Full-Bleed 3D WebGL Silo Canvas - Dedicated upper zone on mobile so narrative card never overlaps, full bleed on desktop */}
        <div className="relative lg:absolute w-full h-[36vh] sm:h-[42vh] lg:h-auto lg:inset-x-0 lg:bottom-0 lg:top-20 xl:top-24 z-0 pointer-events-auto shrink-0">
          <SiloCanvas
            progress={progress}
            isReducedMotion={false}
            className="w-full h-full"
          />
        </div>

        {/* Floating Narrative Content Area (Left docked on desktop, bottom docked on mobile with ZERO overlap with silo) */}
        <div className="relative z-10 flex-1 w-full px-4 sm:px-8 lg:px-14 xl:px-16 flex items-end lg:items-center justify-center lg:justify-start min-h-0 pointer-events-none pb-1 sm:pb-2 lg:pb-0">
          {/* Left Column: Stage Headings, Engineering Explanations & Specs */}
          <div className="w-full max-w-sm sm:max-w-[360px] lg:max-w-[380px] flex flex-col justify-center pointer-events-auto my-auto space-y-2 sm:space-y-3">
            {progress < 0.9 ? (
              <div
                key={currentStageIndex}
                className="relative bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-5 lg:p-6 border border-gray-200/90 shadow-lg lg:shadow-xl transition-all duration-300 space-y-2 sm:space-y-3.5 group"
              >
                <CornerMarks color="border-gray-300 group-hover:border-brand-yellow/70 transition-colors" />

                {/* Stage Badge & Number */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 sm:gap-2">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-brand-yellow animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                      Phase {activeStage?.number || `0${currentStageIndex + 1}`}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono font-semibold px-2 py-0.5 rounded bg-brand-light-grey text-brand-black border border-gray-200">
                    {Math.round(progress * 100)}% Assembled
                  </span>
                </div>

                {/* Stage Title */}
                <h3 className="text-sm sm:text-lg lg:text-xl font-heading font-bold text-brand-black leading-snug uppercase">
                  {activeStage?.title || 'CONSTRUCTION PHASE'}
                </h3>

                {/* Stage Description */}
                <p className="text-[11px] sm:text-xs lg:text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {activeStage?.description || ''}
                </p>

                {/* Engineering Spec Callout */}
                {activeStage?.spec_label && (
                  <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-[#F8FAFC] border border-gray-200/80">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                      <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-yellow shrink-0" />
                      <span className="text-[9px] sm:text-[10px] font-bold text-gray-700 uppercase tracking-wider">
                        {activeStage.spec_label}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs font-mono text-brand-black font-semibold pl-4 sm:pl-5">
                      {activeStage.spec_value}
                    </p>
                  </div>
                )}

                {/* Integrated Scroll Navigation Cue in Card Footer */}
                <div className="pt-1.5 sm:pt-2.5 border-t border-gray-100 flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-500 font-mono">
                  <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce text-brand-yellow shrink-0" />
                  <span>Scroll down to build • Scroll up to reverse</span>
                </div>
              </div>
            ) : (
              /* Stage 5: Final Commercial Silo Reveal Card */
              <div className="relative bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-6 lg:p-7 border-2 border-brand-yellow shadow-xl lg:shadow-2xl transition-all duration-300 space-y-2 sm:space-y-4 group">
                <CornerMarks color="border-brand-yellow/60 group-hover:border-brand-black transition-colors" />

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-brand-yellow text-brand-black text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                    Structure Complete
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-gray-500">100% Commissioned</span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-xl lg:text-2xl font-heading font-black text-brand-black uppercase tracking-tight mb-1 sm:mb-2">
                    {finalHeading}
                  </h3>
                  <p className="text-[11px] sm:text-xs lg:text-sm text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {finalSubheading}
                  </p>
                </div>

                {/* Stacked / Row CTAs */}
                <div className="flex flex-row sm:flex-col gap-2 pt-1">
                  <Link
                    to={ctaBtnLink}
                    className="flex-1 sm:w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-brand-yellow text-brand-black font-heading font-bold text-xs tracking-wider uppercase hover:bg-yellow-400 transition-all shadow-md hover:shadow-lg"
                  >
                    <span>{ctaBtnText}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Link>
                  <Link
                    to="/contact"
                    className="flex-1 sm:w-full inline-flex items-center justify-center px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-brand-black text-white font-heading font-semibold text-xs tracking-wider uppercase hover:bg-neutral-800 transition-colors"
                  >
                    Get Quote
                  </Link>
                </div>

                {/* Integrated Scroll Navigation Cue in Card Footer */}
                <div className="pt-1.5 sm:pt-2.5 border-t border-gray-100 flex items-center gap-2 text-[10px] sm:text-[11px] text-gray-500 font-mono">
                  <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce text-brand-yellow shrink-0" />
                  <span>Scroll up to reverse assembly inspection</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Interactive Engineering Progress Bar */}
        <footer className="relative z-20 w-full px-4 sm:px-10 lg:px-14 xl:px-16 pb-2.5 sm:pb-4 pt-1 sm:pt-2 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent pointer-events-none">
          <div className="w-full space-y-1.5 pointer-events-auto">
            {/* Fine Measurement Ticks */}
            <MeasurementRuler ticks={48} className="opacity-20" />

            <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
              <span className="font-semibold text-brand-black">0% Ground Foundation</span>
              <span className="hidden sm:inline">25% Wall Rings</span>
              <span className="hidden sm:inline">60% 30° Conical Roof</span>
              <span className="hidden sm:inline">80% Safety Cage</span>
              <span className="font-semibold text-brand-black">100% Fully Built</span>
            </div>

            {/* Progress track */}
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden relative shadow-inner">
              <div
                className="h-full bg-brand-yellow transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                style={{ width: `${Math.max(2, Math.min(100, progress * 100))}%` }}
              />
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
};
