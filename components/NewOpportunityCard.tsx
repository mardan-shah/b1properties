"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, SquaresSubtract } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import type { IPropertyData } from "@/types/types"
import { Button } from "./ui/button"
import { FaWhatsapp} from 'react-icons/fa'
import { FiPhone } from "react-icons/fi";

interface PropertyCardProps {
  property: IPropertyData
}

export default function NewOpportunityCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Format price with commas
    const formatPrice = (price: number, currency: string = 'AED'): string => {
    if (price >= 1_000_000) {
      return `${(price / 1_000_000).toFixed(1)}M ${currency}`;
    } else if (price >= 1_000) {
      return `${(price / 1_000).toFixed(1)}K ${currency}`;
    }
    return `${currency} ${price}`;
  };
  const formattedPrice = formatPrice(property.price, property.currency);



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
      <Card className="h-full min-w-full group overflow-hidden rounded-sm transition-all duration-300 hover:border border-gray-400">
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
            <Badge className="absolute left-3 top-3 bg-accent text-white backdrop-blur-sm">Featured</Badge>
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
        <CardContent className="px-4">
          <div className="mb-1 space-y-3 border-b-2 border-dashed pb-4 botder-muted-foreground">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium tracking-tight line-clamp-1">{property.title}</h3>
              {property.price ? (
                  <div className="flex items-center gap-1 ">
                    <span className="text-base font-semibold whitespace-nowrap leading-none">{formattedPrice}</span>
                  </div>
              ):(
                  <span className=" text-muted-foreground font-medium leading-none whitespace-nowrap">Price Upon Request</span>
              )}
            </div>
            <div className="mt-1 flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-5 w-5 flex-shrink-0 text-black" />
              <span className="text-sm">{property.location}</span>
            </div>

            <div className="flex items-center gap-1 ">
              <SquaresSubtract className="h-5 w-5 text-black" />
              <span className=" text-muted-foreground font-medium leading-none whitespace-nowrap">  {property.handover}</span>
            </div>
          </div>
          

          <div className="flex justify-center items-center w-full gap-4 py-2">
            <Button className="w-1/2 text-sm flex justify-center hover:bg-accent hover:text-white">
              <span>Call</span>
              <FiPhone size={20} />
            </Button>
            <Button className="w-1/2 flex justify-center text-sm hover:bg-accent hover:text-white">
              <span>WhatsApp</span>
              <FaWhatsapp size={20} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}