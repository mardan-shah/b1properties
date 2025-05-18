// app/components/ParallaxSection.tsx
'use client'

import React from "react"
import CustomButton from "@/components/ui/CustomButton"

const ParallaxSection = () => {
  return (
    <section className=" h-[90vh] w-full overflow-hidden">
      <div className="relative h-[90vh] w-full">
        <div
          className="absolute inset-0 bg-center bg-cover bg-fixed"
          style={{
            backgroundImage: `
              linear-gradient(
                to bottom,
                rgba(0,0,0,0.1) 0%,
                rgba(0,0,0,0.3) 30%,
                rgba(0,0,0,0.6) 80%,
                rgba(0,0,0,0.8) 100%
              ),
              url('/exclusive/Mansion Al Barari/images/15.webp')
            `,
          }}
        />

        <div className="relative z-10 flex flex-col gap-3 md:gap-5 justify-center items-center h-full px-6 text-white text-center">
          <h1 className="text-4xl font-bold drop-shadow-lg">
            Discover a Place You&apos;ll Love To Live
          </h1>
          <p className="text-lg text-white/80">
            Shaping Signature Lifestyles | Unmatched Expertise
          </p>
          <CustomButton 
            title="Discover Investment Opportunities"
            arrow
          />
        </div>
      </div>
    </section>
  )
}

export default ParallaxSection
