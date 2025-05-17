'use client'

import React, {useState} from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { iPropertyData } from '@/types/types'
import LuxuryPropertyCard from '@/components/LuxuryPropertyCard'

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
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.1,
      spacing: 5,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 2.7, spacing: 5 },
      },
       '(min-width: 1440px)': {
        slides: { perView: 3.1, spacing: 5 },
      },
       '(min-width: 2000px)': {
        slides: { perView: 3.4, spacing: 5 },
      },
    },
    slideChanged: (slider) => {
      setCurrentSlide(slider.track.details.rel)
    },
    created: (instance) => {
      let timeout: ReturnType<typeof setTimeout>
      const nextTimeout = () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          instance.next()
          nextTimeout()
        }, 3000)
      }
      nextTimeout()
    },
  })

  return (
    <section className="py-10 md:py-30 px-[3px]">
      <h2 className="heading">Discover Our Private Listings</h2>

      <div ref={sliderRef} className="keen-slider mt-10">
        {exampleProperty.map((property, i) => (
          <div
            key={`${property.id}-${property.title}-${i}`}
            className="keen-slider__slide flex justify-center"
          >
            <LuxuryPropertyCard property={property} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-6">
        {exampleProperty.map((_, idx) => {
          const isActive = currentSlide === idx
          return (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`
                relative w-5 h-5 rounded-full 
                ${isActive ? 'border border-black' : 'border border-transparent'}
                flex items-center justify-center
                transition-colors duration-150
              `}
            >
              <span
                className={`
                  block rounded-full 
                  transition-transform duration-150 ease-out
                  ${isActive 
                    ? 'bg-black transform scale-100 w-2.5 h-2.5' 
                    : 'bg-gray-300 transform scale-90 w-2 h-2'}
                `}
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default PrivateListingSection