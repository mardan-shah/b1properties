'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, memo } from 'react';
import Carousel, { ArrowProps } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { iCarouselItemData } from '@/types/types';
import CustomButton from './ui/CustomButton';

interface iHeroProps {
  data: iCarouselItemData[];
  autoPlaySpeed?: number;
}

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const CustomLeftArrow = memo(({ onClick }: ArrowProps) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-lg transition-colors"
    aria-label="Previous slide"
  >
    <ChevronLeft className="h-3 w-3 sm:h-6 sm:w-6 text-black" />
  </button>
));

const CustomRightArrow = memo(({ onClick }: ArrowProps) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-lg transition-colors"
    aria-label="Next slide"
  >
    <ChevronRight className="h-3 w-3 sm:h-6 sm:w-6 text-black" />
  </button>
));

const CarouselItem = memo(({ item, index }: { item: iCarouselItemData; index: number }) => (
  <div key={index} className="relative h-[50vh] sm:h-[60vh] md:h-[75vh] lg:h-screen w-full">
    <Image
      src={item.image}
      alt={item.title || `Carousel image ${index + 1}`}
      width={1920}
      height={1080}
      style={{ objectFit: 'cover' }}
      className="w-full h-full"
      priority={index === 0}
      loading={index === 0 ? "eager" : "lazy"}
    />
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-lora">
      <div className="text-center text-white px-4 fade-in">
        {item.subtitle && (
          <div className="text-[1rem] text-lg mb-1 md:mb-2">{item.subtitle}</div>
        )}
        {item.title && (
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-playfairDisplay mb-1 md:mb-2">{item.title}</h1>
        )}
        {item.price && <div className="text-sm md:text-xl mb-6 md:mb-4">{item.price}</div>}
        {item.link && (
          <Link href={item.link} className="flex justify-center" aria-label={`View details for ${item.title || 'featured item'}`}>
            <CustomButton 
              title="View Details"
              className="btn"
              arrow
            />
          </Link>
        )}
      </div>
    </div>
  </div>
));

CarouselItem.displayName = 'CarouselItem';
CustomLeftArrow.displayName = 'CustomLeftArrow';
CustomRightArrow.displayName = 'CustomRightArrow';

const Hero = ({ data, autoPlaySpeed = 6000 }: iHeroProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return <div className="w-full h-screen bg-gray-200" aria-label="Loading carousel"></div>;
  }

  return (
    <section className="relative" aria-label="Featured content carousel">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fadeIn 1.2s ease-in-out;
        }
        .react-multi-carousel-dot button {
          background: white !important;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: 0 4px;
          padding: 0;
          border: none;
          transition: all 0.2s ease;
        }
        .react-multi-carousel-dot--active button {
          background: #8B6529 !important;
          width: 10px;
          height: 10px;
        }
        .carousel-container {
          position: relative;
        }
      `}</style>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={autoPlaySpeed}
        showDots
        containerClass="carousel-container"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        ssr
        keyBoardControl
        removeArrowOnDeviceType={["mobile"]}
        dotListClass="custom-dot-list-style"
      >
        {data.map((item, index) => (
          <CarouselItem key={`carousel-item-${index}`} item={item} index={index} />
        ))}
      </Carousel>
    </section>
  );
};

export default memo(Hero);