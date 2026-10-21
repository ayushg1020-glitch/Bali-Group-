import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { SectionEditorialTag, CornerMarks } from '../common/IndustrialGraphics';

export const SolutionsGrid: React.FC = () => {
  const { solutions, homePageContent } = useCMS();
  const heading = homePageContent.solutions_heading;

  return (
    <section className="bg-brand-light-grey/70 bg-paper-grain py-20 lg:py-28 border-y border-brand-border-grey relative">
      <div className="container-custom">
        
        {/* Section Editorial Header */}
        <SectionEditorialTag 
          number="04" 
          category="INDUSTRIAL STORAGE SYSTEMS" 
          spec="AISC & EN-1991 STRUCTURAL STANDARDS"
          className="mb-6"
        />

        {/* Section Heading Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-black tracking-tight leading-tight">
              {heading.title}
            </h2>
            <p className="text-brand-text-grey text-base sm:text-lg mt-3 leading-relaxed">
              {heading.subtitle}
            </p>
          </div>

          <Link 
            to="/solutions"
            className="inline-flex items-center gap-2 font-heading font-bold text-xs text-brand-black hover:text-brand-yellow-hover uppercase tracking-wider group py-2 border-b-2 border-transparent hover:border-brand-black transition-all"
          >
            <span>View All Engineering Solutions</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Image-Rich Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions
            .filter(s => s.published)
            .sort((a, b) => a.order - b.order)
            .slice(0, 6)
            .map((sol, idx) => (
              <div 
                key={sol.id}
                className="relative bg-white border border-brand-border-grey hover:border-brand-black transition-all duration-300 flex flex-col group overflow-hidden shadow-sm hover:shadow-premium"
              >
                <CornerMarks color="border-gray-200 group-hover:border-brand-yellow transition-colors" />

                {/* Image Container with Yellow Badge */}
                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img 
                    src={sol.image_url} 
                    alt={sol.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-brand-black/90 text-white text-[10px] font-mono-tech uppercase tracking-widest px-3 py-1 border-l-2 border-brand-yellow">
                    {sol.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[10px] font-mono-tech text-gray-700">
                    0{idx + 1} // SYS
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-brand-black group-hover:text-brand-yellow-hover transition-colors">
                      {sol.title}
                    </h3>
                    <p className="text-sm text-brand-text-grey mt-2.5 leading-relaxed line-clamp-3">
                      {sol.short_description}
                    </p>

                    {/* Quick Feature Bullets with refined monospace styling */}
                    <ul className="mt-4 space-y-1.5 border-t border-gray-100 pt-3">
                      {sol.features.slice(0, 2).map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-brand-black flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0"></span>
                          <span className="line-clamp-1 font-medium">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Link */}
                  <div className="mt-6 pt-4 border-t border-brand-light-grey flex items-center justify-between">
                    <span className="text-[11px] text-brand-text-grey font-mono-tech">
                      // Verified EPC Standard
                    </span>
                    <Link 
                      to={`/solutions/${sol.slug}`}
                      className="font-heading font-bold text-xs uppercase tracking-wider text-brand-black group-hover:text-brand-yellow-hover flex items-center gap-1.5"
                    >
                      <span>Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
};
