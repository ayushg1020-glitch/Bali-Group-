import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Home, 
  FileText, 
  Image as ImageIcon, 
  Layers, 
  Briefcase, 
  Inbox, 
  Settings, 
  Search, 
  Users, 
  History, 
  LogOut, 
  Save, 
  UploadCloud, 
  RotateCcw, 
  Eye, 
  ShieldCheck, 
  Menu, 
  X, 
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export const AdminLayout: React.FC = () => {
  const { 
    currentUser, 
    logout, 
    hasUnsavedChanges, 
    saveDraft, 
    publishAllChanges, 
    revertDrafts, 
    enquiries, 
    isPreviewMode, 
    togglePreviewMode 
  } = useCMS();

  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [publishSuccessMsg, setPublishSuccessMsg] = useState(false);

  // Protected route check
  if (!currentUser) {
    return <Navigate to="/admin/login" replace />;
  }

  const unreadEnquiriesCount = enquiries.filter(e => !e.is_read).length;

  const handlePublish = () => {
    publishAllChanges();
    setPublishSuccessMsg(true);
    setTimeout(() => setPublishSuccessMsg(false), 3000);
  };

  const navItems = [
    { label: 'Overview', path: '/admin/overview', icon: LayoutDashboard },
    { label: 'Homepage Editor', path: '/admin/homepage', icon: Home },
    { label: 'Page Content', path: '/admin/pages', icon: FileText },
    { label: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { label: 'Products & Solutions', path: '/admin/products', icon: Layers },
    { label: 'Project Management', path: '/admin/projects', icon: Briefcase },
    { 
      label: 'Enquiries Inbox', 
      path: '/admin/enquiries', 
      icon: Inbox, 
      badge: unreadEnquiriesCount > 0 ? unreadEnquiriesCount : undefined 
    },
    { label: 'Company Settings', path: '/admin/company', icon: Settings },
    { label: 'SEO Settings', path: '/admin/seo', icon: Search },
    { label: 'Users & Roles', path: '/admin/users', icon: Users },
    { label: 'Activity Audit Log', path: '/admin/activity', icon: History },
  ];

  return (
    <div className="min-h-screen bg-brand-light-grey flex flex-col">
      
      {/* Top Admin Global Toolbar */}
      <header className="bg-white border-b border-brand-border-grey px-4 sm:px-6 py-2.5 sticky top-0 z-40 flex items-center justify-between shadow-2xs">
        
        {/* Left: Mobile hamburger & current user badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-brand-black md:hidden hover:bg-gray-100"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/" target="_blank" className="flex items-center gap-2 group">
            <span className="font-heading font-extrabold text-sm uppercase text-brand-black tracking-tight">
              Bali Group <span className="text-brand-yellow-hover">CMS</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-text-grey group-hover:text-brand-black" />
          </Link>

          <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-heading font-extrabold uppercase tracking-wider bg-brand-yellow/20 text-brand-black border border-brand-yellow/40">
            {currentUser.role.replace('_', ' ')}
          </span>
        </div>

        {/* Right: Unsaved changes banner, Save Draft, Preview, and Publish CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {hasUnsavedChanges && (
            <span className="hidden md:flex items-center gap-1 text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-1 border border-amber-200">
              <AlertCircle className="w-3.5 h-3.5" /> Unsaved Draft Changes
            </span>
          )}

          {publishSuccessMsg && (
            <span className="text-[11px] font-bold text-green-700 bg-green-50 px-2.5 py-1 border border-green-300 animate-in fade-in">
              ✓ Published Live!
            </span>
          )}

          <button
            onClick={saveDraft}
            className="hidden sm:inline-flex items-center gap-1 text-xs font-heading font-semibold px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-brand-black transition-colors"
            title="Save draft without publishing live"
          >
            <Save className="w-3.5 h-3.5" /> Save Draft
          </button>

          <button
            onClick={togglePreviewMode}
            className={`inline-flex items-center gap-1 text-xs font-heading font-semibold px-3 py-1.5 border transition-colors ${
              isPreviewMode 
                ? 'bg-brand-black text-brand-yellow border-brand-yellow' 
                : 'bg-white border-brand-border-grey text-brand-black hover:bg-gray-50'
            }`}
            title="Preview draft state before publishing"
          >
            <Eye className="w-3.5 h-3.5" /> {isPreviewMode ? 'Preview ON' : 'Preview'}
          </button>

          <button
            onClick={handlePublish}
            disabled={currentUser.role === 'viewer'}
            className="btn-primary text-xs uppercase tracking-wider font-heading font-bold px-4 py-1.5 shadow-sm flex items-center gap-1.5 disabled:opacity-50"
            title="Commit all draft changes directly to live corporate website"
          >
            <UploadCloud className="w-4 h-4" /> Publish Live
          </button>

          <button
            onClick={logout}
            className="p-1.5 text-brand-text-grey hover:text-red-600 transition-colors"
            title="Sign out of CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Body: Sidebar + Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Sidebar (Black with yellow active items) */}
        <aside className="w-64 bg-brand-black text-white shrink-0 hidden md:flex flex-col justify-between border-r border-neutral-800">
          <div className="py-4">
            <div className="px-5 mb-4 pb-3 border-b border-neutral-800">
              <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-brand-yellow">
                Management Modules
              </p>
            </div>

            <nav className="space-y-0.5 px-3">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 text-xs font-heading font-semibold transition-colors duration-150 rounded-none ${
                        isActive
                          ? 'bg-brand-yellow text-brand-black font-extrabold shadow-sm'
                          : 'text-gray-300 hover:bg-neutral-900 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span className="bg-red-500 text-white font-bold text-[10px] px-1.5 py-0.2 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Footer User Info */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-950 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading font-bold text-white text-xs truncate max-w-[150px]">
                  {currentUser.full_name}
                </p>
                <p className="text-[10px] text-gray-400 truncate max-w-[150px]">
                  {currentUser.email}
                </p>
              </div>
              <button 
                onClick={revertDrafts}
                title="Discard uncommitted drafts"
                className="text-gray-400 hover:text-brand-yellow p-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden bg-brand-black/80 flex">
            <div className="w-64 bg-brand-black text-white h-full flex flex-col justify-between p-4">
              <div>
                <div className="flex justify-between items-center mb-6 border-b border-neutral-800 pb-3">
                  <span className="font-heading font-bold text-brand-yellow text-sm uppercase">CMS Modules</span>
                  <button onClick={() => setMobileSidebarOpen(false)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2 text-xs font-heading font-bold ${
                            isActive ? 'bg-brand-yellow text-brand-black' : 'text-gray-300 hover:bg-neutral-900'
                          }`
                        }
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{item.badge}</span>
                        )}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
              <button
                onClick={logout}
                className="btn-secondary text-white border-neutral-700 w-full text-xs py-2"
              >
                Sign Out
              </button>
            </div>
            <div className="flex-1" onClick={() => setMobileSidebarOpen(false)} />
          </div>
        )}

        {/* Dynamic Content Panel */}
        <main className="flex-1 overflow-y-auto bg-brand-light-grey p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};
