import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const Footer: React.FC = () => {
  const { companySettings } = useCMS();

  return (
    <footer className="bg-brand-black text-white pt-16 pb-8 border-t-4 border-brand-yellow relative overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-blueprint-grid-dark opacity-25 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          
          {/* Brand & Summary Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={companySettings.footer_logo_url || companySettings.logo_url} 
                alt={companySettings.name}
                className="h-12 w-auto bg-white p-1 rounded-sm object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <span className="font-heading font-extrabold text-2xl tracking-tight uppercase text-white">
                  BALI <span className="text-brand-yellow">GROUP</span>
                </span>
                <p className="text-[10px] text-gray-400 font-mono-tech uppercase tracking-wider">Silo Solutions & Turnkey EPC</p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              {companySettings.intro}
            </p>

            <div className="pt-2">
              <span className="text-xs uppercase font-mono-tech font-bold tracking-wider text-brand-yellow block mb-2">
                Certified Engineering Standards
              </span>
              <div className="flex flex-wrap gap-2 text-[11px] font-mono-tech text-gray-300">
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1">ISO 9001:2015</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1">EN 1991-4 (Eurocode)</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1">DIN 1055 Standard</span>
                <span className="bg-neutral-900 border border-neutral-800 px-2.5 py-1">ASTM A653 Zinc</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-b-2 border-brand-yellow pb-2 mb-4 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" /> Solutions
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" /> Project Gallery
                </Link>
              </li>
              <li>
                <Link to="/manufacturing" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" /> Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/engineering" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" /> Engineering
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-yellow transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Column */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-b-2 border-brand-yellow pb-2 mb-4 inline-block">
              Silo Systems
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/solutions/flat-bottom-silos" className="hover:text-brand-yellow transition-colors">
                  Flat Bottom Grain Silos
                </Link>
              </li>
              <li>
                <Link to="/solutions/hopper-bottom-silos" className="hover:text-brand-yellow transition-colors">
                  Hopper Bottom Silos (45° & 60°)
                </Link>
              </li>
              <li>
                <Link to="/solutions/material-handling-equipment" className="hover:text-brand-yellow transition-colors">
                  Material Handling (MHE)
                </Link>
              </li>
              <li>
                <Link to="/solutions/distillery-storage-silos" className="hover:text-brand-yellow transition-colors">
                  Distillery & Ethanol Grain Silos
                </Link>
              </li>
              <li>
                <Link to="/solutions/turnkey-silo-projects" className="hover:text-brand-yellow transition-colors">
                  Turnkey EPC Grain Terminals
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Headquarters & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white border-b-2 border-brand-yellow pb-2 mb-4 inline-block">
              Corporate Headquarters
            </h4>

            <div className="flex items-start gap-3 text-sm text-gray-300">
              <MapPin className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
              <div>
                <p>{companySettings.headquarters.address}</p>
                <p>{companySettings.headquarters.city}, {companySettings.headquarters.state} - {companySettings.headquarters.pincode}</p>
                <p>{companySettings.headquarters.country}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300 pt-1">
              <Phone className="w-4 h-4 text-brand-yellow shrink-0 mt-1" />
              <div>
                <p>
                  <a href={`tel:${companySettings.phones[0]}`} className="hover:text-brand-yellow">
                    {companySettings.phones[0]}
                  </a>
                </p>
                {companySettings.phones[1] && (
                  <p>
                    <a href={`tel:${companySettings.phones[1]}`} className="hover:text-brand-yellow">
                      {companySettings.phones[1]}
                    </a>
                  </p>
                )}
                {companySettings.whatsapp && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    WhatsApp: <a href={`https://wa.me/${companySettings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-brand-yellow hover:underline">{companySettings.whatsapp}</a>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-300 pt-1">
              <Mail className="w-4 h-4 text-brand-yellow shrink-0" />
              <a href={`mailto:${companySettings.email}`} className="hover:text-brand-yellow">
                {companySettings.email}
              </a>
            </div>

            {/* Social Icons */}
            <div className="pt-3">
              <p className="text-xs uppercase font-heading font-bold text-gray-400 mb-2">Connect With Bali Group</p>
              <div className="flex items-center gap-3">
                {companySettings.social_links.linkedin && (
                  <a 
                    href={companySettings.social_links.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-9 h-9 rounded-none bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-300 hover:text-brand-yellow hover:border-brand-yellow transition-all"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                    </svg>
                  </a>
                )}
                {companySettings.social_links.youtube && (
                  <a 
                    href={companySettings.social_links.youtube} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-9 h-9 rounded-none bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-300 hover:text-brand-yellow hover:border-brand-yellow transition-all"
                    aria-label="YouTube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                    </svg>
                  </a>
                )}
                {companySettings.social_links.facebook && (
                  <a 
                    href={companySettings.social_links.facebook} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-9 h-9 rounded-none bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-300 hover:text-brand-yellow hover:border-brand-yellow transition-all"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02z"/>
                    </svg>
                  </a>
                )}
                {companySettings.social_links.instagram && (
                  <a 
                    href={companySettings.social_links.instagram} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-9 h-9 rounded-none bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-300 hover:text-brand-yellow hover:border-brand-yellow transition-all"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>{companySettings.copyright_text}</p>
          <div className="flex items-center space-x-6">
            <span className="text-gray-400">Headquarters: Chandigarh, India</span>
            <Link to="/admin" className="text-gray-400 hover:text-brand-yellow flex items-center gap-1 font-heading font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-yellow" />
              Website CMS Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
