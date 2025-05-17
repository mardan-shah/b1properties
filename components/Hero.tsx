'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Carousel, { ArrowProps } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { iCarouselItemData } from '@/types/types';
import CustomButton from './ui/CustomButton';

interface iHeroProps {
  data: iCarouselItemData[];
}

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
  mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-lg"
    aria-label="Previous slide"
  >
    <ChevronLeft className="h-3 w-3 sm:h-6 sm:w-6 text-black" />
  </button>
);

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-lg"
    aria-label="Next slide"
  >
    <ChevronRight className="h-3 w-3 sm:h-6 sm:w-6 text-black" />
  </button>
);

const Hero: React.FC<iHeroProps> = ({ data }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-screen bg-gray-200"></div>;
  }

  return (
    <section className="relative">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .fade-in {
          animation: fadeIn 1.2s ease-in-out;
        }
        :global(.react-multi-carousel-dot button) {
          background: white !important;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin: 0 4px;
          padding: 0;
        }
        :global(.react-multi-carousel-dot--active button) {
          background: #8B6529 !important;
          width: 10px;
          height: 10px;
        }
      `}</style>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={6000}
        showDots
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        ssr
        keyBoardControl
      >
        {data.map((item, index) => (
          <div key={index} className="relative w-full h-screen">
            <Image
              src={item.image}
              alt={item.title || `Image ${index + 1}`}
              width={1920}
              height={1080}
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className=" text-center text-white px-4">
                {item.subtitle && (
                  <div className="text-[1rem] text-lg mb-1 md:mb-2 font-medium">{item.subtitle}</div>
                )}
                {item.title && (
                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-1 md:mb-2">{item.title}</h1>
                )}
                {item.price && <div className="text-sm md:text-xl mb-6 md:mb-4">{item.price}</div>}
                {item.link && (
                  <Link href={item.link}  className='flex justify-center'>
                    <CustomButton 
                      title='View Details'
                      className='btn'
                      arrow
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Hero;
