import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Award, ShieldCheck, Send, PhoneCall } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { SectionEditorialTag, CornerMarks } from '../components/common/IndustrialGraphics';

interface ProjectDetailPageProps {
  onOpenQuoteModal: (projectContext?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onOpenQuoteModal }) => {
  const { slug } = useParams<{ slug: string }>();
  const { projects, companySettings } = useCMS();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const activeImage = selectedImage || project.cover_image;

  return (
    <div className="bg-white bg-paper-grain">
      {/* Title Header */}
      <section className="bg-brand-black text-white py-16 border-b-4 border-brand-yellow relative overflow-hidden">
        {/* Blueprint CAD Grid Overlay with Radial Fade */}
        <div 
          className="absolute inset-0 bg-blueprint-grid-dark opacity-15 pointer-events-none"
          style={{ maskImage: 'radial-gradient(circle at 70% 50%, black 20%, transparent 80%)' }}
        />
        <div className="container-custom relative z-10">
          <Link 
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-brand-yellow hover:text-yellow-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Project Gallery
          </Link>

          <SectionEditorialTag
            number="PROJECT FILE"
            category={project.category}
            spec={`REF: BG-PRJ-${project.id.toUpperCase()} • ${project.capacity}`}
            light={true}
          />

          <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mt-4 text-xs sm:text-sm text-gray-300 font-mono-tech">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-yellow" /> {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-yellow" /> Completed: {project.year_completed}
            </span>
            <span className="flex items-center gap-1.5 font-bold text-brand-yellow">
              <Award className="w-4 h-4" /> Capacity: {project.capacity}
            </span>
          </div>
        </div>
      </section>

      {/* Main Details */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Image Showcase & Gallery */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="border-2 border-brand-border-grey overflow-hidden shadow-sm relative group bg-white">
                <CornerMarks />
                <img 
                  src={activeImage} 
                  alt={project.title}
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                  }}
                />
              </div>

              {/* Gallery Thumbnails */}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <div>
                  <p className="text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-3">
                    Project Site Photography ({project.gallery_images.length} views)
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {project.gallery_images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`h-20 sm:h-24 overflow-hidden border-2 transition-all ${
                          activeImage === img ? 'border-brand-yellow shadow-md' : 'border-brand-border-grey hover:border-brand-black'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`${project.title} photo ${idx + 1}`}
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

              {/* Project Scope & Engineering Narrative */}
              <div className="space-y-4">
                <h2 className="text-2xl font-heading font-extrabold text-brand-black">
                  Project Execution Scope & Engineering Highlights
                </h2>
                <p className="text-brand-text-grey text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="p-4 bg-brand-light-grey border-l-4 border-brand-yellow flex items-center justify-between">
                <span className="text-xs text-brand-black font-semibold">
                  All images represent authentic Bali Group project sites.
                </span>
                <ShieldCheck className="w-5 h-5 text-brand-yellow-hover" />
              </div>

            </div>

            {/* Right Column: Verified Specifications & Technical Breakdown */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-white border-2 border-brand-black p-6 shadow-premium">
                <h3 className="font-heading font-bold text-lg uppercase tracking-wide text-brand-black border-b border-brand-light-grey pb-3 mb-4">
                  Verified Technical Specifications
                </h3>

                <div className="divide-y divide-gray-100 text-sm">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-brand-text-grey">Installation Capacity:</span>
                    <span className="font-bold text-brand-black">{project.capacity}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-brand-text-grey">Commodity Stored:</span>
                    <span className="font-bold text-brand-black">{project.commodity}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-brand-text-grey">Site Location:</span>
                    <span className="font-semibold text-brand-black">{project.location}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-brand-text-grey">Client Category:</span>
                    <span className="font-semibold text-brand-black">{project.client_name || 'Agribusiness Enterprise'}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-brand-text-grey">Commissioning Year:</span>
                    <span className="font-semibold text-brand-black">{project.year_completed}</span>
                  </div>

                  {/* Dynamic Technical Specs */}
                  {project.technical_specs && Object.entries(project.technical_specs).map(([k, v]) => (
                    <div key={k} className="py-2.5 flex justify-between gap-4">
                      <span className="text-brand-text-grey text-xs sm:text-sm">{k}:</span>
                      <span className="font-semibold text-brand-black text-right text-xs sm:text-sm">{v}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => onOpenQuoteModal(`Project: ${project.title}`)}
                    className="btn-primary w-full py-4 text-xs uppercase tracking-wider font-bold shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Request Quote for Similar Project
                  </button>
                  <a
                    href={`tel:${companySettings.phones[0]}`}
                    className="btn-secondary w-full py-3 text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" /> Consult with Project Lead
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
