// app/components/ParallaxSection.tsx
'use client'

import React from "react"
import CustomButton from "@/components/ui/CustomButton"
import { Parallax } from 'react-parallax'

const ParallaxSection = () => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage="/exclusive/Mansion Al Barari/images/15.webp"
      bgImageAlt="Luxury Mansion"
      strength={500}
      className="h-[90vh]"
    >
      <section className="h-[90vh] w-full flex flex-col justify-center items-center text-center px-6 text-white">
        <div className="bg-black/40 w-full h-full absolute inset-0 z-[1]" />
        <div className="relative z-[2] flex flex-col gap-3 md:gap-5 items-center">
          <h1 className="text-4xl font-bold drop-shadow-lg">
            Discover a Place You&apos;ll Love To Live
          </h1>
          <p className="text-lg text-white/80">
            Shaping Signature Lifestyles | Unmatched Expertise
          </p>
          <CustomButton 
            title="Discover Investment Opportunities"
            arrow
            className="w-1/2"
          />
        </div>
      </section>
    </Parallax>
  )
}

export default ParallaxSection
