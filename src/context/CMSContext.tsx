import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  CompanySettings, 
  HomePageContent, 
  SolutionItem, 
  ProjectItem, 
  MediaAsset, 
  SEOSettings, 
  EnquirySubmission, 
  ActivityLogItem, 
  UserProfile, 
  UserRole 
} from '../types';
import { 
  initialCompanySettings, 
  initialHomePageContent, 
  initialSolutions, 
  initialProjects, 
  initialMediaAssets, 
  initialSEOSettings 
} from '../data/initialData';

interface CMSContextType {
  // Current user & auth
  currentUser: UserProfile | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;

  // Mode & preview
  isPreviewMode: boolean;
  togglePreviewMode: () => void;
  hasUnsavedChanges: boolean;

  // Active state (published vs draft)
  companySettings: CompanySettings;
  homePageContent: HomePageContent;
  solutions: SolutionItem[];
  projects: ProjectItem[];
  mediaAssets: MediaAsset[];
  seoSettings: SEOSettings;
  enquiries: EnquirySubmission[];
  activityLogs: ActivityLogItem[];

  // Draft operations
  updateCompanySettingsDraft: (settings: Partial<CompanySettings>) => void;
  updateHomePageContentDraft: (content: Partial<HomePageContent>) => void;
  updateSolutionDraft: (solution: SolutionItem) => void;
  addSolutionDraft: (solution: Omit<SolutionItem, 'id'>) => void;
  deleteSolutionDraft: (id: string) => void;
  updateProjectDraft: (project: ProjectItem) => void;
  addProjectDraft: (project: Omit<ProjectItem, 'id'>) => void;
  deleteProjectDraft: (id: string) => void;
  updateSEODraft: (seo: Partial<SEOSettings>) => void;

  // Save / Publish / Revert
  saveDraft: () => void;
  publishAllChanges: () => void;
  revertDrafts: () => void;

  // Media Library
  uploadMediaAsset: (asset: Omit<MediaAsset, 'id' | 'created_at' | 'usage_count' | 'referenced_by'>) => MediaAsset;
  updateMediaAsset: (id: string, updates: Partial<MediaAsset>) => void;
  deleteMediaAsset: (id: string) => { success: boolean; message?: string };
  replaceMediaAsset: (oldUrl: string, newUrl: string) => void;
  checkMediaUsage: (url: string) => string[];

  // Enquiries
  submitEnquiry: (enquiry: Omit<EnquirySubmission, 'id' | 'created_at' | 'status' | 'is_read'>) => Promise<boolean>;
  updateEnquiryStatus: (id: string, status: EnquirySubmission['status']) => void;
  markEnquiryRead: (id: string, is_read: boolean) => void;
  deleteEnquiry: (id: string) => void;
  exportEnquiriesCSV: () => void;
}

