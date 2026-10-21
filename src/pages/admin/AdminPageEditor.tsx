import React, { useState } from 'react';
import { 
  FileText, 
  Save, 
  UploadCloud, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  Edit3, 
  Layers 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const AdminPageEditor: React.FC = () => {
  const { 
    homePageContent, 
    updateHomePageContentDraft, 
    saveDraft, 
    publishAllChanges, 
    hasUnsavedChanges 
  } = useCMS();

  const [selectedPage, setSelectedPage] = useState<'home' | 'about' | 'manufacturing' | 'engineering'>('home');
  const [successNotice, setSuccessNotice] = useState('');

  const [sectionVisibility, setSectionVisibility] = useState({
    hero: true,
    stats: true,
    about: true,
    solutions: true,
    projects: true,
    manufacturing: true,
    global: true,
    why: true,
    cta: true,
  });

  const toggleVisibility = (secKey: keyof typeof sectionVisibility) => {
    setSectionVisibility(prev => ({ ...prev, [secKey]: !prev[secKey] }));
    setSuccessNotice(`Section "${secKey}" visibility updated.`);
    setTimeout(() => setSuccessNotice(''), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Structured Page Management
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-brand-black">
            Visual Section-Based Page Editor
          </h1>
          <p className="text-xs text-brand-text-grey mt-0.5">
            Manage section order, toggle visibility, and configure approved layouts without code changes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {successNotice && (
            <span className="text-xs text-green-700 bg-green-50 px-2 py-1 border border-green-200 font-bold">
              ✓ {successNotice}
            </span>
          )}
          <button
            onClick={() => { saveDraft(); setSuccessNotice('Draft saved.'); }}
            className="btn-secondary text-xs uppercase tracking-wider font-bold py-2 px-3 flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>
          <button
            onClick={() => { publishAllChanges(); setSuccessNotice('Changes published live!'); }}
            className="btn-primary text-xs uppercase tracking-wider font-bold py-2 px-4 flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" /> Publish Changes
          </button>
        </div>
      </div>

      {/* Page Selector Tabs */}
      <div className="flex gap-2 bg-white p-2 border border-brand-border-grey shadow-2xs">
        {[
          { id: 'home', label: 'Homepage (10 Sections)' },
          { id: 'about', label: 'About Us Page' },
          { id: 'manufacturing', label: 'Manufacturing Page' },
          { id: 'engineering', label: 'Engineering Standards' },
        ].map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPage(p.id as any)}
            className={`px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-all ${
              selectedPage === p.id
                ? 'bg-brand-black text-brand-yellow border-b-2 border-brand-yellow'
                : 'text-brand-black hover:bg-brand-light-grey'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Section List with Reordering & Visibility Toggles */}
      <div className="bg-white p-6 border border-brand-border-grey shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-brand-light-grey">
          <h3 className="font-heading font-bold text-base text-brand-black">
            Ordered Sections on {selectedPage.toUpperCase()}
          </h3>
          <span className="text-xs text-brand-text-grey">
            Layout conforms to Bali Group engineering design system.
          </span>
        </div>

        <div className="space-y-3">
          {[
            { key: 'hero', name: 'SECTION 01: Hero Banner & Headline', type: 'Hero with dynamic overlay' },
            { key: 'stats', name: 'SECTION 02: Company Statistics Strip', type: '4-column KPI counters' },
            { key: 'about', name: 'SECTION 03: About Bali Group Overview', type: 'Image left, editorial copy right' },
            { key: 'solutions', name: 'SECTION 04: Our Solutions Portfolio', type: 'Card grid with specifications' },
            { key: 'projects', name: 'SECTION 05: Featured Projects Gallery', type: 'Case study cards with capacity badges' },
            { key: 'manufacturing', name: 'SECTION 06: Manufacturing & Facilities', type: 'Alternating editorial layout' },
            { key: 'global', name: 'SECTION 07: Global Footprint Map', type: 'World distribution graphic' },
            { key: 'why', name: 'SECTION 08: Why Bali Group (4 Pillars)', type: 'Value proposition cards' },
            { key: 'cta', name: 'SECTION 09: Project Enquiry Call to Action', type: 'High-contrast conversion block' },
          ].map((sec, idx) => {
            const isVisible = sectionVisibility[sec.key as keyof typeof sectionVisibility];

            return (
              <div 
                key={sec.key}
                className={`p-4 border flex items-center justify-between transition-all ${
                  isVisible ? 'bg-white border-brand-border-grey shadow-2xs' : 'bg-gray-50 border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-none bg-brand-light-grey text-brand-black text-xs font-heading font-black flex items-center justify-center border border-gray-300">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-black">{sec.name}</h4>
                    <p className="text-[11px] text-brand-text-grey">{sec.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleVisibility(sec.key as any)}
                    className={`p-2 text-xs font-heading font-bold uppercase tracking-wider flex items-center gap-1 border ${
                      isVisible 
                        ? 'bg-brand-light-grey text-brand-black border-brand-border-grey hover:bg-gray-200' 
                        : 'bg-red-50 text-red-600 border-red-200'
                    }`}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{isVisible ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
