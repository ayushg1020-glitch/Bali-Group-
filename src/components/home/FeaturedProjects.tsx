import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const FeaturedProjects: React.FC = () => {
  const { projects, homePageContent } = useCMS();
  const heading = homePageContent.projects_heading;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Commercial Wheat Storage', 'Ethanol & Distillery Infrastructure', 'Paddy & Rice Storage'];

  const filteredProjects = projects
    .filter(p => p.published && p.is_featured)
    .filter(p => activeCategory === 'all' || p.category === activeCategory)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="badge-yellow mb-3">
              {heading.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-brand-black tracking-tight">
              {heading.title}
            </h2>
            <p className="text-brand-text-grey text-base mt-3">
              {heading.subtitle}
            </p>
          </div>

          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 font-heading font-bold text-sm text-brand-black hover:text-brand-yellow-hover uppercase tracking-wider group"
          >
            <span>View All Proven Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-brand-light-grey">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-brand-black text-brand-yellow border-b-2 border-brand-yellow'
                  : 'bg-brand-light-grey text-brand-black hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All Featured Projects' : cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.slice(0, 4).map((proj) => (
            <div 
              key={proj.id}
              className="border border-brand-border-grey hover:border-brand-black bg-white group flex flex-col sm:flex-row overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300"
            >
              {/* Actual Project Image */}
              <div className="sm:w-1/2 relative min-h-[260px] overflow-hidden bg-gray-100">
                <img 
                  src={proj.cover_image} 
                  alt={proj.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/silos/flat-bottom1.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 bg-brand-yellow text-brand-black text-[10px] font-heading font-black uppercase tracking-wider px-2.5 py-1">
                  {proj.capacity}
                </div>
              </div>

              {/* Project Meta & Technical Specs */}
              <div className="sm:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-brand-text-grey mb-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-yellow-hover shrink-0" />
                    <span className="line-clamp-1">{proj.location}</span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-brand-black group-hover:text-brand-yellow-hover transition-colors leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-brand-text-grey mt-2 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Technical Snapshot Table */}
                  <div className="mt-4 bg-brand-light-grey p-3 space-y-1.5 border-l-2 border-brand-yellow text-xs">
                    <div className="flex justify-between">
                      <span className="text-brand-text-grey">Commodity:</span>
                      <span className="font-semibold text-brand-black">{proj.commodity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-text-grey">Year Delivered:</span>
                      <span className="font-semibold text-brand-black">{proj.year_completed}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100">
                  <Link 
                    to={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider text-brand-black group-hover:text-brand-yellow-hover"
                  >
                    <span>View Project Details</span>
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
