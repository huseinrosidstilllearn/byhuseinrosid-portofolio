export type PhotoAspectRatio = 'portrait' | 'landscape' | 'square';

export interface PhotoItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  aspectRatio: PhotoAspectRatio;
  location: string;
  year: string;
  description: string;
  featured?: boolean;
  glowColor?: string;
}

export interface PhotoStory {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  images: string[];
  location: string;
  year: string;
  narrative: string;
  quote: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  category: string;
  tagline: string;
  features: string[];
  idealFor: string;
  note: string;
}

export interface PhotographerProfile {
  name: string;
  brandName: string;
  headline: string;
  subheadline: string;
  bioShort: string;
  bioFull: string[];
  philosophy: string;
  location: string;
  availability: string;
  experienceYears: string;
  avatarUrl: string;
}

export interface ContactConfig {
  whatsappNumber: string;
  whatsappDisplay: string;
  instagram: string;
  instagramUrl: string;
  email: string;
  locationDisplay: string;
}

export interface TimelineMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  tags?: string[];
  highlight?: boolean;
}

export interface SkillItem {
  name: string;
  category: 'teknis' | 'editing' | 'softskill' | 'gear';
  level: 'Terampil' | 'Mahir' | 'Ahli';
  icon: string;
  description?: string;
}

export interface JourneyStats {
  totalProjects: number;
  yearsExperience: number;
  citiesVisited: number;
  clientsServed: number;
}

export interface MarqueeConfig {
  speed: 'slow' | 'normal' | 'fast';
  selectionMode: 'featured' | 'manual' | 'all';
  maxItems: number;
  customPhotoIds?: string[];
}

export interface HeroSlideConfig {
  id: string;
  category: string;
  photoId: string; // 'auto' | photo ID
  customTitle?: string;
  customTagline?: string;
  enabled: boolean;
}

export interface HeroSliderConfig {
  autoRotate: boolean;
  intervalSeconds: number;
  slides: HeroSlideConfig[];
}

export type SiteMode = 'landing' | 'karya' | 'perjalanan' | 'cv';

export interface CVExperience {
  role: string;
  entity: string;
  period: string;
  type: 'fotografi' | 'videografi' | 'hybrid';
  description: string;
  highlights: string[];
}

export interface CVEducation {
  institution: string;
  degree: string;
  year: string;
  description?: string;
}

export interface CVPastClient {
  name: string;
  category: string;
}

export type SlotStatus = 'available' | 'limited' | 'in_production' | 'booked' | 'busy' | 'other_event';

export interface ProductionScheduleSlot {
  id: string;
  date: string; // Format 'YYYY-MM-DD'
  status: SlotStatus;
  title: string;
  category?: string;
  location?: string;
  timeSlot?: string;
  notes?: string;
}

export interface SiteContentData {
  profile: PhotographerProfile;
  contact: ContactConfig;
  timeline: TimelineMilestone[];
  skills: SkillItem[];
  services: ServicePackage[];
  stats: JourneyStats;
  marquee?: MarqueeConfig;
  heroSlider?: HeroSliderConfig;
  schedule?: ProductionScheduleSlot[];
  googleCalendarUrl?: string;
}


