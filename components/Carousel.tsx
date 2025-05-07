// components/CarouselSection.tsx
'use client'
import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

interface CarouselImage {
  src: string
}

interface Props {
  data: CarouselImage[]
}

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
}

const CarouselSection: React.FC<Props> = ({ data }) => {
  return (
    <Carousel
      responsive={responsive}
      autoPlay
      infinite
      arrows
      autoPlaySpeed={4000}
      className="h-full"
      containerClass="h-full"
      dotListClass="!bottom-4"
    >
      {data.map((item, index) => (
        <div key={index} className="w-full h-full relative">
          <Image
            width={2000}
            height={2000}
            src={item.src}
            alt={`Slide ${index + 1}`}
            className="object-cover rounded-sm "
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={100}
          />
        </div>
      ))}
    </Carousel>
  )
}

export default CarouselSection
