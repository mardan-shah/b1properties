"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, LandPlot } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import type { iPropertyData } from "@/types/types"

interface PropertyCardProps {
  property: iPropertyData
}

export default function LuxuryPropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Format price with commas
  const formattedPrice = property.price.toLocaleString()

  // Handle image carousel on hover
  useEffect(() => {
    if (isHovering && property.images.length > 1) {
      // Immediately change to the next image when hover starts
      setCurrentImageIndex((prevIndex) => (prevIndex === property.images.length - 1 ? 0 : prevIndex + 1))

      // Set up interval for subsequent changes
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex === property.images.length - 1 ? 0 : prevIndex + 1))
      }, 2000) // Change image every 2 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        setCurrentImageIndex(0) // Reset to first image when hover ends
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovering, property.images.length])

  return (
    <Link href={property.href} className="block w-full max-w-xl">
      <Card className="h-full min-w-full  group overflow-hidden rounded-xl border shadow-md transition-all duration-300 hover:shadow-xl">
        {/* Property Image Carousel */}
        <div className="relative -mt-6" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="aspect-[16/9] w-full overflow-hidden">
            <div className="relative h-full w-full">
              {property.images.map((src, index) => (
                <Image
                  key={index}
                  src={src || "/placeholder.svg"}
                  alt={`${property.title} image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`object-cover transition-opacity duration-500 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                  priority={index === 0}
                />
              ))}
            </div>
          </div>
          {property.featured && (
            <Badge className="absolute left-3 top-3 bg-black text-white backdrop-blur-sm">Featured</Badge>
          )}

          {/* Image indicator dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Property Details */}
        <CardContent className="p-4 sm:p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold tracking-tight line-clamp-1">{property.title}</h3>
            <div className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          <div className="grid grid-cols-5 border-t border-muted pt-4">
            <div className="col-span-1 flex gap-2 items-center justify-center min-h-[48px]">
              <Bed className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium leading-none">{property.bedrooms}</span>
            </div>

            <div className="col-span-1 flex gap-2 items-center justify-center min-h-[48px]">
              <Bath className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium leading-none">{property.bathrooms}</span>
            </div>

            <div className="col-span-1 flex gap-2 items-center justify-center min-h-[48px]">
              <LandPlot className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium leading-none whitespace-nowrap">{property.squareFootage}</span>
            </div>

            <div className="col-span-2 flex gap-2 items-center justify-center min-h-[48px]">
              <span className="text-xs text-muted-foreground leading-none">{property.currency}</span>
              <span className="text-accent font-medium whitespace-nowrap leading-none">{formattedPrice}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}