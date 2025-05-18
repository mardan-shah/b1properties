import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FeatruredPropertySection from '@/components/FeaturedPropertySection';
import PrivateLisingSection from '@/components/PrivateLisingSection';
import CustomButton from '@/components/ui/CustomButton';
import ShowcaseMansion from '@/components/ShowcaseMansion';
import ParallaxSection from '@/components/ParallaxSection';
import SoldPropertySection from '@/components/SoldPropertySection';
import TeamSection from '@/components/TeamSection';

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
      <div className='my-10 md:my-50 mx-[3px]'>
        <h1 className="text-2xl md:text-5xl font-bold text-center ">
          Shaping <span className="text-accent">Signature Lifestyles</span>
        </h1>
        <h2 className="text-xl md:text-4xl text-center mt-2 md:mt-4">
          Unmatched <span className="text-accent">Expertise</span>
        </h2>
        <hr className="w-full border-t-2 border-accent mx-auto my-2 md:my-4" />
        <p className="text-center text-lg px-4">
          We bring you the city&apos;s most extraordinary homes, connect with us and secure your place among the elite.
        </p>
        <Link href='/about-us' className='flex justify-center mt-4'>
          <CustomButton 
            title='About Us'
            className='btn'
            arrow
          />
        </Link>
      </div>
      <FeatruredPropertySection />
      <PrivateLisingSection />
      <div className='w-full p-7.5'>
        <div className='bg-[#1A1A1A] h-60 rounded-sm flex justify-center items-center'>
          <div className='flex flex-col xl:flex-row w-full items-center justify-around'>
            <h2 className='text-white font-bold text-sm lg:text-lg xl:text-xl text-center mb-10 xl:mb-0'>Register your interest and one of our luxury consultants will be in touch with you.</h2>
            <CustomButton 
              title='Find Out Now'
              className='text-sm lg:text-lg xl:text-xl py-3 lg:py-6 w-40 xl:w-56 bg-gradient-to-tr from-[rgb(102,62,3)] to-[rgb(97,80,56)] rounded-md'
              arrow
            />
          </div>
        </div>
      </div>

      <ShowcaseMansion />

      <ParallaxSection />
      <SoldPropertySection />
      <div className='w-full px-[3px]'>
        <div className='bg-[#1A1A1A] h-60 md:h-80 rounded-sm flex justify-center items-center'>
          <div className='flex flex-col xl:flex-row w-full items-center justify-between gap-5 px-20'>
            <div className='text-white flex flex-col gap-2 md:gap-5'>
              <h2 className='text-white font-bold text-xl md:text-4xl'>Sell with Us</h2>
              <h3 className='text-sm md:text-xl'>Shaping Signature Lifestyles | Unmatched Expertise</h3>
            </div>
            <CustomButton 
              title='Explore Our sold Properties'
              className='text-sm lg:text-lg xl:text-xl py-3 lg:py-6  bg-gradient-to-tr from-[rgb(102,62,3)] to-[rgb(97,80,56)] rounded-md'
              arrow
            />
          </div>
        </div>
      </div>
      <TeamSection />

    </>
  );
};

export default page;