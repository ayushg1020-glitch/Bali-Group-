import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Download, Send, PhoneCall } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { SectionEditorialTag, CornerMarks } from '../components/common/IndustrialGraphics';

interface SolutionDetailPageProps {
  onOpenQuoteModal: (solutionTitle?: string) => void;
}

export const SolutionDetailPage: React.FC<SolutionDetailPageProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const { solutions, projects, companySettings } = useCMS();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const solution = solutions.find(s => s.slug === slug);

  if (!solution) {
    return <Navigate to="/solutions" replace />;
  }

  const activeImage = selectedImage || solution.image_url;
  const relatedProjects = projects.filter(p => p.published).slice(0, 2);

  return (
    <div className="bg-white bg-paper-grain">
      {/* Top Breadcrumb & Title Banner */}
      <section className="bg-brand-black text-white py-16 border-b-4 border-brand-yellow relative overflow-hidden">
        {/* Blueprint CAD Grid Overlay with Radial Fade */}
        <div 
          className="absolute inset-0 bg-blueprint-grid-dark opacity-15 pointer-events-none"
          style={{ maskImage: 'radial-gradient(circle at 70% 50%, black 20%, transparent 80%)' }}
        />
        <div className="container-custom relative z-10">
          <Link 
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-brand-yellow hover:text-yellow-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to All Solutions
          </Link>
          <SectionEditorialTag
            number="SYSTEM SPEC"
            category={solution.category}
            spec={`SYSTEM REF: BG-${solution.id.toUpperCase()} • 2.66" SINE PITCH`}
            light={true}
          />
          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            {solution.title}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mt-3 max-w-2xl leading-relaxed">
            {solution.short_description}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 7 Columns: Gallery & Detailed Narrative */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Main Image Showcase */}
              <div className="border-2 border-brand-border-grey overflow-hidden shadow-sm relative group bg-white">
                <CornerMarks />
                <img 
                  src={activeImage} 
                  alt={solution.title}
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                  }}
                />
              </div>

              {/* Thumbnail Gallery Strip */}
              {solution.gallery_images && solution.gallery_images.length > 0 && (
                <div>
                  <p className="text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-3">
                    Project & Engineering Gallery ({solution.gallery_images.length} views)
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {solution.gallery_images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`h-20 sm:h-24 overflow-hidden border-2 transition-all ${
                          activeImage === img ? 'border-brand-yellow shadow-md' : 'border-brand-border-grey hover:border-brand-black'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`${solution.title} view ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              <div className="space-y-4">
                <h2 className="text-2xl font-heading font-extrabold text-brand-black">
                  Engineering Design & Structural Overview
                </h2>
                <p className="text-brand-text-grey text-base leading-relaxed">
                  {solution.full_description}
                </p>
              </div>

              {/* Key Features */}
              <div className="bg-brand-light-grey p-8 border-l-4 border-brand-yellow">
                <h3 className="font-heading font-bold text-lg text-brand-black mb-4">
                  Standard Technical Inclusions:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {solution.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-brand-yellow-hover shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-brand-black">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Technical Specifications Table & Quote CTA */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Specifications Card */}
              <div className="bg-white border-2 border-brand-black p-6 shadow-premium">
                <div className="flex items-center gap-2 mb-4 border-b border-brand-light-grey pb-3">
                  <ShieldCheck className="w-6 h-6 text-brand-yellow-hover" />
                  <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-brand-black">
                    Verified Specifications
                  </h3>
                </div>

                <div className="divide-y divide-gray-100 text-sm">
                  {Object.entries(solution.specifications).map(([key, value]) => (
                    <div key={key} className="py-2.5 flex justify-between gap-4">
                      <span className="text-brand-text-grey font-medium text-xs sm:text-sm">{key}</span>
                      <span className="text-brand-black font-semibold text-right text-xs sm:text-sm">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Direct Action */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => onOpenQuoteModal(solution.title)}
                    className="btn-primary w-full py-4 text-xs uppercase tracking-wider font-bold shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Request Quote for this System
                  </button>
                  <a
                    href={`tel:${companySettings.phones[0]}`}
                    className="btn-secondary w-full py-3 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" /> Speak with Lead Engineer
                  </a>
                </div>
              </div>

              {/* Related Projects Snapshot */}
              {relatedProjects.length > 0 && (
                <div className="border border-brand-border-grey p-6 bg-brand-light-grey">
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-black mb-4">
                    Proven Commercial Deployments
                  </h4>
                  <div className="space-y-4">
                    {relatedProjects.map((p) => (
                      <Link 
                        key={p.id}
                        to={`/projects/${p.slug}`}
                        className="block bg-white p-3 border border-brand-border-grey hover:border-brand-black transition-colors group"
                      >
                        <p className="font-heading font-bold text-xs text-brand-black group-hover:text-brand-yellow-hover">
                          {p.title}
                        </p>
                        <p className="text-[11px] text-brand-text-grey mt-0.5">
                          Capacity: {p.capacity} • {p.location}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
