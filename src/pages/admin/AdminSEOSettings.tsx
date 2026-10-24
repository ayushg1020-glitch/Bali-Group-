import React, { useState } from 'react';
import { Search, Save, UploadCloud, Globe, Check, FileCode, CheckCircle2 } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { AdminImagePicker } from '../../components/admin/AdminImagePicker';

export const AdminSEOSettings: React.FC = () => {
  const { seoSettings, updateSEODraft, saveDraft, publishAllChanges } = useCMS();
  const [successNotice, setSuccessNotice] = useState('');

  const showMsg = (txt: string) => {
    setSuccessNotice(txt);
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  const schemaOrgPreview = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "name": "Bali Group India",
    "url": "https://www.baligroupsilos.com",
    "logo": "https://www.baligroupsilos.com/images/logo.png",
    "description": seoSettings.default_description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "906, Industrial Area Phase-2",
      "addressLocality": "Chandigarh",
      "postalCode": "160002",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-88727-99999",
      "contactType": "sales",
      "areaServed": "Global"
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Search Engine Optimization
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-brand-black">
            SEO & Metadata Configuration
          </h1>
          <p className="text-xs text-brand-text-grey mt-0.5">
            Configure OpenGraph social previews, canonical domains, crawl directives, and Schema.org structured data.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {successNotice && (
            <span className="text-xs text-green-700 bg-green-50 px-2 py-1 border border-green-200 font-bold">
              ✓ {successNotice}
            </span>
          )}
          <button
            onClick={() => { saveDraft(); showMsg('SEO draft settings saved.'); }}
            className="btn-secondary text-xs uppercase tracking-wider font-bold py-2 px-3 flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>
          <button
            onClick={() => { publishAllChanges(); showMsg('SEO settings published live!'); }}
            className="btn-primary text-xs uppercase tracking-wider font-bold py-2 px-4 flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" /> Publish Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-brand-border-grey shadow-sm space-y-6">
          <h3 className="font-heading font-bold text-base text-brand-black border-b border-brand-light-grey pb-2">
            Global Search Engine Directives
          </h3>

          <div className="text-xs space-y-4">
            <div>
              <label className="block font-bold text-brand-black mb-1">
                Default Meta Title (Homepage)
              </label>
              <input
                type="text"
                value={seoSettings.default_title}
                onChange={(e) => updateSEODraft({ default_title: e.target.value })}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-brand-black mb-1">
                Title Template (Sub-pages)
              </label>
              <input
                type="text"
                value={seoSettings.title_template}
                onChange={(e) => updateSEODraft({ title_template: e.target.value })}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey font-mono"
              />
              <p className="text-[10px] text-brand-text-grey mt-0.5">Use <code>%s</code> to represent the specific page title.</p>
            </div>

            <div>
              <label className="block font-bold text-brand-black mb-1">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={seoSettings.default_description}
                onChange={(e) => updateSEODraft({ default_description: e.target.value })}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey leading-relaxed"
              />
            </div>

            <div>
              <label className="block font-bold text-brand-black mb-1">
                Meta Keywords
              </label>
              <textarea
                rows={2}
                value={seoSettings.default_keywords}
                onChange={(e) => updateSEODraft({ default_keywords: e.target.value })}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
              />
            </div>

              <AdminImagePicker
                label="OpenGraph Share Image (Social Preview Card)"
                value={seoSettings.og_image}
                onChange={(newUrl) => updateSEODraft({ og_image: newUrl })}
                defaultFallback="https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80"
                description="Displayed when your website is shared on LinkedIn, WhatsApp, Facebook, and Twitter/X (Recommended: 1200×630px)."
              />

            <div>
              <label className="block font-bold text-brand-black mb-1">
                Canonical Base Domain
              </label>
              <input
                type="text"
                value={seoSettings.canonical_base}
                onChange={(e) => updateSEODraft({ canonical_base: e.target.value })}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey font-mono"
              />
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={seoSettings.allow_indexing}
                  onChange={(e) => updateSEODraft({ allow_indexing: e.target.checked })}
                  className="accent-brand-yellow w-4 h-4"
                />
                <span className="font-bold text-brand-black">Allow Search Engine Crawlers to Index Site (robots.txt index, follow)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Preview (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Google SERP Preview Card */}
          <div className="bg-white p-6 border border-brand-border-grey shadow-sm">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand-black mb-3">
              Google Search Result Snippet Preview
            </h4>
            <div className="p-4 bg-white border border-gray-200 rounded-sm font-sans space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-gray-700">
                <Globe className="w-3.5 h-3.5 text-gray-500" />
                <span className="truncate">{seoSettings.canonical_base}</span>
              </div>
              <h5 className="text-base text-blue-800 hover:underline font-medium cursor-pointer line-clamp-1">
                {seoSettings.default_title}
              </h5>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {seoSettings.default_description}
              </p>
            </div>
          </div>

          {/* Schema.org Structured Data */}
          <div className="bg-white p-6 border border-brand-border-grey shadow-sm">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand-black mb-3">
              Generated Schema.org JSON-LD (Rich Results)
            </h4>
            <pre className="p-3 bg-brand-light-grey text-[11px] font-mono text-gray-800 overflow-x-auto border border-gray-200">
              {JSON.stringify(schemaOrgPreview, null, 2)}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
