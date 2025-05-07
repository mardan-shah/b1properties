import CaurosalSection from "@/components/Carousel"
import PropertyCard from "./PropertyGalaryCard"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const featuredImages = [
  {
    src:"/exclusive/Ocean Mansion/images/EXTERIOR_4-2.webp"
  },
  {
    src:"/exclusive/Ocean Mansion/images/2.webp"
  },
  {
    src:"/exclusive/Ocean Mansion/images/13.webp"
  }
]

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
  // You can add more properties here
]

const FeaturedPropertySection  = () => {
  return (   
    <section className="h-screen my-10">
      <h1 className="text-3xl font-bold text-center my-6">Featured Property</h1>
      <div className="grid grid-cols-5 grid-rows-4 gap-4 h-[80vh] mx-10">
          <div className="col-span-3 row-span-2 rounded-md"><CaurosalSection data={featuredImages}/></div>
          <div className="col-span-2 row-span-4 col-start-4 rounded-md"><PropertyCard data={property}/></div>
          <div className="col-span-2 row-span-2 row-start-3 rounded-md bg-black/90 text-white p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-xl font-bold mb-2">About</h1>
              <h3 className="text-lg font-semibold mb-1">Bvlgari Ocean Mansion</h3>
              <p className="text-sm text-white/80">
                Elegance by the Sea: the Bvlgari Ocean Mansion of Bvlgari Resorts & Hotel
              </p>
            </div>
            <div className="mt-4 self-end">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="row-span-2 col-start-3 row-start-3 rounded-md">
            <Image src='/exclusive/Ocean Mansion/images/3.webp' width={1500} height={1000} alt="Ocean Mansion" className="h-full w-full object-cover rounded-md" priority/>
          </div>
      </div>  
    </section>
  )
}

export default FeaturedPropertySection 