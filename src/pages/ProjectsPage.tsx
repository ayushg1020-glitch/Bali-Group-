import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Search, ShieldCheck } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { SectionEditorialTag, CornerMarks } from '../components/common/IndustrialGraphics';

export const ProjectsPage: React.FC = () => {
  const { projects } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'all',
    'Commercial Wheat Storage',
    'Ethanol & Distillery Infrastructure',
    'Paddy & Rice Storage',
    'Port & Bulk Terminal',
    'International EPC Projects',
  ];

  const filteredProjects = projects
    .filter(p => p.published)
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.commodity.toLowerCase().includes(q) ||
        p.capacity.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => a.order - b.order);

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
            number="02"
            category="PROJECT ARCHIVE"
            spec="AUTHENTIC COMPANY INSTALLATIONS • 4.5M+ TONNES DELIVERED"
            light={true}
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
            Featured Silo Complexes & Turnkey Projects
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl leading-relaxed">
            All photography shown represents actual projects engineered, manufactured, and installed by Bali Group India.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-brand-light-grey border-b border-brand-border-grey sticky top-16 z-30 shadow-2xs">
        <div className="container-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-brand-black text-brand-yellow border-b-2 border-brand-yellow'
                    : 'bg-white text-brand-black border border-brand-border-grey hover:border-brand-black'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location, commodity..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-brand-border-grey focus:border-brand-black focus:outline-none"
            />
            <Search className="w-4 h-4 text-brand-text-grey absolute left-3 top-2.5" />
          </div>

        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container-custom">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 bg-brand-light-grey border border-brand-border-grey p-8">
              <ShieldCheck className="w-12 h-12 text-brand-text-grey mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-brand-black">No projects matched your search</h3>
              <p className="text-xs text-brand-text-grey mt-1">Try clearing your search query or selecting a different category.</p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-4 btn-primary text-xs uppercase tracking-wider font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj) => (
                <div 
                  key={proj.id}
                  className="bg-white border border-brand-border-grey hover:border-brand-black group flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 relative"
                >
                  <CornerMarks />
                  <div>
                    {/* Cover Photo */}
                    <div className="relative h-64 overflow-hidden bg-gray-100">
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
                      <div className="absolute bottom-3 left-3 bg-brand-black/90 text-white text-[10px] font-heading font-bold px-2.5 py-1 border-l-2 border-brand-yellow">
                        {proj.commodity}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-brand-text-grey mb-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-yellow-hover shrink-0" />
                        <span>{proj.location}</span>
                      </div>

                      <h3 className="font-heading font-bold text-xl text-brand-black group-hover:text-brand-yellow-hover transition-colors leading-snug">
                        {proj.title}
                      </h3>

                      <p className="text-xs text-brand-text-grey mt-2.5 line-clamp-3 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-brand-light-grey flex items-center justify-between">
                    <span className="text-[11px] font-medium text-brand-text-grey">Delivered: {proj.year_completed}</span>
                    <Link 
                      to={`/projects/${proj.slug}`}
                      className="font-heading font-bold text-xs uppercase tracking-wider text-brand-black group-hover:text-brand-yellow-hover flex items-center gap-1"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
