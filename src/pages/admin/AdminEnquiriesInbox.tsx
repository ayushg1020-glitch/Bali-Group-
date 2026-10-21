import React, { useState } from 'react';
import { 
  Inbox, 
  Search, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Check, 
  Trash2, 
  Eye, 
  X, 
  Clock, 
  CheckCircle2, 
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { EnquirySubmission } from '../../types';

export const AdminEnquiriesInbox: React.FC = () => {
  const { enquiries, updateEnquiryStatus, markEnquiryRead, deleteEnquiry, exportEnquiriesCSV } = useCMS();
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquirySubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEnquiries = enquiries
    .filter(e => statusFilter === 'all' || e.status === statusFilter)
    .filter(e => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.solution_interest.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  const handleOpenDetail = (enq: EnquirySubmission) => {
    setSelectedEnquiry(enq);
    if (!enq.is_read) {
      markEnquiryRead(enq.id, true);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Lead Management & RFQs
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-brand-black">
            Customer Enquiries Inbox
          </h1>
          <p className="text-xs text-brand-text-grey mt-0.5">
            Confidential customer RFQs submitted through website forms. Protected by PostgreSQL Row Level Security.
          </p>
        </div>

        <button
          onClick={exportEnquiriesCSV}
          className="btn-secondary text-xs uppercase tracking-wider font-bold py-2.5 px-4 flex items-center gap-2 shadow-2xs"
        >
          <FileSpreadsheet className="w-4 h-4 text-green-600" /> Export to CSV
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-brand-border-grey flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        
        {/* Status Pills */}
        <div className="flex flex-wrap gap-2">
          {['all', 'new', 'reviewed', 'contacted', 'archived'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                statusFilter === st
                  ? 'bg-brand-black text-brand-yellow'
                  : 'bg-brand-light-grey text-brand-black hover:bg-gray-200'
              }`}
            >
              {st} ({st === 'all' ? enquiries.length : enquiries.filter(e => e.status === st).length})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, phone..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
          />
          <Search className="w-4 h-4 text-brand-text-grey absolute left-3 top-2" />
        </div>

      </div>

      {/* Enquiries Table */}
      <div className="bg-white border border-brand-border-grey shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-brand-black text-white text-xs font-heading uppercase tracking-wider">
                <th className="p-4">Lead Name & Company</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Interest & Capacity</th>
                <th className="p-4">Location</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-brand-text-grey text-xs">
                    No inquiries found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredEnquiries.map((enq) => (
                  <tr 
                    key={enq.id}
                    onClick={() => handleOpenDetail(enq)}
                    className={`cursor-pointer transition-colors ${
                      !enq.is_read ? 'bg-amber-50/50 hover:bg-amber-50 font-medium' : 'hover:bg-brand-light-grey'
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {!enq.is_read && (
                          <span className="w-2 h-2 rounded-full bg-brand-yellow shrink-0" title="Unread" />
                        )}
                        <div>
                          <p className="font-heading font-bold text-sm text-brand-black">{enq.name}</p>
                          <p className="text-xs text-brand-text-grey">{enq.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-xs">
                      <p className="text-brand-black font-semibold">{enq.email}</p>
                      <p className="text-brand-text-grey">{enq.phone}</p>
                    </td>
                    <td className="p-4 text-xs">
                      <p className="font-semibold text-brand-black">{enq.solution_interest}</p>
                      {enq.capacity_needed && (
                        <p className="text-brand-text-grey">{enq.capacity_needed}</p>
                      )}
                    </td>
                    <td className="p-4 text-xs text-brand-text-grey">
                      {enq.project_location}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-heading font-bold uppercase ${
                        enq.status === 'new' ? 'bg-amber-100 text-amber-800' :
                        enq.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                        enq.status === 'contacted' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-4 text-center text-xs text-brand-text-grey">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenDetail(enq)}
                        className="p-1.5 text-brand-black hover:text-brand-yellow-hover"
                        title="View enquiry details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete enquiry from ${enq.name}?`)) {
                            deleteEnquiry(enq.id);
                          }
                        }}
                        className="p-1.5 text-brand-text-grey hover:text-red-600"
                        title="Delete enquiry"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-brand-yellow shadow-2xl w-full max-w-2xl p-6 animate-in fade-in zoom-in-95">
            
            <div className="flex justify-between items-start pb-4 border-b border-brand-light-grey mb-4">
              <div>
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
                  Enquiry ID: {selectedEnquiry.id} • {new Date(selectedEnquiry.created_at).toLocaleString()}
                </span>
                <h3 className="font-heading font-extrabold text-xl text-brand-black mt-1">
                  {selectedEnquiry.name}
                </h3>
                <p className="text-xs text-brand-text-grey font-semibold">
                  {selectedEnquiry.company}
                </p>
              </div>
              <button onClick={() => setSelectedEnquiry(null)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Contact Snapshot */}
              <div className="grid grid-cols-2 gap-4 p-3 bg-brand-light-grey border border-brand-border-grey">
                <div>
                  <span className="text-brand-text-grey font-bold">Email:</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="block text-brand-black font-semibold hover:underline mt-0.5">
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-brand-text-grey font-bold">Phone:</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="block text-brand-black font-semibold hover:underline mt-0.5">
                    {selectedEnquiry.phone}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-brand-text-grey font-bold">Solution of Interest:</span>
                  <p className="font-semibold text-brand-black mt-0.5">{selectedEnquiry.solution_interest}</p>
                </div>
                <div>
                  <span className="text-brand-text-grey font-bold">Target Capacity:</span>
                  <p className="font-semibold text-brand-black mt-0.5">{selectedEnquiry.capacity_needed || 'Not Specified'}</p>
                </div>
              </div>

              <div>
                <span className="text-brand-text-grey font-bold">Proposed Site Location:</span>
                <p className="font-semibold text-brand-black mt-0.5">{selectedEnquiry.project_location}</p>
              </div>

              {/* Message */}
              <div className="p-4 bg-brand-light-grey border-l-4 border-brand-yellow">
                <span className="text-brand-text-grey font-bold block mb-1">Customer Message:</span>
                <p className="text-brand-black text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
              </div>

              {/* Status Selector */}
              <div className="pt-2 flex items-center justify-between border-t border-brand-light-grey">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-brand-black">Update Lead Status:</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => {
                      const newStatus = e.target.value as any;
                      updateEnquiryStatus(selectedEnquiry.id, newStatus);
                      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
                    }}
                    className="px-2.5 py-1 text-xs bg-brand-light-grey border border-brand-border-grey font-bold uppercase"
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="btn-primary text-xs uppercase font-bold py-1.5 px-4"
                >
                  Done
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
