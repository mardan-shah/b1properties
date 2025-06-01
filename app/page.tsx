import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FeatruredPropertySection from '@/components/FeaturedPropertySection';
import PrivateLisingSection from '@/components/PrivateListingSection';
import CustomButton from '@/components/ui/CustomButton';
import ShowcaseMansion from '@/components/ShowcaseMansion';
import ParallaxSection from '@/components/ParallaxSection';
import SoldPropertySection from '@/components/SoldPropertySection';
import TeamSection from '@/components/TeamSection';
import { carouselData } from '@/lib/data';


const page = () => {

  return (
   <>
     <Hero data={carouselData} />
    <div className='w-full max-w-[98%] md:max-w-[95%] mx-auto font-lora'>
      <div className='my-10 md:my-50 w-full '>
        <h1 className="text-2xl md:text-5xl text-center font-playfairDisplay ">
          Shaping <span className="text-accent">Signature Lifestyles</span>
        </h1>
        <h2 className="text-xl md:text-4xl text-center mt-2 md:mt-4 font-playfairDisplay">
          Unmatched <span className="text-accent">Expertise</span>
        </h2>
        <hr className="w-full border-t-2 border-accent mx-auto my-2 md:my-4" />
        <p className="text-center text-lg">
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
      <div className=' w-full max-w-[90%] xl:max-w-[85%] mx-auto'>
        <div className='bg-[#1A1A1A] h-60 rounded-sm flex justify-center items-center'>
          <div className='flex flex-col xl:flex-row w-full items-center justify-around'>
            <h2 className='text-white text-sm lg:text-lg xl:text-xl text-center mb-10 xl:mb-0 font-playfairDisplay'>Register your interest and one of our luxury consultants will be in touch with you.</h2>
            <CustomButton 
              title='Find Out Now'
              className='text-sm lg:text-lg xl:text-xl py-3 lg:py-6 w-40 xl:w-56 bg-gradient-to-tr from-[rgb(102,62,3)] to-[rgb(97,80,56)] rounded-md font-lora'
              arrow
            />
          </div>
        </div>
      </div>
    
     
    
      <ShowcaseMansion />
    </div>
    <ParallaxSection />
    <div className='w-full max-w-[98%] md:max-w-[95%] mx-auto font-lora'>
      
      <SoldPropertySection />
      <div className='w-full'>
        <div className='bg-[#1A1A1A] h-60 md:h-80 flex justify-center items-center'>
          <div className='flex flex-col xl:flex-row w-full items-center justify-between gap-5 px-20'>
            <div className='text-white flex flex-col gap-2 md:gap-5'>
              <h2 className='text-white font-bold text-xl md:text-4xl font-playfairDisplay'>Sell with Us</h2>
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

    </div>
   </>
  );
};

export default page;