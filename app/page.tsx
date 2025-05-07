import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { ChevronRight } from 'lucide-react';
import FeatruredPropertySection from '@/components/FeaturedPropertySection ';

const page = () => {
  const carouselData = [
    {
      image: "/exclusive/bvlgari/1.webp",
      subtitle: "Bvlgari Resorts & Hotel",
      title: "Bvlgari Mansion",
      price: "AED 495,000,000",
      link: "exclusive/Bvlgari.html",
    },
    {
      image: "/exclusive/j20/images/home.webp",
      subtitle: "Palm Jumeirah",
      title: "Custom-built Signature Villa",
      price: "AED 250,000,000",
      link: "exclusive/Villa Frond J.html",
    },
    {
      image: "/exclusive/Ocean Mansion/images/EXTERIOR_3-2.webp",
      subtitle: "Bvlgari Resorts & Hotel",
      title: "Bvlgari Ocean Mansion",
      price: "AED 180,000,000",
      link: "exclusive/ocean mansion.html",
    },
    {
      image: "/exclusive/g11/images/home.png",
      subtitle: "Palm Jumeirah",
      title: "Billionaires’ Row Signature Villa",
      price: "AED 165,000,000",
      link: "exclusive/La Solaro.html",
    },
    {
      image: "/exclusive/Villa Palm/images/home.webp",
      subtitle: "Palm Jumeirah",
      title: "Modern Garden Villa",
      price: "Price Upon Request",
      link: "exclusive/Villa Palm.html",
    },
    {
      image: "/exclusive/Villa Frond A/images/1.webp",
      subtitle: "Palm Jumeirah",
      title: "Signature Villa",
      price: "AED 135,000,000",
      link: "exclusive/Villa Frond A.html",
    },
    {
      image: "/exclusive/Villa Frond L/images/36-2.webp",
      subtitle: "Palm Jumeirah",
      title: "Villa Frond L",
      price: "AED 65,000,000",
      link: "exclusive/Villa Frond L.html",
    },
    {
      image: "/exclusive/Mansion Al Barari/images/0.png",
      subtitle: "Al Barari",
      title: "Mansion Al Barari",
      price: "AED 75,000,000",
      link: "exclusive/mansion al barari.html",
    }
  ];

  return (
    <>
      <Hero data={carouselData} />
      <div className='my-10 py-10'>
        <h1 className="text-4xl font-bold text-center mt-10">
          Shaping <span className="text-accent">Signature Lifestyles</span>
        </h1>
        <h2 className="text-3xl text-center mt-4">
          Unmatched <span className="text-accent">Expertise</span>
        </h2>
        <hr className="w-4/5 border-t-2 border-accent mx-auto my-4" />
        <p className="text-center text-lg px-4">
          We bring you the city&apos;s most extraordinary homes, connect with us and secure your place among the elite.
        </p>
        <div className="flex justify-center mt-6">
          <Link
            href='/about-us'
            className="bg-black/80 text-white px-6 py-2 rounded-sm font-semibold inline-flex items-center gap-2 hover:bg-accent transition"
          >
            About Us
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <FeatruredPropertySection />
    </>
  );
};

export default page;