import CarouselSection from "@/components/Carousel"
import PropertyCard from "./PropertyCardFeatured"
import { ArrowRight } from "lucide-react"
import ImageWrapper from "@/components/ui/ImageWrapper"

const featuredImages = [
  { src: "/exclusive/Ocean Mansion/images/EXTERIOR_4-2.webp", alt: "Ocean Mansion Exterior View 1" },
  { src: "/exclusive/Ocean Mansion/images/2.webp", alt: "Ocean Mansion Exterior View 2" },
  { src: "/exclusive/Ocean Mansion/images/13.webp", alt: "Ocean Mansion Interior View 1" },
  // Add more images for the carousel as needed
];


const property= [
  {
    id: 1,
    image: "/exclusive/Ocean Mansion/images/EXTERIOR_3-2.webp",
    name: "Bvlgari Ocean Mansion",
    location: "Bvlgari Resorts & Hotel",
    bedrooms: 5,
    bathrooms: 7,
    area: 14127,
    areaUnit: "sq ft",
  },
]

const FeaturedPropertySection  = () => {
  return (   
    <section className="h-screen my-10 md:my-30 mx-[5px]">
      <h1 className="heading">Featured Property</h1>

      <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-2 gap-1 h-screen ">
        
        {/* Carousel */}
        <div className="col-span-2 row-span-1 md:col-span-2 rounded-sm">
          <CarouselSection data={featuredImages} />
        </div>

        {/* Property Card */}
        <div className="col-span-2 row-span-1 md:row-span-2 md:col-start-3 rounded-sm">
          <PropertyCard data={property} />
        </div>

        {/* About Section */}
        <div className="col-span-1 row-span-1 md:row-start-2 rounded-sm bg-black/90 text-white p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-lg md:text-2xl lg:text-3xl md:mt-5 font-bold mb-2">About</h1>
            <h3 className="text:md md:text-xl lg:text-2xl md:pt-2 font-semibold mb-1">
              Bvlgari Ocean Mansion
            </h3>
            <p className="text-xs md:text-md lg:text-lg md:pt-8 text-white/80">
              Elegance by the Sea: the Bvlgari Ocean Mansion of Bvlgari Resorts & Hotel
            </p>
          </div>
          <div className="mt-4 self-end">
            <button className="flex h-8 w-8 -mt-6 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Static Image */}
        <div className="col-span-1 row-span-1 md:row-start-2 rounded-sm">
          <ImageWrapper
            src="/exclusive/Ocean Mansion/images/3.webp"
            width={1920}
            height={1080}
            alt="Ocean Mansion"
            className="h-full w-full object-cover rounded-sm"
            priority
          />
        </div>
      </div>
    </section>
  )
}

export default FeaturedPropertySection 