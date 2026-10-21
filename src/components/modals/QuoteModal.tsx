import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedSolution?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ 
  isOpen, 
  onClose, 
  preselectedSolution = 'Commercial Flat Bottom Silos' 
}) => {
  const { submitEnquiry } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    solution_interest: preselectedSolution,
    project_location: '',
    capacity_needed: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMsg('Please complete your name, email, and contact number.');
      return;
    }

    setIsSubmitting(true);
    const ok = await submitEnquiry({
      name: formData.name,
      company: formData.company || 'Private Agribusiness',
      email: formData.email,
      phone: formData.phone,
      solution_interest: formData.solution_interest,
      project_location: formData.project_location || 'Not Specified',
      capacity_needed: formData.capacity_needed,
      message: formData.message || 'Customer requested a turnkey quotation.',
    });

    setIsSubmitting(false);
    if (ok) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          solution_interest: preselectedSolution,
          project_location: '',
          capacity_needed: '',
          message: '',
        });
      }, 2500);
    } else {
      setErrorMsg('Unable to submit enquiry at this time. Please call our hotline.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-brand-yellow shadow-2xl w-full max-w-xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-brand-black text-white p-6 flex justify-between items-start border-b border-neutral-800">
          <div>
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-yellow flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Official Engineering RFQ
            </span>
            <h3 className="text-xl font-heading font-extrabold mt-1 text-white">
              Request a Project Quotation
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Get detailed engineering specifications, CAD layouts, and commercial pricing.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-brand-yellow/20 text-brand-black border-2 border-brand-yellow rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-brand-yellow-hover" />
              </div>
              <h4 className="text-xl font-heading font-bold text-brand-black">Quotation Request Submitted!</h4>
              <p className="text-sm text-brand-text-grey max-w-md mx-auto">
                Thank you. A senior Bali Group silo application engineer will review your site requirements and contact you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Patel Agro Foods Pvt Ltd"
                    className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
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
                    placeholder="r.patel@agrofoods.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                    Phone / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                    Solution of Interest
                  </label>
                  <select
                    value={formData.solution_interest}
                    onChange={(e) => setFormData({ ...formData, solution_interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
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
                    Target Capacity (Tonnes)
                  </label>
                  <input
                    type="text"
                    value={formData.capacity_needed}
                    onChange={(e) => setFormData({ ...formData, capacity_needed: e.target.value })}
                    placeholder="e.g. 10,000 MT Wheat"
                    className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                  Proposed Project Location (City / State / Country)
                </label>
                <input
                  type="text"
                  value={formData.project_location}
                  onChange={(e) => setFormData({ ...formData, project_location: e.target.value })}
                  placeholder="e.g. Indore, Madhya Pradesh, India"
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase tracking-wider text-brand-black mb-1">
                  Project Notes & Timeline
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your site details, grain type, conveying speed or installation timeline..."
                  className="w-full px-3.5 py-2.5 text-sm bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-3.5 text-sm uppercase tracking-wider font-heading font-bold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Submitting to Engineering...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Quotation Request
                    </>
                  )}
                </button>
                <p className="text-[11px] text-gray-500 text-center mt-2">
                  🔒 Strictly confidential. Your site information is stored safely and never shared.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
