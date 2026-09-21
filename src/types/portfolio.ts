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
