import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, ShieldCheck, Clock } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { SectionEditorialTag, CornerMarks } from '../common/IndustrialGraphics';

interface EnquiryCTASectionProps {
  onOpenQuoteModal?: () => void;
}

export const EnquiryCTASection: React.FC<EnquiryCTASectionProps> = ({ onOpenQuoteModal }) => {
  const { homePageContent, companySettings } = useCMS();
  const cta = homePageContent.enquiry_cta;

  return (
    <section className="bg-brand-black text-white py-20 lg:py-24 relative overflow-hidden border-t-4 border-brand-yellow">
      {/* Background architectural CAD grid with subtle fade */}
      <div className="absolute inset-0 bg-blueprint-grid-dark opacity-50 pointer-events-none" />

      {/* Blueprint Corner Registration Marks */}
      <div className="absolute top-6 left-6 w-3.5 h-3.5 border-t border-l border-white/20 hidden sm:block pointer-events-none" />
      <div className="absolute top-6 right-6 w-3.5 h-3.5 border-t border-r border-white/20 hidden sm:block pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Editorial Header */}
        <SectionEditorialTag 
          number="09" 
          category="TECHNICAL CONSULTATION & RFQ" 
          spec="DIRECT ENGINEERING SIZING & CAPEX ESTIMATES"
          light={true}
          className="mb-8"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              {cta.heading}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mt-3.5 leading-relaxed">
              {cta.subheading}
            </p>

            {/* SLA Badges */}
            <div className="flex flex-wrap items-center gap-4 mt-6 text-[11px] font-mono-tech text-gray-400">
              <span className="inline-flex items-center gap-1.5 text-gray-300">
                <Clock className="w-3.5 h-3.5 text-brand-yellow" /> Sizing proposal in &lt; 24h
              </span>
              <span className="text-gray-600">//</span>
              <span className="inline-flex items-center gap-1.5 text-gray-300">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-yellow" /> Direct consultation with senior EPC engineers
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="btn-primary text-xs uppercase tracking-wider font-heading font-bold px-8 py-4 shadow-yellow-glow flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>{cta.btn_text}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={`tel:${companySettings.phones[0]}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 border-2 border-white/20 text-white hover:border-brand-yellow hover:text-brand-yellow transition-colors font-mono-tech text-xs uppercase font-bold tracking-wider"
            >
              <PhoneCall className="w-4 h-4 text-brand-yellow" />
              <span>{companySettings.phones[0]}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
