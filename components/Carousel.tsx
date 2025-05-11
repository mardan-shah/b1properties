// components/CarouselSection.tsx
'use client'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ImageWrapper from "@/components/ui/ImageWrapper" // Ensure this path is correct
import { iCarouselImage } from "@/types/types" // Adjust the import based on your types definition
interface Props {
  data: iCarouselImage[];
}

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const CarouselSection: React.FC<Props> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 rounded-lg">
        No images to display
      </div>
    );
  }

  return (
    <Carousel
      responsive={responsive}
      autoPlay={data.length > 1} // Only autoplay if more than one image
      infinite={data.length > 1} // Only loop if more than one image
      arrows={data.length > 1}   // Only show arrows if more than one image
      showDots={data.length > 1} // Only show dots if more than one image
      autoPlaySpeed={4000}
      className="h-full rounded-lg" // Match rounding from FeaturePropertySection's container
      containerClass="h-full"
      itemClass="h-full" // Ensure carousel items take full height
      dotListClass="!bottom-4" // Custom position for dots
    >
      {data.map((item, index) => (
        <div key={index} className="w-full h-full relative">
          <ImageWrapper
            src={item.src}
            alt={item.alt || `Property image ${index + 1}`} // Fallback alt text
            allImages={data.map(d => d.src)} // Pass all image srcs for the dialog gallery
            width={1920} // Max render width
            height={1080} // Max render height
            className="object-cover" // ImageWrapper itself is unrounded, container handles rounding
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw" // Refined sizes prop
            quality={80} // Adjust quality as needed
            priority={index === 0} // Prioritize loading the first image in the carousel
          />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselSection;