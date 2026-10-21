-- ==============================================================================
-- BALI GROUP INDIA — PRODUCTION POSTGRESQL SCHEMA WITH ROW LEVEL SECURITY (RLS)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USER ROLES & PROFILES
CREATE TYPE user_role AS ENUM ('super_admin', 'editor', 'viewer');

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'viewer',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. SITE SETTINGS & COMPANY INFO
CREATE TABLE IF NOT EXISTS public.site_settings (
    id TEXT PRIMARY KEY DEFAULT 'current',
    company_name TEXT NOT NULL DEFAULT 'Bali Group India',
    tagline TEXT NOT NULL,
    intro TEXT NOT NULL,
    logo_url TEXT NOT NULL,
    footer_logo_url TEXT,
    favicon_url TEXT,
    headquarters JSONB NOT NULL,
    phones TEXT[] NOT NULL DEFAULT '{}',
    whatsapp TEXT,
    email TEXT NOT NULL,
    website_url TEXT,
    google_maps_url TEXT,
    social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
    stats JSONB NOT NULL DEFAULT '{}'::jsonb,
    copyright_text TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 4. MEDIA ASSETS
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    title TEXT NOT NULL,
    alt_text TEXT,
    url TEXT NOT NULL UNIQUE,
    storage_path TEXT,
    size_bytes BIGINT NOT NULL,
    mime_type TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    dimensions JSONB,
    usage_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- 5. MEDIA REFERENCES (PROTECT AGAINST ACCIDENTAL DELETION)
CREATE TABLE IF NOT EXISTS public.media_references (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    media_asset_id UUID NOT NULL REFERENCES public.media_assets(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL, -- 'hero', 'section', 'product', 'project'
    entity_id TEXT NOT NULL,
    field_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.media_references ENABLE ROW LEVEL SECURITY;

-- 6. PRODUCTS & SOLUTIONS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}',
    features TEXT[] DEFAULT '{}',
    specifications JSONB DEFAULT '{}'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    brochure_url TEXT,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 7. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    location TEXT NOT NULL,
    client_name TEXT,
    capacity TEXT NOT NULL,
    commodity TEXT NOT NULL,
    year_completed TEXT,
    cover_image TEXT NOT NULL,
    gallery_images TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    technical_specs JSONB DEFAULT '{}'::jsonb,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT true,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 8. PAGE SECTIONS & DRAFT/PUBLISHED REVISIONS
CREATE TABLE IF NOT EXISTS public.page_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_key TEXT NOT NULL, -- 'home', 'about', 'manufacturing', 'engineering'
    section_key TEXT NOT NULL, -- 'hero', 'stats', 'about', 'why_bali'
    display_order INT NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    published_content JSONB NOT NULL DEFAULT '{}'::jsonb,
    draft_content JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;

-- 9. CUSTOMER ENQUIRIES (PRIVATE & SECURE)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    solution_interest TEXT NOT NULL,
    project_location TEXT NOT NULL,
    capacity_needed TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'reviewed', 'contacted', 'archived'
    is_read BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 10. ACTIVITY LOGS (AUDIT TRAIL)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 11. SEO SETTINGS
CREATE TABLE IF NOT EXISTS public.seo_settings (
    id TEXT PRIMARY KEY DEFAULT 'current',
    default_title TEXT NOT NULL,
    title_template TEXT NOT NULL,
    default_description TEXT NOT NULL,
    default_keywords TEXT NOT NULL,
    og_image TEXT NOT NULL,
    canonical_base TEXT NOT NULL,
    allow_indexing BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Helper function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role IN ('super_admin', 'editor')
        FROM public.profiles
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public can read published content only
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view media assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Public can view published products" ON public.products FOR SELECT USING (published = true);
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Public can view page sections" ON public.page_sections FOR SELECT USING (is_visible = true);
CREATE POLICY "Public can view SEO settings" ON public.seo_settings FOR SELECT USING (true);

-- Public can INSERT enquiries, but cannot read or view anyone's enquiries
CREATE POLICY "Public can insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public cannot view enquiries" ON public.enquiries FOR SELECT USING (public.is_admin());

-- Authorized admins/editors can perform all CRUD operations
CREATE POLICY "Admins full access to site_settings" ON public.site_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access to media_assets" ON public.media_assets FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access to media_references" ON public.media_references FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access to products" ON public.products FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access to projects" ON public.projects FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access to page_sections" ON public.page_sections FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access to enquiries" ON public.enquiries FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access to activity_logs" ON public.activity_logs FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access to seo_settings" ON public.seo_settings FOR ALL USING (public.is_admin());
