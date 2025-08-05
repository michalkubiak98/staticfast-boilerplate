import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    // Business Details
    BUSINESS_NAME: process.env.BUSINESS_NAME,
    BUSINESS_TAGLINE: process.env.BUSINESS_TAGLINE,
    BUSINESS_DESCRIPTION: process.env.BUSINESS_DESCRIPTION,
    
    // Contact Info
    PHONE: process.env.PHONE,
    EMAIL: process.env.EMAIL,
    ADDRESS: process.env.ADDRESS,
    
    // Domain
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    
    // Branding
    PRIMARY_COLOR: process.env.PRIMARY_COLOR,
    SECONDARY_COLOR: process.env.SECONDARY_COLOR,
    ACCENT_COLOR: process.env.ACCENT_COLOR,
    LOGO_PATH: process.env.LOGO_PATH,
    
    // Hero Content
    HERO_BADGE_TEXT: process.env.HERO_BADGE_TEXT,
    HERO_TITLE_LINE1: process.env.HERO_TITLE_LINE1,
    HERO_TITLE_LINE2: process.env.HERO_TITLE_LINE2,
    HERO_SUBTITLE: process.env.HERO_SUBTITLE,
    
    // Services
    SERVICE_1_NAME: process.env.SERVICE_1_NAME,
    SERVICE_1_PRICE: process.env.SERVICE_1_PRICE,
    SERVICE_1_DURATION: process.env.SERVICE_1_DURATION,
    SERVICE_1_DESCRIPTION: process.env.SERVICE_1_DESCRIPTION,
    
    SERVICE_2_NAME: process.env.SERVICE_2_NAME,
    SERVICE_2_PRICE: process.env.SERVICE_2_PRICE,
    SERVICE_2_DURATION: process.env.SERVICE_2_DURATION,
    SERVICE_2_DESCRIPTION: process.env.SERVICE_2_DESCRIPTION,
    
    SERVICE_3_NAME: process.env.SERVICE_3_NAME,
    SERVICE_3_PRICE: process.env.SERVICE_3_PRICE,
    SERVICE_3_DURATION: process.env.SERVICE_3_DURATION,
    SERVICE_3_DESCRIPTION: process.env.SERVICE_3_DESCRIPTION,
    
    // SEO
    META_TITLE: process.env.META_TITLE,
    META_DESCRIPTION: process.env.META_DESCRIPTION,
    META_KEYWORDS: process.env.META_KEYWORDS,
  }
};

export default nextConfig;
