import React from "react"
import CustomButton from "@/components/ui/CustomButton"

const ParallaxSection = () => {
  return (
    <section
      className="relative h-[90vh] w-full bg-fixed bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(0,0,0,.1) 0%,
            rgba(0,0,0,0.3) 30%,
             rgba(0,0,0,0.6) 80%,
            rgba(0,0,0,0.8) 100%
          ),
          url('/exclusive/Mansion Al Barari/images/15.webp')
        `,
      }}
    >
      <div className="relative flex flex-col gap-3 md:gap-5 justify-center items-center z-10 text-center text-white px-6">
        <h1 className="text-4xl">
          Discover a Place You&apos;ll Love To Live
        </h1>
        <p className="text-lg text-white/80">
          Shaping Signature Lifestyles | Unmatched Expertise
        </p>
        <CustomButton 
          title='Discover Investment Opportunities'
          arrow
        />
      </div>
    </section>
  )
}

export default ParallaxSection
