export interface iPropertyCardProps {
  image: string
  name: string
  location: string
  bedrooms?: number
  bathrooms?: number
  area?: number | null
  areaUnit?: string
}


export interface iCarouselItemData {
  image: string;
  title?: string;
  subtitle?: string;
  price?: string;
  link?: string;
};

export interface iCarouselImage {
  src: string;
  alt: string; // Added alt text for each image
}

export interface IHighlight {
  title: string;
  subtitle: string;
}

export interface IDesignerItem {
  title: string;
  subtitle: string;
}

export interface IFeatureCategory {
  category: string;
  items: string[];
}

export interface IPropertyData {
  id: string;
  title: string;
  heading?:string;
  subtitle?: string;
  developedBy?: string;
  bua?: string;
  parking?: string;
  location: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  plotSize: number;
  plotSizeUnit?: string;
  images: string[];
  featured?: boolean;
  href: string;
  tag?: string;
  description?: string[];
  highlight?: IHighlight[];
  qrImg?: string;
  youTubeLink?: string;
  designer?: IDesignerItem[];
  features?: IFeatureCategory[];
  assignedAgent?: string;
}


export interface iMansion {
  name : string;
  subtitle : string;
  priceUnit : string;
  price : number | string;
  DevelopedBy : string;
  BUA : number | string;
  plotSize : number | string;
  bedrooms : number;
  bathrooms : number;
  parking : string;
  images : string[];
}

export interface iTeamMember {
  name: string
  photo: string
  languages: string[]
  focusArea: string[]
  cell?:string;
  whatsapp?:string;
  email?: string;
  description?:string[];
  properties?:string[];
}