'use client'

import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { teamMembers } from '@/lib/data'
import TeamCard from '@/components/TeamCard'


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
        slides: { perView: 2.7, spacing: 5 },
      },
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 5 },
      },
      '(min-width: 1440px)': {
        slides: { perView: 3.5, spacing: 5 },
      },
      '(min-width: 2000px)': {
        slides: { perView: 4.1, spacing: 5 },
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
    <section className="py-10 md:py-20">
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
