import React from 'react';
import MansionHero from '@/components/MansionHero';
import {IPropertyData} from '@/types/types'

const Mansion : IPropertyData = {
  id: "villa-123",
  title : 'Bvlgari Mansion',
  subtitle : 'Bvlgari Resorts & Hotel',
  location: "Palm Jumeirah, Dubai",

  currency : 'AED',
  price : 495000000,
  developedBy : 'Developed By Meraas',
  bua : '12,837',
  plotSize : 20226,
  bedrooms : 4,
  bathrooms : 6,
  parking : '8 Car Parking',
  images : [
      "/exclusive/bvlgari/1.webp",
      "/exclusive/bvlgari/DSC07477.webp",
      "/exclusive/bvlgari/DJI_0690.webp"
  ],
  featured: true,
  href: "/private-listings/custom-built-signature-villa",
  tag: 'private-listings',
}

const ShowcaseMansion = () => {
  return (
    <section className='my-10 md:mt-30 w-full'>
      <h1 className='heading'>The Most Expensive Mansion for Sale in Dubai</h1>
      <MansionHero data={Mansion}/>
    </section>
  )
}

export default ShowcaseMansion