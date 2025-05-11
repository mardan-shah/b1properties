export interface iPropertyCardProps {
  image: string
  name: string
  location: string
  bedrooms: number
  bathrooms: number
  area: number
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

export interface iPropertyData {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  squareFootageUnit: string;
  images: string[];
  featured: boolean;
  href: string;
}