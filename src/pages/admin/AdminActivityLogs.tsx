import React, { useState } from 'react';
import { History, Search, Filter, ShieldCheck, Clock, User } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const AdminActivityLogs: React.FC = () => {
  const { activityLogs } = useCMS();
  const [filterAction, setFilterAction] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = activityLogs
    .filter(l => filterAction === 'all' || l.action === filterAction)
    .filter(l => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        l.entity.toLowerCase().includes(q) ||
        l.details.toLowerCase().includes(q) ||
        l.user_email.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Compliance & Security Audit Trail
          </span>
          <h1 className="text-2xl font-heading font-extrabold text-brand-black">
            System Activity Audit Logs
          </h1>
          <p className="text-xs text-brand-text-grey mt-0.5">
            Cryptographic and timestamped audit record of content changes, media uploads, and publishing operations.
          </p>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="bg-white p-4 border border-brand-border-grey flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="flex flex-wrap gap-2">
          {['all', 'publish', 'create', 'update', 'delete', 'login'].map(act => (
            <button
              key={act}
              onClick={() => setFilterAction(act)}
              className={`px-3 py-1.5 text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                filterAction === act
                  ? 'bg-brand-black text-brand-yellow'
                  : 'bg-brand-light-grey text-brand-black hover:bg-gray-200'
              }`}
            >
              {act}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit events..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-brand-light-grey border border-brand-border-grey focus:border-brand-black focus:outline-none"
          />
          <Search className="w-4 h-4 text-brand-text-grey absolute left-3 top-2" />
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-brand-border-grey shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-brand-black text-white text-xs font-heading uppercase tracking-wider">
                <th className="p-4">Timestamp</th>
                <th className="p-4">Operator</th>
                <th className="p-4 text-center">Action</th>
                <th className="p-4">Entity</th>
                <th className="p-4">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-brand-text-grey">
                    No activity logs recorded matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-brand-light-grey transition-colors">
                    <td className="p-4 font-mono text-[11px] text-brand-text-grey whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-4 font-bold text-brand-black">
                      {log.user_email}
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-0.5 text-[10px] font-heading font-bold uppercase ${
                        log.action === 'publish' ? 'bg-green-100 text-green-900 border border-green-300' :
                        log.action === 'delete' ? 'bg-red-100 text-red-900 border border-red-300' :
                        log.action === 'create' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                        log.action === 'login' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-brand-black">
                      {log.entity}
                    </td>
                    <td className="p-4 text-brand-text-grey">
                      {log.details}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
