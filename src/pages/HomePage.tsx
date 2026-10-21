import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { ClientsCarousel } from '../components/home/ClientsCarousel';
import { StatsSection } from '../components/home/StatsSection';
import { AboutSection } from '../components/home/AboutSection';
import { SiloConstructionSection } from '../components/silo3d/SiloConstructionSection';
import { SolutionsGrid } from '../components/home/SolutionsGrid';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { ManufacturingSection } from '../components/home/ManufacturingSection';
import { GlobalPresenceSection } from '../components/home/GlobalPresenceSection';
import { WhyBaliSection } from '../components/home/WhyBaliSection';
import { EnquiryCTASection } from '../components/home/EnquiryCTASection';
import { useCMS } from '../context/CMSContext';

interface HomePageProps {
  onOpenQuoteModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal }) => {
  const { homePageContent } = useCMS();

  return (
    <div className="bg-white min-h-screen">
      {/* SECTION 01: HERO */}
      <HeroSection onOpenQuoteModal={onOpenQuoteModal} />

      {/* CLIENT LOGOS STRIP */}
      <ClientsCarousel />

      {/* SECTION 02: COMPANY STATS */}
      <StatsSection />

      {/* SECTION 03: ABOUT BALI GROUP */}
      <AboutSection />

      {/* NEW: SCROLL-DRIVEN SILO CONSTRUCTION (3D CINEMATIC) */}
      <SiloConstructionSection content={homePageContent.silo_construction} />

      {/* SECTION 04: OUR SOLUTIONS */}
      <SolutionsGrid />

      {/* SECTION 05: FEATURED PROJECTS */}
      <FeaturedProjects />

      {/* SECTION 06: MANUFACTURING */}
      <ManufacturingSection />

      {/* SECTION 07: GLOBAL PRESENCE */}
      <GlobalPresenceSection />

      {/* SECTION 08: WHY BALI GROUP */}
      <WhyBaliSection />

      {/* SECTION 09: ENQUIRY CTA */}
      <EnquiryCTASection onOpenQuoteModal={onOpenQuoteModal} />
    </div>
  );
};
