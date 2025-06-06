// app/components/ParallaxSection.tsx
'use client'

import React from "react"
import CustomButton from "@/components/ui/CustomButton"

const ParallaxSection = () => {
  return (
    // This single container now handles the background and scrolling
    <div 
      style={{
      height: '90vh',
      background: `url('/exclusive/Mansion Al Barari/images/15.webp')`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      position: 'relative',
      transition: 'all 0.2s ease-in-out',
    }}>

      {/* The content is now placed inside a full-height container to allow scrolling */}
      <div className="h-full flex flex-col justify-center items-center">
        <section className="h-[90vh] w-full flex flex-col justify-center items-center text-center px-6 text-white relative">
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
              className="w-auto md:w-1/2"
            />
          </div>
        </section>
      </div>

    </div>
  )
}

export default ParallaxSection