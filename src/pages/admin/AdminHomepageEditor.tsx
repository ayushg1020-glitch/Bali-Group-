import React, { useState } from 'react';
import { 
  Save, 
  UploadCloud, 
  Eye, 
  RotateCcw, 
  CheckCircle2, 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const AdminHomepageEditor: React.FC = () => {
  const { 
    homePageContent, 
    updateHomePageContentDraft, 
    saveDraft, 
    publishAllChanges, 
    revertDrafts, 
    hasUnsavedChanges,
    mediaAssets,
    togglePreviewMode,
    isPreviewMode
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'hero' | 'stats' | 'about' | 'manufacturing' | 'global' | 'cta'>('hero');
  const [successMsg, setSuccessMsg] = useState('');

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(false as any), 3000);
  };

  const hero = homePageContent.hero;
  const stats = homePageContent.stats;
  const about = homePageContent.about;
  const mfg = homePageContent.manufacturing;
  const gp = homePageContent.global_presence;
  const cta = homePageContent.enquiry_cta;

  // Handlers for Hero
  const handleHeroChange = (field: keyof typeof hero, value: any) => {
    updateHomePageContentDraft({
      hero: { ...hero, [field]: value }
    });
  };

  // Handlers for Stats
  const handleStatChange = (id: string, field: string, value: any) => {
    const updatedStats = stats.map(s => s.id === id ? { ...s, [field]: value } : s);
    updateHomePageContentDraft({ stats: updatedStats });
  };

  // Handlers for About
  const handleAboutChange = (field: keyof typeof about, value: any) => {
    updateHomePageContentDraft({
      about: { ...about, [field]: value }
    });
  };

  // Handlers for Manufacturing
  const handleMfgFacilityChange = (index: number, field: string, value: any) => {
    const facilities = [...mfg.facilities];
    facilities[index] = { ...facilities[index], [field]: value };
    updateHomePageContentDraft({
      manufacturing: { ...mfg, facilities }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Top Action Header */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Homepage Content Management
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-brand-black">
            Visual Section Editor
          </h1>
          <p className="text-xs text-brand-text-grey mt-0.5">
            Modify text, photographs, statistics, and calls to action without modifying any code.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {hasUnsavedChanges && (
            <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 border border-amber-200 font-medium">
              ● Unsaved draft edits
            </span>
          )}

          {successMsg && (
            <span className="text-xs text-green-700 bg-green-50 px-2.5 py-1 border border-green-200 font-bold">
              ✓ {successMsg}
            </span>
          )}

          <button
            onClick={() => { saveDraft(); showNotification('Draft modifications saved.'); }}
            className="btn-secondary text-xs uppercase tracking-wider font-bold py-2 px-3 flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>

          <button
            onClick={togglePreviewMode}
            className={`text-xs font-heading font-bold uppercase tracking-wider py-2 px-3 border transition-colors flex items-center gap-1.5 ${
              isPreviewMode ? 'bg-brand-black text-brand-yellow border-brand-yellow' : 'bg-white border-brand-border-grey text-brand-black'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> {isPreviewMode ? 'Previewing Draft' : 'Preview'}
          </button>

          <button
            onClick={() => { publishAllChanges(); showNotification('Changes published to live website!'); }}
            className="btn-primary text-xs uppercase tracking-wider font-bold py-2 px-4 flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" /> Publish Live
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Sections */}
      <div className="flex flex-wrap gap-2 bg-white p-2 border border-brand-border-grey shadow-2xs">
        {[
          { id: 'hero', label: 'Section 01: Hero' },
          { id: 'stats', label: 'Section 02: Stats' },
          { id: 'about', label: 'Section 03: About' },
          { id: 'manufacturing', label: 'Section 06: Manufacturing' },
          { id: 'global', label: 'Section 07: Global Footprint' },
          { id: 'cta', label: 'Section 09: Final CTA' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-heading font-bold uppercase tracking-wider transition-all ${
              activeTab === tab.id
                ? 'bg-brand-black text-brand-yellow border-b-2 border-brand-yellow'
                : 'text-brand-black hover:bg-brand-light-grey'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-white p-6 sm:p-8 border border-brand-border-grey shadow-sm">
        
        {/* TAB 1: HERO */}
        {activeTab === 'hero' && (
          <div className="space-y-6 max-w-4xl">
            <h3 className="text-lg font-heading font-bold text-brand-black border-b border-brand-light-grey pb-3">
              Hero Section Settings & Media
            </h3>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Eyebrow Text
              </label>
              <input
                type="text"
                value={hero.eyebrow}
                onChange={(e) => handleHeroChange('eyebrow', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Main Headline *
              </label>
              <input
                type="text"
                value={hero.headline}
                onChange={(e) => handleHeroChange('headline', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Supporting Subheadline / Description
              </label>
              <textarea
                rows={3}
                value={hero.subheadline}
                onChange={(e) => handleHeroChange('subheadline', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                  Primary Button Label
                </label>
                <input
                  type="text"
                  value={hero.primary_btn_text}
                  onChange={(e) => handleHeroChange('primary_btn_text', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                  Primary Button URL Destination
                </label>
                <input
                  type="text"
                  value={hero.primary_btn_link}
                  onChange={(e) => handleHeroChange('primary_btn_link', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                  Secondary Button Label
                </label>
                <input
                  type="text"
                  value={hero.secondary_btn_text}
                  onChange={(e) => handleHeroChange('secondary_btn_text', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                  Secondary Button URL Destination
                </label>
                <input
                  type="text"
                  value={hero.secondary_btn_link}
                  onChange={(e) => handleHeroChange('secondary_btn_link', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                />
              </div>
            </div>

            {/* Hero Image Selector from Media Assets */}
            <div className="pt-2">
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-2">
                Hero Background Photograph (Select from Media Assets)
              </label>
              
              <div className="flex items-center gap-4 mb-3">
                <img 
                  src={hero.image_url} 
                  alt="Hero Preview" 
                  className="h-20 w-32 object-cover border-2 border-brand-border-grey shadow-xs" 
                />
                <input
                  type="text"
                  value={hero.image_url}
                  onChange={(e) => handleHeroChange('image_url', e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs bg-brand-light-grey border border-brand-border-grey"
                  placeholder="/images/silos/flat-bottom1.jpg"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {mediaAssets.filter(m => m.category === 'silo' || m.category === 'project').map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleHeroChange('image_url', m.url)}
                    className={`h-14 w-20 overflow-hidden border-2 transition-all ${
                      hero.image_url === m.url ? 'border-brand-yellow shadow-md scale-105' : 'border-gray-200 hover:border-black'
                    }`}
                  >
                    <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Background Dark Overlay Opacity: {hero.overlay_opacity}
              </label>
              <input
                type="range"
                min="0.2"
                max="0.8"
                step="0.05"
                value={hero.overlay_opacity}
                onChange={(e) => handleHeroChange('overlay_opacity', parseFloat(e.target.value))}
                className="w-full accent-brand-yellow"
              />
            </div>
          </div>
        )}

        {/* TAB 2: STATS */}
        {activeTab === 'stats' && (
          <div className="space-y-6 max-w-4xl">
            <h3 className="text-lg font-heading font-bold text-brand-black border-b border-brand-light-grey pb-3">
              Company Statistics Management
            </h3>
            <p className="text-xs text-brand-text-grey">
              All 4 stats display on the homepage immediately below the hero section.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((item, idx) => (
                <div key={item.id} className="p-4 border-2 border-brand-border-grey bg-brand-light-grey space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-heading font-bold text-xs uppercase text-brand-black">
                      Statistic #{idx + 1}
                    </span>
                    <span className="text-xs text-gray-400">Order: {item.order}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-[11px] font-bold text-brand-black mb-0.5">Number</label>
                      <input
                        type="text"
                        value={item.number}
                        onChange={(e) => handleStatChange(item.id, 'number', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm bg-white border border-brand-border-grey focus:border-brand-black font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-brand-black mb-0.5">Suffix</label>
                      <input
                        type="text"
                        value={item.suffix}
                        onChange={(e) => handleStatChange(item.id, 'suffix', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm bg-white border border-brand-border-grey focus:border-brand-black font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-black mb-0.5">Headline Label</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => handleStatChange(item.id, 'label', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-brand-border-grey focus:border-brand-black font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-black mb-0.5">Supporting Subtext</label>
                    <input
                      type="text"
                      value={item.subtext}
                      onChange={(e) => handleStatChange(item.id, 'subtext', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-brand-border-grey focus:border-brand-black"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-6 max-w-4xl">
            <h3 className="text-lg font-heading font-bold text-brand-black border-b border-brand-light-grey pb-3">
              Section 03: About Bali Group Content
            </h3>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Badge
              </label>
              <input
                type="text"
                value={about.badge}
                onChange={(e) => handleAboutChange('badge', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Heading
              </label>
              <input
                type="text"
                value={about.heading}
                onChange={(e) => handleAboutChange('heading', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Subheading
              </label>
              <input
                type="text"
                value={about.subheading}
                onChange={(e) => handleAboutChange('subheading', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Paragraph 1
              </label>
              <textarea
                rows={3}
                value={about.paragraphs[0] || ''}
                onChange={(e) => {
                  const p = [...about.paragraphs];
                  p[0] = e.target.value;
                  handleAboutChange('paragraphs', p);
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Paragraph 2
              </label>
              <textarea
                rows={3}
                value={about.paragraphs[1] || ''}
                onChange={(e) => {
                  const p = [...about.paragraphs];
                  p[1] = e.target.value;
                  handleAboutChange('paragraphs', p);
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                About Section Photograph URL
              </label>
              <input
                type="text"
                value={about.image_url}
                onChange={(e) => handleAboutChange('image_url', e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 4: MANUFACTURING */}
        {activeTab === 'manufacturing' && (
          <div className="space-y-6 max-w-4xl">
            <h3 className="text-lg font-heading font-bold text-brand-black border-b border-brand-light-grey pb-3">
              Section 06: Manufacturing Editorial Layouts
            </h3>

            <div className="space-y-6">
              {mfg.facilities.map((fac, idx) => (
                <div key={idx} className="p-4 border-2 border-brand-border-grey bg-brand-light-grey space-y-3">
                  <span className="font-heading font-bold text-xs uppercase text-brand-black">
                    Manufacturing Process Stage 0{idx + 1}
                  </span>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-black mb-0.5">Stage Title</label>
                    <input
                      type="text"
                      value={fac.title}
                      onChange={(e) => handleMfgFacilityChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-brand-border-grey font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-black mb-0.5">Description</label>
                    <textarea
                      rows={2}
                      value={fac.description}
                      onChange={(e) => handleMfgFacilityChange(idx, 'description', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-brand-border-grey"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-black mb-0.5">Image URL</label>
                    <input
                      type="text"
                      value={fac.image_url}
                      onChange={(e) => handleMfgFacilityChange(idx, 'image_url', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-brand-border-grey"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GLOBAL FOOTPRINT */}
        {activeTab === 'global' && (
          <div className="space-y-6 max-w-4xl">
            <h3 className="text-lg font-heading font-bold text-brand-black border-b border-brand-light-grey pb-3">
              Section 07: Global Footprint & Verified Nations
            </h3>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Headline
              </label>
              <input
                type="text"
                value={gp.heading}
                onChange={(e) => updateHomePageContentDraft({ global_presence: { ...gp, heading: e.target.value } })}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Description
              </label>
              <textarea
                rows={3}
                value={gp.description}
                onChange={(e) => updateHomePageContentDraft({ global_presence: { ...gp, description: e.target.value } })}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Verified Countries (Comma Separated)
              </label>
              <textarea
                rows={3}
                value={gp.countries_list.join(', ')}
                onChange={(e) => {
                  const list = e.target.value.split(',').map(c => c.trim()).filter(Boolean);
                  updateHomePageContentDraft({ global_presence: { ...gp, countries_list: list } });
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey"
              />
            </div>
          </div>
        )}

        {/* TAB 6: CTA */}
        {activeTab === 'cta' && (
          <div className="space-y-6 max-w-4xl">
            <h3 className="text-lg font-heading font-bold text-brand-black border-b border-brand-light-grey pb-3">
              Section 09: Final Enquiry Call to Action
            </h3>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={cta.heading}
                onChange={(e) => updateHomePageContentDraft({ enquiry_cta: { ...cta, heading: e.target.value } })}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                Subheading
              </label>
              <textarea
                rows={2}
                value={cta.subheading}
                onChange={(e) => updateHomePageContentDraft({ enquiry_cta: { ...cta, subheading: e.target.value } })}
                className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                  Button Text
                </label>
                <input
                  type="text"
                  value={cta.btn_text}
                  onChange={(e) => updateHomePageContentDraft({ enquiry_cta: { ...cta, btn_text: e.target.value } })}
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                  Button Link Destination
                </label>
                <input
                  type="text"
                  value={cta.btn_link}
                  onChange={(e) => updateHomePageContentDraft({ enquiry_cta: { ...cta, btn_link: e.target.value } })}
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey"
                />
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
