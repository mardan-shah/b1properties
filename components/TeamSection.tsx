'use client'

import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import TeamCard from '@/components/TeamCard'

interface TeamMember {
  name: string
  photo: string
  languages: string[]
  focusArea: string[]
}

const teamMembers: TeamMember[] = [
  {
    name: 'Adelina',
    photo: '/Adelina.webp',
    languages: ['English', 'Hungarian'],
    focusArea: ['District One', 'Tilal Al Ghaf'],
  },
  {
    name: 'Kamol',
    photo: '/kamol.webp',
    languages: ['Arabic', 'English'],
    focusArea: ['District One', 'District One West'],
  },
  {
    name: 'Laura',
    photo: '/laura.webp',
    languages: ['English', 'French'],
    focusArea: ['Palm Jumeirah'],
  },
  {
    name: 'Ozan',
    photo: '/ozan.webp',
    languages: ['Hindi', 'English'],
    focusArea: ['Palm Jumeirah'],
  },
  {
    name: 'Zilla',
    photo: '/zilla.webp',
    languages: ['Russian', 'Dutch'],
    focusArea: ['Palm Jumeirah', 'Waterfront Villas'],
  },
]

const TeamSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideCount = teamMembers.length

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.1,
      spacing: 10,
    },
    breakpoints: {
      '(min-width: 768px)': {
        slides: { perView: 2, spacing: 5 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 2.5, spacing: 5 },
      },
      '(min-width: 1440px)': {
        slides: { perView: 3.5, spacing: 5 },
      },
      '(min-width: 2000px)': {
        slides: { perView: 4.2, spacing: 5 },
      },
    },
    slideChanged: (slider) => {
      const realIndex = slider.track.details.abs % slideCount
      setCurrentSlide(realIndex)
    },
    created: (instance) => {
      let timeout: ReturnType<typeof setTimeout>
      const nextTimeout = () => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          instance.next()
          nextTimeout()
        }, 3500)
      }
      nextTimeout()
    },
  })

  return (
    <section className="py-10 md:py-20 px-[3px]">
      <h2 className="heading text-center">Meet Our Expert Team</h2>

      <div className="mt-10  mx-auto">
        <div ref={sliderRef} className="keen-slider">
          {teamMembers.map((member, i) => (
            <div
              key={`${member.name}-${i}`}
              className="keen-slider__slide flex justify-center"
            >
              <TeamCard {...member} />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 mt-6">
          {teamMembers.map((_, idx) => {
            const isActive = currentSlide === idx
            return (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`
                  w-5 h-5 rounded-full relative flex items-center justify-center
                  ${isActive ? 'border border-black' : 'border border-transparent'}
                `}
              >
                <span
                  className={`
                    block rounded-full 
                    ${isActive ? 'bg-black w-2.5 h-2.5' : 'bg-gray-300 w-2 h-2'}
                  `}
                />
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
