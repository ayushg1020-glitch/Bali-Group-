import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Phone, 
  Mail, 
  Shield, 
  Eye, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const { companySettings, isPreviewMode, togglePreviewMode, hasUnsavedChanges, currentUser } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { 
      label: 'Solutions', 
      path: '/solutions',
      hasDropdown: true,
      subItems: [
        { label: 'Flat Bottom Silos', path: '/solutions/flat-bottom-silos', desc: 'Commercial bulk storage up to 15,000 MT' },
        { label: 'Hopper Bottom Silos', path: '/solutions/hopper-bottom-silos', desc: '45° & 60° gravity cone rapid discharge' },
        { label: 'Material Handling (MHE)', path: '/solutions/material-handling-equipment', desc: 'Bucket elevators, drag conveyors up to 1,000 TPH' },
        { label: 'Distillery Grain Silos', path: '/solutions/distillery-storage-silos', desc: 'Maize, broken rice storage for ethanol plants' },
        { label: 'Turnkey EPC Projects', path: '/solutions/turnkey-silo-projects', desc: 'Civil, mechanical, electrical & automation' },
      ]
    },
    { label: 'Projects', path: '/projects' },
    { label: 'Manufacturing', path: '/manufacturing' },
    { label: 'Engineering', path: '/engineering' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* Draft Preview Bar (if preview mode is active) */}
      {isPreviewMode && (
        <div className="bg-brand-black text-white px-4 py-2 text-xs flex items-center justify-between border-b-2 border-brand-yellow sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-ping inline-block"></span>
            <span className="font-heading font-bold text-brand-yellow uppercase tracking-wider">CMS Draft Preview Mode</span>
            <span className="text-gray-400 hidden sm:inline">— You are previewing unpublished draft changes.</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/admin/homepage" className="text-white hover:text-brand-yellow underline font-medium">
              Back to CMS Editor
            </Link>
            <button 
              onClick={togglePreviewMode}
              className="bg-brand-yellow text-brand-black px-2.5 py-0.5 font-bold uppercase text-[10px] hover:bg-yellow-400"
            >
              Exit Preview
            </button>
          </div>
        </div>
      )}

      {/* Top Corporate Strip */}
      <div className="bg-brand-light-grey border-b border-brand-border-grey text-brand-black py-2 px-4 text-xs hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center space-x-6 text-brand-text-grey">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block"></span>
              Certified Grain Storage EPC & Manufacturing Leader
            </span>
            <a href={`tel:${companySettings.phones[0]}`} className="flex items-center gap-1.5 hover:text-brand-black transition-colors">
              <Phone className="w-3.5 h-3.5 text-brand-black" />
              <span>{companySettings.phones[0]}</span>
            </a>
            <a href={`mailto:${companySettings.email}`} className="flex items-center gap-1.5 hover:text-brand-black transition-colors">
              <Mail className="w-3.5 h-3.5 text-brand-black" />
              <span>{companySettings.email}</span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Headquarters: {companySettings.headquarters.city}, India</span>
            <Link 
              to="/admin" 
              className="flex items-center gap-1 text-brand-text-grey hover:text-brand-black font-medium pl-3 border-l border-gray-300"
            >
              <Shield className="w-3.5 h-3.5 text-brand-yellow" />
              <span>{currentUser ? `Admin (${currentUser.role})` : 'CMS Portal'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`sticky top-0 z-40 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md py-3' : 'py-4 border-b border-brand-border-grey'}`}>
        <div className="container-custom flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group py-0.5" aria-label="Bali Group Home">
            <img 
              src={companySettings.logo_url || '/images/logo-bali-group.png'} 
              alt="Bali Group Grain Silos & EPC"
              className="h-11 sm:h-12 md:h-14 lg:h-[54px] w-auto object-contain transition-transform duration-200 group-hover:scale-102"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/logo-bali-group.png';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setSolutionsDropdownOpen(true)}
                    onMouseLeave={() => setSolutionsDropdownOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`px-3 py-2 text-sm font-heading font-semibold flex items-center gap-1 transition-colors duration-200 ${
                        isActive 
                          ? 'text-brand-black border-b-2 border-brand-yellow' 
                          : 'text-brand-black hover:text-brand-yellow'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Solutions Dropdown Menu */}
                    {solutionsDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white shadow-2xl border-t-2 border-brand-yellow border-x border-b border-brand-border-grey py-3 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                        <div className="px-4 py-2 border-b border-brand-light-grey mb-1">
                          <p className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
                            Silo Systems & Machinery
                          </p>
                        </div>
                        {item.subItems?.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            className="block px-4 py-2.5 hover:bg-brand-light-grey transition-colors group/sub"
                          >
                            <div className="font-heading font-semibold text-sm text-brand-black group-hover/sub:text-brand-yellow flex items-center justify-between">
                              {sub.label}
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-xs text-brand-text-grey mt-0.5 line-clamp-1">{sub.desc}</p>
                          </Link>
                        ))}
                        <div className="px-4 pt-3 mt-1 border-t border-brand-light-grey">
                          <Link 
                            to="/solutions" 
                            className="text-xs font-heading font-bold text-brand-black hover:text-brand-yellow flex items-center gap-1"
                          >
                            View All Engineering Solutions <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-heading font-semibold transition-all duration-200 relative ${
                    isActive 
                      ? 'text-brand-black font-bold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand-yellow' 
                      : 'text-brand-black hover:text-brand-yellow'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenQuoteModal}
              className="btn-primary text-xs uppercase tracking-wider px-5 py-2.5 font-bold shadow-sm"
              id="header-get-quote-btn"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenQuoteModal}
              className="bg-brand-yellow text-brand-black px-3 py-1.5 text-xs font-heading font-bold uppercase sm:hidden"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-black hover:text-brand-yellow focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-brand-border-grey px-4 pt-2 pb-6 shadow-xl animate-in fade-in duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.path}
                    className={`block py-3 px-3 text-base font-heading font-bold border-b border-gray-100 ${
                      location.pathname === item.path ? 'text-brand-yellow bg-gray-50' : 'text-brand-black'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-6 py-2 bg-brand-light-grey space-y-2">
                      {item.subItems?.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.path}
                          className="block py-1 text-sm text-brand-black hover:text-brand-yellow"
                        >
                          • {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuoteModal?.();
                  }}
                  className="btn-primary w-full text-center py-3 font-heading font-bold uppercase tracking-wider"
                >
                  Get a Quote
                </button>
                <Link
                  to="/admin"
                  className="btn-secondary w-full text-center py-2.5 text-xs font-heading"
                >
                  Admin CMS Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
