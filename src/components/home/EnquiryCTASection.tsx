import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface EnquiryCTASectionProps {
  onOpenQuoteModal?: () => void;
}

export const EnquiryCTASection: React.FC<EnquiryCTASectionProps> = ({ onOpenQuoteModal }) => {
  const { homePageContent, companySettings } = useCMS();
  const cta = homePageContent.enquiry_cta;

  return (
    <section className="bg-brand-black text-white py-16 lg:py-20 relative overflow-hidden border-t-4 border-brand-yellow">
      {/* Background architectural pattern */}
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#FACC15_1px,transparent_1px),linear-gradient(to_bottom,#FACC15_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          
          <div className="max-w-2xl">
            <span className="text-xs font-heading font-extrabold text-brand-yellow uppercase tracking-widest flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4" /> Direct Engineering Channel
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              {cta.heading}
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mt-3 leading-relaxed">
              {cta.subheading}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <button
              onClick={onOpenQuoteModal}
              className="btn-primary text-xs uppercase tracking-wider font-heading font-bold px-8 py-4 shadow-yellow-glow flex items-center justify-center gap-2"
            >
              <span>{cta.btn_text}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${companySettings.phones[0]}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-white/20 text-white hover:border-brand-yellow hover:text-brand-yellow transition-colors font-heading text-xs uppercase font-bold tracking-wider"
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
