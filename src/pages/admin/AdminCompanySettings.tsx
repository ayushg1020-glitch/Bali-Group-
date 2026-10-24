import React, { useState } from 'react';
import { Save, UploadCloud, Check, Building2, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { AdminImagePicker } from '../../components/admin/AdminImagePicker';

export const AdminCompanySettings: React.FC = () => {
  const { companySettings, updateCompanySettingsDraft, saveDraft, publishAllChanges } = useCMS();
  const [success, setSuccess] = useState('');

  const showMsg = (txt: string) => {
    setSuccess(txt);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleHeadquartersChange = (field: string, val: string) => {
    updateCompanySettingsDraft({
      headquarters: { ...companySettings.headquarters, [field]: val }
    });
  };

  const handlePhoneChange = (index: number, val: string) => {
    const phones = [...companySettings.phones];
    phones[index] = val;
    updateCompanySettingsDraft({ phones });
  };

  const handleSocialChange = (key: string, val: string) => {
    updateCompanySettingsDraft({
      social_links: { ...companySettings.social_links, [key]: val }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Corporate Metadata
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-brand-black">
            Company Settings & Contact Details
          </h1>
          <p className="text-xs text-brand-text-grey mt-0.5">
            Configure official addresses, telephones, emails, logos, and verified statistics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {success && (
            <span className="text-xs text-green-700 bg-green-50 px-2 py-1 border border-green-200 font-bold">
              ✓ {success}
            </span>
          )}
          <button
            onClick={() => { saveDraft(); showMsg('Company settings draft saved.'); }}
            className="btn-secondary text-xs uppercase tracking-wider font-bold py-2 px-3 flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>
          <button
            onClick={() => { publishAllChanges(); showMsg('Settings published live!'); }}
            className="btn-primary text-xs uppercase tracking-wider font-bold py-2 px-4 flex items-center gap-1.5"
          >
            <UploadCloud className="w-4 h-4" /> Publish Changes
          </button>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-8 border border-brand-border-grey shadow-sm space-y-8 max-w-4xl">
        
        {/* Core Brand Names */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-base text-brand-black border-b border-brand-light-grey pb-2">
            Brand Identification
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-brand-black mb-1">Company Name</label>
              <input
                type="text"
                value={companySettings.name}
                onChange={(e) => updateCompanySettingsDraft({ name: e.target.value })}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-black mb-1">Tagline</label>
              <input
                type="text"
                value={companySettings.tagline}
                onChange={(e) => updateCompanySettingsDraft({ tagline: e.target.value })}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-brand-black mb-1">Corporate Summary / Introduction</label>
            <textarea
              rows={3}
              value={companySettings.intro}
              onChange={(e) => updateCompanySettingsDraft({ intro: e.target.value })}
              className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey leading-relaxed"
            />
          </div>
        </div>

        {/* Corporate Logos & Visual Identity */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-base text-brand-black border-b border-brand-light-grey pb-2">
            Corporate Logos & Brand Assets
          </h3>
          <p className="text-xs text-brand-text-grey">
            Update or remove official company emblems. Changes appear across header navigation, footer, and email signatures.
          </p>

          <div className="space-y-4">
            <AdminImagePicker
              label="Primary Header Brand Logo"
              description="Displays prominently on the top navigation bar of every page."
              value={companySettings.logo_url}
              onChange={(newUrl) => updateCompanySettingsDraft({ logo_url: newUrl })}
              defaultFallback="/images/logo-bali-group.png"
              category="general"
              aspectRatioLabel="Horizontal Logo"
            />

            <AdminImagePicker
              label="Footer Corporate Logo"
              description="Displays on the dark footer strip. If removed or empty, falls back to the primary logo."
              value={companySettings.footer_logo_url}
              onChange={(newUrl) => updateCompanySettingsDraft({ footer_logo_url: newUrl })}
              defaultFallback="/images/logo-bali-group.png"
              category="general"
              aspectRatioLabel="Horizontal Logo"
            />
          </div>
        </div>

        {/* Corporate Headquarters */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-base text-brand-black border-b border-brand-light-grey pb-2">
            Corporate Headquarters & Registered Office
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-brand-black mb-1">Street Address</label>
              <input
                type="text"
                value={companySettings.headquarters.address}
                onChange={(e) => handleHeadquartersChange('address', e.target.value)}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block font-bold text-brand-black mb-1">City</label>
                <input
                  type="text"
                  value={companySettings.headquarters.city}
                  onChange={(e) => handleHeadquartersChange('city', e.target.value)}
                  className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-black mb-1">State</label>
                <input
                  type="text"
                  value={companySettings.headquarters.state}
                  onChange={(e) => handleHeadquartersChange('state', e.target.value)}
                  className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-black mb-1">Pincode</label>
                <input
                  type="text"
                  value={companySettings.headquarters.pincode}
                  onChange={(e) => handleHeadquartersChange('pincode', e.target.value)}
                  className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                />
              </div>
              <div>
                <label className="block font-bold text-brand-black mb-1">Country</label>
                <input
                  type="text"
                  value={companySettings.headquarters.country}
                  onChange={(e) => handleHeadquartersChange('country', e.target.value)}
                  className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-base text-brand-black border-b border-brand-light-grey pb-2">
            Official Communication Numbers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-brand-black mb-1">Primary Phone</label>
              <input
                type="text"
                value={companySettings.phones[0] || ''}
                onChange={(e) => handlePhoneChange(0, e.target.value)}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-black mb-1">Secondary Phone</label>
              <input
                type="text"
                value={companySettings.phones[1] || ''}
                onChange={(e) => handlePhoneChange(1, e.target.value)}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-black mb-1">WhatsApp Business</label>
              <input
                type="text"
                value={companySettings.whatsapp}
                onChange={(e) => updateCompanySettingsDraft({ whatsapp: e.target.value })}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-brand-black mb-1">Official Email</label>
              <input
                type="email"
                value={companySettings.email}
                onChange={(e) => updateCompanySettingsDraft({ email: e.target.value })}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-black mb-1">Google Maps Link</label>
              <input
                type="text"
                value={companySettings.google_maps_url}
                onChange={(e) => updateCompanySettingsDraft({ google_maps_url: e.target.value })}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey font-mono"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-base text-brand-black border-b border-brand-light-grey pb-2">
            Social Media Handles & Portals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-brand-black mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={companySettings.social_links.linkedin || ''}
                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-black mb-1">YouTube Channel URL</label>
              <input
                type="text"
                value={companySettings.social_links.youtube || ''}
                onChange={(e) => handleSocialChange('youtube', e.target.value)}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-black mb-1">Facebook URL</label>
              <input
                type="text"
                value={companySettings.social_links.facebook || ''}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
              />
            </div>
            <div>
              <label className="block font-bold text-brand-black mb-1">Instagram URL</label>
              <input
                type="text"
                value={companySettings.social_links.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                className="w-full px-3 py-2 bg-brand-light-grey border border-brand-border-grey"
              />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
