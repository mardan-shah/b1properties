"use client"

import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

const stats = [
  { end: 70, suffix: "+", label: "Villas Sold" },
  { end: 63, label: "Average Days Taken" },
  { end: 16, suffix: "%", label: "Sold Price in Comparison to Top 3" },
  { end: 19, suffix: "%", label: "Price per Sqft in Comparison to Top 3" },
]

export default function StatsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <div ref={ref} className="w-full pt-10 bg-white">
      <div className="max-w-[80%] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center items-center">
        {stats.map((stat, i) => (
          <div key={i} className="relative px-4">
            <div className="text-3xl font-semibold text-black">
              {inView ? (
                <CountUp end={stat.end} duration={2.5} suffix={stat.suffix || ""} />
              ) : (
                <span>0{stat.suffix || ""}</span>
              )}
            </div>
            <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            {i < stats.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 h-8 border-r" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
