import React from 'react'
import { iPropertyData } from '@/types/types'
import LuxuryPropertyCard from '@/components/PropertyCard'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const exampleProperty: iPropertyData[] = [
  {
    id: "villa-123",
    title: "Custom-Built Signature Villa",
    location: "Palm Jumeirah, Dubai",
    price: 250000000,
    currency: "AED",
    bedrooms: 5,
    bathrooms: 7,
    squareFootage: 15190.3,
    squareFootageUnit: "Sq.Ft",
    images: [
      "/exclusive/j20/images/0.png",
      "/exclusive/j20/images/bath1.webp",
      "/exclusive/j20/images/bed 1.webp",
      "/exclusive/j20/images/cinema.webp",
      "/exclusive/j20/images/dining formal.webp",
      "/exclusive/j20/images/gym.webp",
    ],
    featured: true,
    href: "/property/custom-built-signature-villa",
  },
  {
    id: "billionaires-row",
    title: "Billionaires Row Signature Villa",
    location: "Dubai Marina, Dubai",
    price: 150000000,
    currency: "AED",
    bedrooms: 6,
    bathrooms: 8,
    squareFootage: 12000,
    squareFootageUnit: "Sq.Ft",
    images: [
      "/exclusive/g11/images/home.png",
      "/exclusive/g11/images/1.webp",
      "/exclusive/g11/images/2.webp",
      "/exclusive/g11/images/3.webp",
      "/exclusive/g11/images/4.webp",
      "/exclusive/g11/images/5.webp",
    ],
    featured: false,
    href: "/property/luxury-villa",
  },
  {
    id: "palm-villa-456",
    title: "Custom-Built Signature Villa",
    location: "Palm Jumeirah, Dubai",
    price: 250000000,
    currency: "AED",
    bedrooms: 5,
    bathrooms: 7,
    squareFootage: 15190.3,
    squareFootageUnit: "Sq.Ft",
    images: [
      "/exclusive/j20/images/0.png",
      "/exclusive/j20/images/bath1.webp",
      "/exclusive/j20/images/bed 1.webp",
      "/exclusive/j20/images/cinema.webp",
      "/exclusive/j20/images/dining formal.webp",
      "/exclusive/j20/images/gym.webp",
    ],
    featured: true,
    href: "/property/custom-built-signature-villa",
  },
]

const PrivateListingSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
          Discover Our Private Listings
        </h2>
        
        <div className="max-w-screen-2xl mx-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {exampleProperty.map((property) => (
              <div key={`${property.id}-${property.title}`} className="flex justify-center">
                <LuxuryPropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link href='/private-listings' className='flex justify-center'>
            <Button className='my-10 w-2/12 p-5  hover:bg-accent transition'>Learn More</Button>
      </Link>
    </section>
  )
}

export default PrivateListingSection