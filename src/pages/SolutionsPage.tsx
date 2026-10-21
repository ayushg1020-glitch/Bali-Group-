import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ShieldCheck, Download } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { SectionEditorialTag, CornerMarks } from '../components/common/IndustrialGraphics';

interface SolutionsPageProps {
  onOpenQuoteModal: () => void;
}

export const SolutionsPage: React.FC<SolutionsPageProps> = ({ onOpenQuoteModal }) => {
  const { solutions } = useCMS();

  return (
    <div className="bg-white bg-paper-grain">
      {/* Header Banner */}
      <section className="bg-brand-black text-white py-20 relative overflow-hidden border-b-4 border-brand-yellow">
        {/* Blueprint CAD Grid Overlay with Radial Fade */}
        <div 
          className="absolute inset-0 bg-blueprint-grid-dark opacity-15 pointer-events-none"
          style={{ maskImage: 'radial-gradient(circle at 60% 50%, black 20%, transparent 80%)' }}
        />
        <div className="container-custom relative z-10">
          <SectionEditorialTag
            number="01"
            category="SOLUTIONS CATALOG"
            spec="REF: AISC 360-16 & EN 1991-4 • 50T TO 15,000T"
            light={true}
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
            Comprehensive Silo & Material Handling Solutions
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl leading-relaxed">
            From single commercial bins to 100,000+ metric tonne terminal complexes, our systems are precision engineered to withstand seismic and environmental forces while preserving grain quality.
          </p>
        </div>
      </section>

      {/* Solutions Listing */}
      <section className="py-20">
        <div className="container-custom space-y-20">
          {solutions
            .filter(s => s.published)
            .sort((a, b) => a.order - b.order)
            .map((sol, idx) => {
              const isEven = idx % 2 === 1;

              return (
                <div 
                  key={sol.id} 
                  id={sol.slug}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-16 border-b border-brand-border-grey last:border-b-0"
                >
                  {/* Photo Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative group overflow-hidden border-2 border-brand-border-grey shadow-md bg-white">
                      <CornerMarks />
                      <img 
                        src={sol.image_url} 
                        alt={sol.title}
                        className="w-full h-[360px] sm:h-[420px] object-cover object-center group-hover:scale-102 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                        }}
                      />
                      <div className="absolute top-4 left-4 bg-brand-black text-white text-xs font-heading font-bold uppercase tracking-wider px-3 py-1.5 border-l-2 border-brand-yellow z-20">
                        {sol.category}
                      </div>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className={`lg:col-span-6 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    <span className="text-xs font-heading font-extrabold text-brand-yellow-hover uppercase tracking-widest">
                      SYSTEM 0{idx + 1}
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-black leading-tight">
                      {sol.title}
                    </h2>

                    <p className="text-brand-text-grey text-base leading-relaxed">
                      {sol.full_description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2">
                      <p className="text-xs font-heading font-bold uppercase tracking-wider text-brand-black">
                        Key Engineering Highlights:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {sol.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0 mt-2"></span>
                            <span className="text-xs text-brand-black font-medium">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link 
                        to={`/solutions/${sol.slug}`}
                        className="btn-primary uppercase text-xs tracking-wider font-bold"
                      >
                        Technical Specifications & CAD
                      </Link>

                      <button
                        onClick={onOpenQuoteModal}
                        className="btn-secondary uppercase text-xs tracking-wider font-bold"
                      >
                        Request Silo Quote
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
};
