import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Award, Cpu } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { SectionEditorialTag, CornerMarks } from '../common/IndustrialGraphics';

export const AboutSection: React.FC = () => {
  const { homePageContent } = useCMS();
  const about = homePageContent.about;

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden relative">
      <div className="container-custom">
        
        {/* Editorial Section Header */}
        <SectionEditorialTag 
          number="02" 
          category="HERITAGE & PARTNERSHIP" 
          spec="EST. 1993 // JAPANESE TECHNICAL COLLABORATION"
          className="mb-10"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Image with Technical Inset Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 border border-brand-border-grey shadow-premium group overflow-hidden">
              <CornerMarks color="border-gray-300 group-hover:border-brand-yellow transition-colors" />
              <img 
                src={about.image_url} 
                alt="Bali Group Grain Storage Silos Manufacturing"
                className="w-full h-[400px] sm:h-[520px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                }}
              />
              {/* Subtle yellow architectural accent box */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-yellow/15 -z-10 hidden sm:block" />
            </div>

            {/* Overlaid Experience Seal */}
            <div className="absolute -top-5 -left-5 bg-brand-black text-white p-6 border-b-4 border-brand-yellow shadow-2xl hidden sm:block z-20">
              <span className="font-heading font-extrabold text-3xl text-brand-yellow block tracking-tight">25+</span>
              <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-gray-300 block mt-1">
                Years of Continuous<br />Engineering Legacy
              </span>
            </div>

            {/* Inset verified fact strip */}
            <div className="mt-4 p-4 bg-brand-light-grey/80 border-l-4 border-brand-yellow flex items-center justify-between border-y border-r border-brand-border-grey">
              <div>
                <p className="text-xs font-heading font-bold text-brand-black uppercase tracking-tight">First Japanese Collaboration</p>
                <p className="text-xs text-brand-text-grey font-mono-tech">June 9, 1993 — Infusing Japanese Quality Standards</p>
              </div>
              <Award className="w-5 h-5 text-brand-yellow-hover shrink-0" />
            </div>
          </div>

          {/* Right Column: Heading, Description & Highlights */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="badge-yellow">
              {about.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-black leading-tight tracking-tight">
              {about.heading}
            </h2>

            <p className="text-base sm:text-lg text-brand-black font-semibold">
              {about.subheading}
            </p>

            <div className="space-y-4 text-brand-text-grey text-sm sm:text-base leading-relaxed">
              {about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Engineering Highlights Grid */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.highlights?.map((hl, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-yellow-hover shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-brand-black">{hl}</span>
                </div>
              ))}
            </div>

            {/* Call to Action Button */}
            <div className="pt-4 flex items-center gap-4">
              <Link 
                to={about.cta_link || '/about'}
                className="btn-primary text-xs uppercase tracking-wider font-heading font-bold px-8 py-4 shadow-sm group flex items-center gap-2"
              >
                <span>{about.cta_text}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link 
                to="/engineering"
                className="btn-secondary text-xs uppercase tracking-wider font-heading font-bold px-6 py-4"
              >
                Engineering Standards
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
