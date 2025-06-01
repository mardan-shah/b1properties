'use client'

import React, {useState} from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { exampleProperty } from '../lib/data';

import LuxuryPropertyCard from '@/components/LuxuryPropertyCard'


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
    <section className="py-10 md:py-30 mx-auto rounded-md overflow-hidden">
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