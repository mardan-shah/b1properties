"use client"

import { MapPin, Bed, Bath, SquaresSubtract, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { iPropertyCardProps } from "@/types/types"
import ImageWrapper from "./ui/ImageWrapper"

interface iProps {
  data: iPropertyCardProps[]
}
const PropertyCard: React.FC<iProps> = ({ data }) => {
  return (
    <>
      {data.map((property, index) => (
        <Card key={index} className="group m-0 p-0 h-full overflow-hidden rounded-lg border-0 shadow-sm transition-all hover:shadow-md">
          <div className="relative h-full w-full overflow-hidden">
            <ImageWrapper
              src={property.image || "/placeholder.svg"}
              alt={property.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />

            <div className="absolute md:bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h2 className="mb-15 sm:mb-1 text-2xl font-semibold">{property.name}</h2>

              <div className="flex items-center gap-1 text-white/90">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{property.location}</span>
              </div>

              <div className="mt-4 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5" />
                  <span>{property.bedrooms}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5" />
                  <span>{property.bathrooms}</span>
                </div>

                <div className="flex items-center gap-2">
                  <SquaresSubtract className="h-5 w-5" />
                  <span>
                    {(property.area ?? 0).toLocaleString()} {property.areaUnit ?? ""}
                  </span>
                </div>

                <div className="ml-auto">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}


export default PropertyCard