import React from 'react';
import MansionHero from '@/components/MansionHero';

export interface iMansion {
  name : string,
  subtitle : string,
  priceUnit : string,
  price : number | string,
  DevelopedBy : string,
  BUA : number | string,
  plotSize : number | string,
  bedrooms : number,
  bathrooms : number,
  parking : string,
  images : string[],
}

const Mansion : iMansion = {
  name : 'Bvlgari Mansion',
  subtitle : 'Bvlgari Resorts & Hotel',
  priceUnit : 'AED',
  price : '495,000,000',
  DevelopedBy : 'Developed By Meraas',
  BUA : '12,837',
  plotSize : '20,226',
  bedrooms : 4,
  bathrooms : 6,
  parking : '8 Car Parking',
  images : [
      "/exclusive/bvlgari/1.webp",
      "/exclusive/bvlgari/DSC07477.webp",
      "/exclusive/bvlgari/DJI_0690.webp"
  ]
}

const ShowcaseMansion = () => {
  return (
    <section className='my-10 md:mt-30'>
      <h1 className='heading'>The Most Expensive Mansion for Sale in Dubai</h1>
      <MansionHero data={Mansion}/>
    </section>
  )
}

export default ShowcaseMansion