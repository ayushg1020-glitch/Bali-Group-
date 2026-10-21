export type UserRole = 'super_admin' | 'editor' | 'viewer';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

export interface CompanySettings {
  name: string;
  tagline: string;
  intro: string;
  logo_url: string;
  footer_logo_url: string;
  favicon_url: string;
  headquarters: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  phones: string[];
  whatsapp: string;
  email: string;
  website_url: string;
  google_maps_url: string;
  social_links: {
    linkedin?: string;
    youtube?: string;
    facebook?: string;
    instagram?: string;
  };
  copyright_text: string;
  stats: {
    years_experience: number;
    countries_count: number;
    installed_capacity_str: string;
    workforce_count: string;
  };
}

export interface HeroSectionContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primary_btn_text: string;
  primary_btn_link: string;
  secondary_btn_text: string;
  secondary_btn_link: string;
  image_url: string;
  mobile_image_url?: string;
  overlay_opacity: number;
}

export interface StatItem {
  id: string;
  label: string;
  number: string;
  suffix: string;
  subtext: string;
  order: number;
}

export interface AboutSectionContent {
  badge: string;
  heading: string;
  subheading: string;
  paragraphs: string[];
  image_url: string;
  cta_text: string;
  cta_link: string;
  highlights: string[];
}

export interface SolutionItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  short_description: string;
  full_description: string;
  image_url: string;
  gallery_images: string[];
  features: string[];
  specifications: Record<string, string>;
  is_featured: boolean;
  order: number;
  published: boolean;
  brochure_url?: string;
  seo_title?: string;
  seo_description?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  location: string;
  client_name?: string;
  capacity: string;
  commodity: string;
  year_completed: string;
  cover_image: string;
  gallery_images: string[];
  description: string;
  technical_specs: Record<string, string>;
  is_featured: boolean;
  order: number;
  published: boolean;
  seo_title?: string;
  seo_description?: string;
}

export interface ManufacturingSectionContent {
  badge: string;
  heading: string;
  description: string;
  facilities: {
    title: string;
    description: string;
    image_url: string;
    points: string[];
  }[];
  quality_commitments: string[];
}

export interface GlobalPresenceContent {
  heading: string;
  description: string;
  countries_list: string[];
  key_regions: {
    name: string;
    projects_summary: string;
    installations: number;
  }[];
}

export interface EnquiryCTAContent {
  heading: string;
  subheading: string;
  btn_text: string;
  btn_link: string;
  contact_hotline: string;
}

export interface EngineeringIntroSectionContent {
  label: string;
  heading: string;
  description: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  highlights?: string[];
}

export interface HomePageContent {
  hero: HeroSectionContent;
  engineering_intro?: EngineeringIntroSectionContent;
  stats: StatItem[];
  about: AboutSectionContent;
  solutions_heading: {
    badge: string;
    title: string;
    subtitle: string;
  };
  projects_heading: {
    badge: string;
    title: string;
    subtitle: string;
  };
  manufacturing: ManufacturingSectionContent;
  global_presence: GlobalPresenceContent;
  why_bali_group: {
    badge: string;
    title: string;
    subtitle: string;
    pillars: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  silo_construction?: SiloConstructionSectionContent;
  enquiry_cta: EnquiryCTAContent;
}

export interface SiloConstructionStage {
  id: string;
  number: string;
  range: [number, number];
  title: string;
  description: string;
  spec_label: string;
  spec_value: string;
}

export interface SiloConstructionSectionContent {
  enabled: boolean;
  badge: string;
  heading: string;
  subheading: string;
  stages: SiloConstructionStage[];
  final_heading: string;
  final_subheading: string;
  cta_btn_text: string;
  cta_btn_link: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  title: string;
  alt_text: string;
  url: string;
  size_bytes: number;
  mime_type: string;
  category: 'hero' | 'silo' | 'project' | 'facility' | 'client' | 'general';
  dimensions?: { width: number; height: number };
  created_at: string;
  usage_count: number;
  referenced_by: string[]; // e.g., ["homepage.hero", "project:10000-tonne-wheat"]
}

export interface EnquirySubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  solution_interest: string;
  project_location: string;
  capacity_needed?: string;
  message: string;
  status: 'new' | 'reviewed' | 'contacted' | 'archived';
  created_at: string;
  is_read: boolean;
  notes?: string;
}

export interface SEOSettings {
  default_title: string;
  title_template: string;
  default_description: string;
  default_keywords: string;
  og_image: string;
  canonical_base: string;
  allow_indexing: boolean;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  user_email: string;
  action: 'create' | 'update' | 'delete' | 'publish' | 'login' | 'revert';
  entity: string;
  details: string;
}
