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
  cell?:string;
  whatsapp?:string;
  email?: string;
  description?:string[];
  properties?:string[];
}

const teamMembers: TeamMember[] = [
  {
    name: 'Adelina',
    photo: '/Adelina.webp',
    languages: ['English', 'Italian', 'Romania','Russian'],
    focusArea: ['District One', 'Tilal Al Ghaf'],
    cell: '+971 56 433 8399',
    whatsapp: '+971 56 433 8399',
    email:'adelina@b1properties.ae',
    description : [
      'Adelina brings six years of distinguished real estate experience, including tenure with one of Dubai’s most exclusive boutique developers, where she curated luxury properties for discerning local and international clientele. Her unique background combines hands-on industry expertise with formal training in Civil Engineering, giving her unparalleled insight into authentic quality craftsmanship.',
      'With a professional engineer’s eye for detail, Adelina possesses exceptional discernment for genuine luxury finishes and architectural integrity. Her technical knowledge enables her to expertly guide clients through every aspect of premium property investment, distinguishing between superficial glamour and truly exceptional design.',
      'Adelina’s unique value proposition lies in this rare combination of technical expertise and luxury market experience, allowing her to provide clients with authoritative advice on Dubai’s most exclusive properties. Her approach transforms property selection into an educated pursuit of perfection.'
    ],
    properties : [
      'Lagoon Views',
      'Bluewater Bay',
      'Beach Gate',
      'Sunrise Bay',
      'Tower B Damac Bay',
    ]

  },
  {
    name: 'Kamol',
    photo: '/kamol.webp',
    languages: ['Uzbek', 'English', 'Russian'],
    focusArea: ['District One', 'District One West'],
    cell: '+971 56 433 8399',
    whatsapp: '+971 56 433 8399',
    email:'kamol@b1properties.ae',
    description : [
      'Kamol embodies professionalism, integrity, and market expertise - qualities that have established him as one of Dubai’s most trusted real estate advisors. With extensive experience in Dubai’s luxury property sector, he consistently delivers exceptional service and strategic guidance to his discerning clientele.',
      'Specializing in Dubai’s most exclusive neighborhoods including Bluewaters Island and Palm Jumeirah, Kamol combines deep local knowledge with a client-first philosophy. His commitment to excellence ensures every transaction achieves outstanding results for both buyers and sellers in these premium markets.'
    ],
    properties : [
      'D1 West Villa'
    ]
  },
  {
    name: 'Laura',
    photo: '/laura.webp',
    languages: ['English', 'French'],
    focusArea: ['Palm Jumeirah'],
    cell: '0316016069',
    whatsapp: '02313051312',
  },
  {
    name: 'Ozan',
    photo: '/ozan.webp',
    languages: ['Hindi', 'English'],
    focusArea: ['Palm Jumeirah'],
    cell: '0316016069',
    whatsapp: '02313051312',
  },
  {
    name: 'Zilla',
    photo: '/zilla.webp',
    languages: ['Russian', 'Dutch'],
    focusArea: ['Palm Jumeirah', 'Waterfront Villas'],
    cell: '0316016069',
    whatsapp: '02313051312',
  },
]
interface Props{
  button?:boolean;
}
const TeamSection = ({button=false}:Props) => {
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
              <TeamCard data={member} showButton={button}/>
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