const STORAGE_KEYS = {
  PUBLISHED_DATA: 'bali_group_cms_published_v1',
  DRAFT_DATA: 'bali_group_cms_draft_v1',
  MEDIA_ASSETS: 'bali_group_cms_media_v1',
  ENQUIRIES: 'bali_group_cms_enquiries_v1',
  ACTIVITY_LOGS: 'bali_group_cms_activity_v1',
  AUTH_USER: 'bali_group_cms_user_v1',
};

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return null;
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Published Store
  const [publishedData, setPublishedData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PUBLISHED_DATA);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (parsed.homePageContent) {
          if (!parsed.homePageContent.silo_construction) {
            parsed.homePageContent.silo_construction = initialHomePageContent.silo_construction;
          }
          if (!parsed.homePageContent.engineering_intro) {
            parsed.homePageContent.engineering_intro = initialHomePageContent.engineering_intro;
          }
        }
        return parsed; 
      } catch (e) { /* ignore */ }
    }
    return {
      companySettings: initialCompanySettings,
      homePageContent: initialHomePageContent,
      solutions: initialSolutions,
      projects: initialProjects,
      seoSettings: initialSEOSettings,
    };
  });

  // Draft Store
  const [draftData, setDraftData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DRAFT_DATA);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (parsed.homePageContent) {
          if (!parsed.homePageContent.silo_construction) {
            parsed.homePageContent.silo_construction = initialHomePageContent.silo_construction;
          }
          if (!parsed.homePageContent.engineering_intro) {
            parsed.homePageContent.engineering_intro = initialHomePageContent.engineering_intro;
          }
        }
        return parsed; 
      } catch (e) { /* ignore */ }
    }
    return publishedData;
  });

  // Media Library
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEDIA_ASSETS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return initialMediaAssets;
  });

  // Enquiries
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'enq-seed-1',
        name: 'Rajesh Sharma',
        company: 'Punjab Agro Processing Ltd',
        email: 'r.sharma@punjabagro.in',
        phone: '+91 98140 12345',
        solution_interest: 'Flat Bottom Silos',
        project_location: 'Ludhiana, Punjab',
        capacity_needed: '15,000 MT',
        message: 'We require quotation and technical proposal for 3x 5,000 MT commercial wheat storage silos with 150 TPH handling equipment.',
        status: 'new',
        created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
        is_read: false,
      },
      {
        id: 'enq-seed-2',
        name: 'David Omondi',
        company: 'Nile Grains & Feeds Ltd',
        email: 'd.omondi@nilegrains.ke',
        phone: '+254 712 345678',
        solution_interest: 'Turnkey EPC Silo Projects',
        project_location: 'Eldoret, Kenya',
        capacity_needed: '10,000 MT Maize',
        message: 'Seeking turnkey proposal for corn storage and drying unit for feed production. Kindly send engineering specs.',
        status: 'reviewed',
        created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
        is_read: true,
      }
    ];
  });

  // Activity Logs
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'log-1',
        timestamp: new Date().toISOString(),
        user_email: 'admin@baligroupsilos.com',
        action: 'login',
        entity: 'Auth System',
        details: 'Initial corporate administrator login authenticated.',
      }
    ];
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PUBLISHED_DATA, JSON.stringify(publishedData));
  }, [publishedData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRAFT_DATA, JSON.stringify(draftData));
  }, [draftData]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEDIA_ASSETS, JSON.stringify(mediaAssets));
  }, [mediaAssets]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  }, [currentUser]);

  const logActivity = (action: ActivityLogItem['action'], entity: string, details: string) => {
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      user_email: currentUser?.email || 'admin@baligroupsilos.com',
      action,
      entity,
      details,
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Auth functions
  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    // Standard secure admin bootstrap
    if (email.toLowerCase() === 'admin@baligroupsilos.com' && (pass === 'BaliAdmin2025!' || pass === 'admin123')) {
      const user: UserProfile = {
        id: 'usr-admin-1',
        email: 'admin@baligroupsilos.com',
        full_name: 'Bali Corporate Administrator',
        role: 'super_admin',
        created_at: '2025-01-01T00:00:00.000Z',
      };
      setCurrentUser(user);
      logActivity('login', 'User Session', 'Super Admin logged in successfully.');
      return { success: true };
    }
    
    // Editor role demo login
    if (email.toLowerCase() === 'editor@baligroupsilos.com' && pass === 'BaliEditor2025!') {
      const user: UserProfile = {
        id: 'usr-editor-1',
        email: 'editor@baligroupsilos.com',
        full_name: 'Content Editor',
        role: 'editor',
        created_at: '2025-01-01T00:00:00.000Z',
      };
      setCurrentUser(user);
      logActivity('login', 'User Session', 'Editor logged in successfully.');
      return { success: true };
    }

    return { success: false, error: 'Invalid administrator credentials. Please check email and password.' };
  };

  const logout = () => {
    logActivity('login', 'User Session', 'User signed out.');
    setCurrentUser(null);
  };

  const setUserRole = (role: UserRole) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, role });
      logActivity('update', 'User Role', `User role changed to ${role}`);
    }
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(prev => !prev);
  };

  // Draft operations
  const updateCompanySettingsDraft = (settings: Partial<CompanySettings>) => {
    setDraftData((prev: typeof publishedData) => ({
      ...prev,
      companySettings: { ...prev.companySettings, ...settings },
    }));
    setHasUnsavedChanges(true);
  };

  const updateHomePageContentDraft = (content: Partial<HomePageContent>) => {
    setDraftData((prev: typeof publishedData) => ({
      ...prev,
      homePageContent: { ...prev.homePageContent, ...content },
    }));
    setHasUnsavedChanges(true);
  };

  const updateSolutionDraft = (solution: SolutionItem) => {
    setDraftData((prev: typeof publishedData) => ({
      ...prev,
      solutions: prev.solutions.map((s: SolutionItem) => s.id === solution.id ? solution : s),
    }));
    setHasUnsavedChanges(true);
  };

  const addSolutionDraft = (solution: Omit<SolutionItem, 'id'>) => {
    const newSolution: SolutionItem = {
      ...solution,
      id: `sol-${Date.now()}`,
    };
    setDraftData((prev: typeof publishedData) => ({
      ...prev,
      solutions: [...prev.solutions, newSolution],
    }));
    setHasUnsavedChanges(true);
    logActivity('create', 'Solution', `Added solution: ${solution.title}`);
  };

  const deleteSolutionDraft = (id: string) => {
    setDraftData((prev: typeof publishedData) => ({
      ...prev,
      solutions: prev.solutions.filter((s: SolutionItem) => s.id !== id),
    }));
    setHasUnsavedChanges(true);
    logActivity('delete', 'Solution', `Deleted solution ID: ${id}`);
  };

  const updateProjectDraft = (project: ProjectItem) => {
    setDraftData((prev: typeof publishedData) => ({
      ...prev,
      projects: prev.projects.map((p: ProjectItem) => p.id === project.id ? project : p),
    }));
    setHasUnsavedChanges(true);
  };

  const addProjectDraft = (project: Omit<ProjectItem, 'id'>) => {
    const newProject: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    setDraftData((prev: typeof publishedData) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
    setHasUnsavedChanges(true);
    logActivity('create', 'Project', `Added project: ${project.title}`);
  };

  const deleteProjectDraft = (id: string) => {
    setDraftData((prev: typeof publishedData) => ({
      ...prev,
      projects: prev.projects.filter((p: ProjectItem) => p.id !== id),
    }));
    setHasUnsavedChanges(true);
    logActivity('delete', 'Project', `Deleted project ID: ${id}`);
  };

  const updateSEODraft = (seo: Partial<SEOSettings>) => {
    setDraftData((prev: typeof publishedData) => ({
      ...prev,
      seoSettings: { ...prev.seoSettings, ...seo },
    }));
    setHasUnsavedChanges(true);
  };

  const saveDraft = () => {
    setPublishedData(draftData);
    setHasUnsavedChanges(false);
    logActivity('update', 'Draft Content', 'Saved draft modifications.');
  };

  const publishAllChanges = () => {
    setPublishedData(draftData);
    setHasUnsavedChanges(false);
    logActivity('publish', 'Website Content', 'Published all draft changes to the live corporate website.');
  };

  const revertDrafts = () => {
    setDraftData(publishedData);
    setHasUnsavedChanges(false);
    logActivity('revert', 'Draft Content', 'Reverted draft back to current published state.');
  };

  // Media references & deletion safety
  const checkMediaUsage = (url: string): string[] => {
    const usages: string[] = [];
    const active = publishedData;

    if (active.companySettings.logo_url === url) usages.push('Company Logo');
    if (active.companySettings.footer_logo_url === url) usages.push('Footer Logo');
    if (active.homePageContent.hero.image_url === url) usages.push('Homepage Hero Image');
    if (active.homePageContent.about.image_url === url) usages.push('Homepage About Section');

    active.homePageContent.manufacturing.facilities.forEach((f: any) => {
      if (f.image_url === url) usages.push(`Manufacturing: ${f.title}`);
    });

    active.solutions.forEach((s: SolutionItem) => {
      if (s.image_url === url) usages.push(`Solution Cover: ${s.title}`);
      if (s.gallery_images?.includes(url)) usages.push(`Solution Gallery: ${s.title}`);
    });

    active.projects.forEach((p: ProjectItem) => {
      if (p.cover_image === url) usages.push(`Project Cover: ${p.title}`);
      if (p.gallery_images?.includes(url)) usages.push(`Project Gallery: ${p.title}`);
    });

    return usages;
  };

  const uploadMediaAsset = (asset: Omit<MediaAsset, 'id' | 'created_at' | 'usage_count' | 'referenced_by'>): MediaAsset => {
    const newAsset: MediaAsset = {
      ...asset,
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      created_at: new Date().toISOString(),
      usage_count: 0,
      referenced_by: [],
    };
    setMediaAssets(prev => [newAsset, ...prev]);
    logActivity('create', 'Media Asset', `Uploaded media file: ${asset.filename}`);
    return newAsset;
  };

  const updateMediaAsset = (id: string, updates: Partial<MediaAsset>) => {
    setMediaAssets(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    logActivity('update', 'Media Metadata', `Updated metadata for media asset ${id}`);
  };

  const deleteMediaAsset = (id: string): { success: boolean; message?: string } => {
    const target = mediaAssets.find(m => m.id === id);
    if (!target) return { success: false, message: 'Media asset not found.' };

    const usages = checkMediaUsage(target.url);
    if (usages.length > 0) {
      return {
        success: false,
        message: `Deletion prevented! This image is actively referenced in: ${usages.join(', ')}. Please replace or unlink it before deleting.`,
      };
    }

    setMediaAssets(prev => prev.filter(m => m.id !== id));
    logActivity('delete', 'Media Asset', `Deleted media asset: ${target.filename}`);
    return { success: true };
  };

  const replaceMediaAsset = (oldUrl: string, newUrl: string) => {
    const replaceInObj = (obj: any): any => {
      if (typeof obj === 'string') {
        return obj === oldUrl ? newUrl : obj;
      }
      if (Array.isArray(obj)) {
        return obj.map(replaceInObj);
      }
      if (obj && typeof obj === 'object') {
        const res: any = {};
        for (const k of Object.keys(obj)) {
          res[k] = replaceInObj(obj[k]);
        }
        return res;
      }
      return obj;
    };

    setDraftData((prev: any) => replaceInObj(prev));
    setPublishedData((prev: any) => replaceInObj(prev));
    logActivity('update', 'Media Replacement', `Replaced media reference "${oldUrl}" with "${newUrl}".`);
  };

  // Enquiry submissions
  const submitEnquiry = async (enquiry: Omit<EnquirySubmission, 'id' | 'created_at' | 'status' | 'is_read'>): Promise<boolean> => {
    try {
      const newSubmission: EnquirySubmission = {
        ...enquiry,
        id: `enq-${Date.now()}`,
        status: 'new',
        is_read: false,
        created_at: new Date().toISOString(),
      };
      setEnquiries(prev => [newSubmission, ...prev]);
      logActivity('create', 'Customer Enquiry', `New enquiry received from ${enquiry.name} (${enquiry.company})`);
      return true;
    } catch (e) {
      return false;
    }
  };

  const updateEnquiryStatus = (id: string, status: EnquirySubmission['status']) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
    logActivity('update', 'Enquiry Status', `Updated enquiry ${id} to status: ${status}`);
  };

  const markEnquiryRead = (id: string, is_read: boolean) => {
    setEnquiries(prev => prev.map(e => e.id === id ? { ...e, is_read } : e));
  };

  const deleteEnquiry = (id: string) => {
    setEnquiries(prev => prev.filter(e => e.id !== id));
    logActivity('delete', 'Enquiry Record', `Deleted enquiry ID: ${id}`);
  };

  const exportEnquiriesCSV = () => {
    const headers = ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Solution Interest', 'Project Location', 'Capacity Needed', 'Status', 'Message'];
    const rows = enquiries.map(e => [
      e.id,
      new Date(e.created_at).toLocaleDateString(),
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.company.replace(/"/g, '""')}"`,
      e.email,
      e.phone,
      `"${e.solution_interest.replace(/"/g, '""')}"`,
      `"${e.project_location.replace(/"/g, '""')}"`,
      `"${(e.capacity_needed || '').replace(/"/g, '""')}"`,
      e.status,
      `"${e.message.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bali_Group_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // The active state that consumers see:
  // When on admin routes or in preview mode, always expose draftData so edits, sliders,
  // and image pickers update immediately in real-time.
  // On the public website, show draftData if preview mode is ON, otherwise publishedData.
  const activeData = (isAdminRoute || isPreviewMode) ? draftData : publishedData;

  return (
    <CMSContext.Provider
      value={{
        currentUser,
        login,
        logout,
        setUserRole,

        isPreviewMode,
        togglePreviewMode,
        hasUnsavedChanges,

        companySettings: activeData.companySettings,
        homePageContent: activeData.homePageContent,
        solutions: activeData.solutions,
        projects: activeData.projects,
        mediaAssets,
        seoSettings: activeData.seoSettings,
        enquiries,
        activityLogs,

        updateCompanySettingsDraft,
        updateHomePageContentDraft,
        updateSolutionDraft,
        addSolutionDraft,
        deleteSolutionDraft,
        updateProjectDraft,
        addProjectDraft,
        deleteProjectDraft,
        updateSEODraft,

        saveDraft,
        publishAllChanges,
        revertDrafts,

        uploadMediaAsset,
        updateMediaAsset,
        deleteMediaAsset,
        replaceMediaAsset,
        checkMediaUsage,

        submitEnquiry,
        updateEnquiryStatus,
        markEnquiryRead,
        deleteEnquiry,
        exportEnquiriesCSV,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
