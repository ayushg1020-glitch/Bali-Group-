import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { SectionEditorialTag, CornerMarks } from '../components/common/IndustrialGraphics';

export const ContactPage: React.FC = () => {
  const { companySettings, submitEnquiry } = useCMS();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    solution_interest: 'Commercial Flat Bottom Silos',
    project_location: '',
    capacity_needed: '',
    message: '',
    honeypot: '', // Spam protection
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam protection check
    if (formData.honeypot) {
      console.warn('Spam submission detected and discarded.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Phone, Message).');
      return;
    }

    setIsSubmitting(true);
    const ok = await submitEnquiry({
      name: formData.name,
      company: formData.company || 'Private Entity',
      email: formData.email,
      phone: formData.phone,
      solution_interest: formData.solution_interest,
      project_location: formData.project_location || 'Not Specified',
      capacity_needed: formData.capacity_needed,
      message: formData.message,
    });

    setIsSubmitting(false);
    if (ok) {
      setIsSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        solution_interest: 'Commercial Flat Bottom Silos',
        project_location: '',
        capacity_needed: '',
        message: '',
        honeypot: '',
      });
    } else {
      setErrorMessage('Submission failed. Please call our corporate office directly.');
    }
  };

  return (
    <div className="bg-white bg-paper-grain">
      {/* Banner */}
      <section className="bg-brand-black text-white py-20 relative overflow-hidden border-b-4 border-brand-yellow">
        {/* Blueprint CAD Grid Overlay with Radial Fade */}
        <div 
          className="absolute inset-0 bg-blueprint-grid-dark opacity-15 pointer-events-none"
          style={{ maskImage: 'radial-gradient(circle at 60% 50%, black 20%, transparent 80%)' }}
        />
        <div className="container-custom relative z-10">
          <SectionEditorialTag
            number="06"
            category="TECHNICAL CONSULTATION & RFQ"
            spec="CHANDIGARH HQ • 24-HOUR PROPOSAL TURNAROUND • GLOBAL SITE VISITS"
            light={true}
          />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight">
            Connect with Bali Group India
          </h1>
          <p className="text-gray-300 text-lg mt-4 max-w-2xl leading-relaxed">
            Our corporate headquarters and engineering application team are based in Chandigarh, ready to evaluate your grain storage requirements worldwide.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Official Contact Information */}
            <div className="lg:col-span-5 space-y-8">
              
              <div>
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-brand-yellow-hover">
                  OFFICIAL CORPORATE HEADQUARTERS
                </span>
                <h2 className="text-3xl font-heading font-extrabold text-brand-black mt-1">
                  Bali Group Silos
                </h2>
                <p className="text-brand-text-grey text-sm mt-2 leading-relaxed">
                  Premier manufacturer and turnkey supplier of grain storage silos, MHE, and industrial distillery infrastructure.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                
                {/* Address Card */}
                <div className="p-6 bg-brand-light-grey border-l-4 border-brand-yellow flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-yellow-hover shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-black uppercase">
                      Manufacturing & Head Office
                    </h4>
                    <p className="text-sm text-brand-text-grey mt-1">
                      {companySettings.headquarters.address}<br />
                      {companySettings.headquarters.city}, {companySettings.headquarters.state} - {companySettings.headquarters.pincode}<br />
                      {companySettings.headquarters.country}
                    </p>
                  </div>
                </div>

                {/* Direct Phone Numbers */}
                <div className="p-6 bg-brand-light-grey border-l-4 border-brand-yellow flex items-start gap-4">
                  <Phone className="w-6 h-6 text-brand-yellow-hover shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-black uppercase">
                      Telephone / Mobile Lines
                    </h4>
                    <div className="text-sm text-brand-text-grey mt-1 space-y-1">
                      <p>
                        Office Hotline: <a href={`tel:${companySettings.phones[0]}`} className="font-bold text-brand-black hover:text-brand-yellow-hover">{companySettings.phones[0]}</a>
                      </p>
                      {companySettings.phones[1] && (
                        <p>
                          Direct Line: <a href={`tel:${companySettings.phones[1]}`} className="font-bold text-brand-black hover:text-brand-yellow-hover">{companySettings.phones[1]}</a>
                        </p>
                      )}
                      {companySettings.whatsapp && (
                        <p className="text-xs text-gray-500 pt-1">
                          WhatsApp Business: <a href={`https://wa.me/${companySettings.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-brand-yellow-hover font-bold hover:underline">{companySettings.whatsapp}</a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="p-6 bg-brand-light-grey border-l-4 border-brand-yellow flex items-start gap-4">
                  <Mail className="w-6 h-6 text-brand-yellow-hover shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-black uppercase">
                      Official Corporate Email
                    </h4>
                    <p className="text-sm text-brand-black font-bold mt-1">
                      <a href={`mailto:${companySettings.email}`} className="hover:text-brand-yellow-hover">
                        {companySettings.email}
                      </a>
                    </p>
                    <p className="text-xs text-brand-text-grey mt-0.5">
                      Technical proposals and commercial RFQs: response within 24 business hours.
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="p-6 bg-brand-light-grey border-l-4 border-brand-yellow flex items-start gap-4">
                  <Clock className="w-6 h-6 text-brand-yellow-hover shrink-0 mt-1" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-black uppercase">
                      Factory & Office Hours
                    </h4>
                    <p className="text-sm text-brand-text-grey mt-1">
                      Monday to Saturday: 9:00 AM – 6:30 PM (IST)<br />
                      Sunday: Plant Operations & Emergency Site Dispatch Only
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Public Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border-2 border-brand-black p-8 sm:p-10 shadow-premium">
                
                <div className="mb-8">
                  <div className="badge-yellow mb-2">QUICK INQUIRY FORM</div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-black">
                    Submit Project Specifications
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-text-grey mt-1">
                    Please provide project details below for an accurate engineering bill of materials.
                  </p>
                </div>

                {isSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-brand-yellow/20 text-brand-black border-2 border-brand-yellow rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10 text-brand-yellow-hover" />
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-brand-black">
                      Enquiry Successfully Received!
                    </h4>
                    <p className="text-sm text-brand-text-grey max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out to Bali Group India. Our senior engineering team will review your specifications and contact you shortly.
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-4 btn-primary text-xs uppercase tracking-wider font-bold"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Honeypot field (hidden from genuine users) */}
                    <input 
                      type="text" 
                      name="honeypot" 
                      value={formData.honeypot} 
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })} 
                      className="hidden" 
                      autoComplete="off" 
                    />

                    {errorMessage && (
                      <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Patel"
                          className="w-full px-3.5 py-3 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                          Company / Enterprise
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Apex Agri Infrastructure"
                          className="w-full px-3.5 py-3 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                          Corporate Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="r.patel@apexagri.com"
                          className="w-full px-3.5 py-3 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                          Phone / Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-3 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                          Solution Category
                        </label>
                        <select
                          value={formData.solution_interest}
                          onChange={(e) => setFormData({ ...formData, solution_interest: e.target.value })}
                          className="w-full px-3.5 py-3 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                        >
                          <option value="Commercial Flat Bottom Silos">Commercial Flat Bottom Silos</option>
                          <option value="Hopper Bottom Silos">Hopper Bottom Silos</option>
                          <option value="Material Handling Equipment (MHE)">Material Handling Equipment (MHE)</option>
                          <option value="Distillery Grain Silos">Distillery Grain Silos</option>
                          <option value="Turnkey EPC Silo Projects">Turnkey EPC Silo Projects</option>
                          <option value="Feed Silos & Accessories">Feed Silos & Accessories</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                          Proposed Location & Country
                        </label>
                        <input
                          type="text"
                          value={formData.project_location}
                          onChange={(e) => setFormData({ ...formData, project_location: e.target.value })}
                          placeholder="e.g. Punjab, India"
                          className="w-full px-3.5 py-3 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                        Capacity Needed (Tonnes / TPH)
                      </label>
                      <input
                        type="text"
                        value={formData.capacity_needed}
                        onChange={(e) => setFormData({ ...formData, capacity_needed: e.target.value })}
                        placeholder="e.g. 15,000 MT Wheat + 150 TPH Elevator"
                        className="w-full px-3.5 py-3 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                        Project Scope & Message *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your grain type, moisture parameters, handling requirements, or turnkey civil timeline..."
                        className="w-full px-3.5 py-3 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full py-4 text-xs uppercase tracking-wider font-heading font-bold flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          'Encrypting & Submitting...'
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Submit Engineering Inquiry
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-brand-yellow" />
                        Stored securely in private CMS database. Public access restricted by PostgreSQL RLS.
                      </p>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>

          {/* Embedded Google Maps Representation */}
          <div className="mt-20 border-2 border-brand-border-grey shadow-sm">
            <div className="bg-brand-black text-white p-4 flex justify-between items-center">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-yellow">
                Interactive Site Map — 906, Industrial Area Phase-2, Chandigarh
              </span>
              <a 
                href={companySettings.google_maps_url} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-white hover:text-brand-yellow underline"
              >
                Open in Google Maps
              </a>
            </div>
            <iframe
              title="Bali Group Headquarters Location"
              src="https://maps.google.com/maps?q=906+Industrial+Area+Phase+2+Chandigarh&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="grayscale contrast-125"
            />
          </div>

        </div>
      </section>
    </div>
  );
};
