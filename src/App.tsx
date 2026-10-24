import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';

// Public Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuoteModal } from './components/modals/QuoteModal';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { SolutionDetailPage } from './pages/SolutionDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ManufacturingPage } from './pages/ManufacturingPage';
import { EngineeringPage } from './pages/EngineeringPage';
import { ContactPage } from './pages/ContactPage';

// Admin CMS Components
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminHomepageEditor } from './pages/admin/AdminHomepageEditor';
import { AdminPageEditor } from './pages/admin/AdminPageEditor';
import { AdminMediaLibrary } from './pages/admin/AdminMediaLibrary';
import { AdminProductsManager } from './pages/admin/AdminProductsManager';
import { AdminProjectsManager } from './pages/admin/AdminProjectsManager';
import { AdminEnquiriesInbox } from './pages/admin/AdminEnquiriesInbox';
import { AdminCompanySettings } from './pages/admin/AdminCompanySettings';
import { AdminSEOSettings } from './pages/admin/AdminSEOSettings';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminActivityLogs } from './pages/admin/AdminActivityLogs';

// Scroll to top helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Website Layout Shell
const PublicLayout: React.FC = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preselectedSolution, setPreselectedSolution] = useState<string | undefined>(undefined);

  const openQuoteModal = (contextTitle?: string) => {
    setPreselectedSolution(contextTitle);
    setQuoteModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onOpenQuoteModal={() => openQuoteModal()} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage onOpenQuoteModal={() => openQuoteModal()} />} />
          <Route path="/about" element={<AboutPage onOpenQuoteModal={() => openQuoteModal()} />} />
          <Route path="/solutions" element={<SolutionsPage onOpenQuoteModal={() => openQuoteModal()} />} />
          <Route path="/solutions/:slug" element={<SolutionDetailPage onOpenQuoteModal={(title) => openQuoteModal(title)} />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage onOpenQuoteModal={(title) => openQuoteModal(title)} />} />
          <Route path="/manufacturing" element={<ManufacturingPage onOpenQuoteModal={() => openQuoteModal()} />} />
          <Route path="/engineering" element={<EngineeringPage onOpenQuoteModal={() => openQuoteModal()} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedSolution={preselectedSolution}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CMSProvider>
        <ScrollToTop />
        <Routes>
          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/overview" replace />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="homepage" element={<AdminHomepageEditor />} />
            <Route path="pages" element={<AdminPageEditor />} />
            <Route path="media" element={<AdminMediaLibrary />} />
            <Route path="products" element={<AdminProductsManager />} />
            <Route path="projects" element={<AdminProjectsManager />} />
            <Route path="enquiries" element={<AdminEnquiriesInbox />} />
            <Route path="company" element={<AdminCompanySettings />} />
            <Route path="seo" element={<AdminSEOSettings />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="activity" element={<AdminActivityLogs />} />
          </Route>

          {/* Public Corporate Website Catch-all */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </CMSProvider>
    </BrowserRouter>
  );
};

export default App;
