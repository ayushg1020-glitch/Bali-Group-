import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Inbox, 
  Layers, 
  Briefcase, 
  Image as ImageIcon, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  Database, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { getDatabaseStatus } from '../../lib/supabase';

export const AdminOverview: React.FC = () => {
  const { 
    enquiries, 
    solutions, 
    projects, 
    mediaAssets, 
    activityLogs, 
    currentUser, 
    hasUnsavedChanges, 
    publishAllChanges 
  } = useCMS();

  const dbStatus = getDatabaseStatus();
  const unreadCount = enquiries.filter(e => !e.is_read).length;

  return (
    <div className="space-y-8">
      
      {/* Top Welcome Strip */}
      <div className="bg-white p-6 border-l-4 border-brand-yellow border-t border-r border-b border-brand-border-grey shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-brand-text-grey">
            Corporate Operations Control
          </span>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-brand-black">
            Welcome back, {currentUser?.full_name}
          </h1>
          <p className="text-xs text-brand-text-grey mt-1">
            System authenticated with <span className="font-bold text-brand-black uppercase">{currentUser?.role.replace('_', ' ')}</span> permissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/homepage"
            className="btn-primary text-xs uppercase tracking-wider font-bold py-2.5 px-4 shadow-sm"
          >
            Launch Homepage Editor
          </Link>
          <Link
            to="/"
            target="_blank"
            className="btn-secondary text-xs uppercase tracking-wider font-bold py-2.5 px-4"
          >
            Open Live Website
          </Link>
        </div>
      </div>

      {/* Database Connection Notice */}
      <div className="bg-white p-4 border border-brand-border-grey flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <Database className="w-4 h-4 text-brand-yellow-hover shrink-0" />
          <div>
            <span className="font-bold text-brand-black">Database Engine: </span>
            <span className="text-brand-text-grey">{dbStatus.message}</span>
          </div>
        </div>
        <span className="px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 font-bold uppercase text-[10px]">
          Operational
        </span>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Enquiries Card */}
        <Link 
          to="/admin/enquiries"
          className="bg-white p-6 border border-brand-border-grey hover:border-brand-black transition-all shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-text-grey">
              Customer Enquiries
            </span>
            <Inbox className="w-5 h-5 text-brand-black group-hover:text-brand-yellow-hover transition-colors" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-heading font-extrabold text-brand-black">
              {enquiries.length}
            </span>
            {unreadCount > 0 && (
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 border border-red-200">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="text-[11px] text-brand-text-grey mt-2">
            {unreadCount > 0 ? 'New customer RFQs awaiting review' : 'All customer requests handled'}
          </p>
        </Link>

        {/* Solutions Card */}
        <Link 
          to="/admin/products"
          className="bg-white p-6 border border-brand-border-grey hover:border-brand-black transition-all shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-text-grey">
              Silo Solutions
            </span>
            <Layers className="w-5 h-5 text-brand-black group-hover:text-brand-yellow-hover transition-colors" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-heading font-extrabold text-brand-black">
              {solutions.length}
            </span>
          </div>
          <p className="text-[11px] text-brand-text-grey mt-2">
            Commercial bins, MHE, distilleries
          </p>
        </Link>

        {/* Projects Card */}
        <Link 
          to="/admin/projects"
          className="bg-white p-6 border border-brand-border-grey hover:border-brand-black transition-all shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-text-grey">
              Proven Projects
            </span>
            <Briefcase className="w-5 h-5 text-brand-black group-hover:text-brand-yellow-hover transition-colors" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-heading font-extrabold text-brand-black">
              {projects.length}
            </span>
          </div>
          <p className="text-[11px] text-brand-text-grey mt-2">
            Verified installations across 15+ countries
          </p>
        </Link>

        {/* Media Assets Card */}
        <Link 
          to="/admin/media"
          className="bg-white p-6 border border-brand-border-grey hover:border-brand-black transition-all shadow-sm group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-brand-text-grey">
              Media Library
            </span>
            <ImageIcon className="w-5 h-5 text-brand-black group-hover:text-brand-yellow-hover transition-colors" />
          </div>
          <div className="mt-4">
            <span className="text-3xl font-heading font-extrabold text-brand-black">
              {mediaAssets.length}
            </span>
          </div>
          <p className="text-[11px] text-brand-text-grey mt-2">
            Safe storage with active usage reference protection
          </p>
        </Link>

      </div>

      {/* Two Column Layout: Recent Enquiries & Recent Activity Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Recent Customer Enquiries */}
        <div className="lg:col-span-7 bg-white p-6 border border-brand-border-grey shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-light-grey">
            <h3 className="font-heading font-bold text-base text-brand-black uppercase tracking-wider">
              Recent Commercial Inquiries
            </h3>
            <Link to="/admin/enquiries" className="text-xs font-heading font-bold text-brand-black hover:text-brand-yellow-hover flex items-center gap-1">
              View Inbox <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {enquiries.slice(0, 4).map((enq) => (
              <div key={enq.id} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-brand-black">{enq.name}</span>
                    <span className="text-xs text-brand-text-grey">• {enq.company}</span>
                    {!enq.is_read && (
                      <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                    )}
                  </div>
                  <p className="text-xs text-brand-text-grey mt-0.5 line-clamp-1">{enq.message}</p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Interest: <span className="font-semibold text-brand-black">{enq.solution_interest}</span> • Location: {enq.project_location}
                  </p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-heading font-bold uppercase ${
                  enq.status === 'new' ? 'bg-amber-100 text-amber-800' :
                  enq.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                  enq.status === 'contacted' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
                }`}>
                  {enq.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Security Audit & Activity Log */}
        <div className="lg:col-span-5 bg-white p-6 border border-brand-border-grey shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-light-grey">
            <h3 className="font-heading font-bold text-base text-brand-black uppercase tracking-wider">
              Recent Audit Log
            </h3>
            <Link to="/admin/activity" className="text-xs font-heading font-bold text-brand-black hover:text-brand-yellow-hover flex items-center gap-1">
              All Logs <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {activityLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="text-xs border-l-2 border-brand-yellow pl-3 py-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold uppercase text-[10px] text-brand-black tracking-wider">
                    {log.action} • {log.entity}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-brand-text-grey mt-0.5">{log.details}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">By {log.user_email}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
