'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselItemData = {
  image: string;
  title: string;
  subtitle: string;
  price?: string;
  link: string;
};

interface HeroProps {
  data: CarouselItemData[];
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const Hero: React.FC<HeroProps> = ({ data }) => {
  const [carouselData, setCarouselData] = useState<CarouselItemData[]>(data);

  useEffect(() => {
    if (data) {
      setCarouselData(data);
    }
  }, [data]);

  return (
    <section className="relative">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .fade-in {
          animation: fadeIn 1.2s ease-in-out;
        }
        :global(.react-multi-carousel-dot button) {
          background: white !important;
        }
        :global(.react-multi-carousel-dot--active button) {
          background: #8B6529 !important;
        }
      `}</style>
      <Carousel
      
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={6000}
        arrows
        
        showDots={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
        customLeftArrow={
          <div className="absolute inset-y-0 left-4 z-20 flex items-center">
            <button className="bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-lg">
              <ChevronLeft className="h-6 w-6 text-black" />
            </button>
          </div>
        }
        customRightArrow={
          <div className="absolute inset-y-0 right-4 z-20 flex items-center">
            <button className="bg-white/60 hover:bg-white/80 rounded-full p-2 shadow-lg">
              <ChevronRight className="h-6 w-6 text-black" />
            </button>
          </div>
        }
      >
        {carouselData.map((item, index) => (
          <div key={index} className="relative w-full h-screen">
            <Image
              src={item.image}
              alt={item.title}
              width={1920}
              height={1080}
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="cl-container text-center text-white px-4">
                <div className="text-lg mb-2 font-medium">{item.subtitle}</div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">{item.title}</h1>
                <div className="text-xl mb-4">{item.price || "Price Upon Request"}</div>
                <Link
                  href={item.link}
                  className="bg-black/80 text-white px-6 py-2 rounded-sm font-semibold inline-flex items-center gap-2 hover:bg-accent transition"
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Hero;
