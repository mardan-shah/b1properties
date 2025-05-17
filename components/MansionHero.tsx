import React from 'react'
import { iMansion } from '@/components/ShowcaseMansion';
import ImageWrapper from '@/components/ui/ImageWrapper';
import { Building2, Bed, SquaresSubtract, Bath, Warehouse } from 'lucide-react';

interface prop {
  data : iMansion,
}
const MansionHero = ({data}:prop ) => {
  return (
    <section className='px-[5px] mt-10'>
      <div className='flex flex-col md:flex-row justify-between font-medium gap-2'>
        <div className='text-left space-y-1'>
          <h1 className='text-lg md:text-2xl'>{data.name}</h1>
          <h5 className='text-xs md:text-sm text-gray-500'>{data.subtitle}</h5>
        </div>
        <div className='md:text-right space-y-1'>
          <h5 className='text-xs md:text-sm text-gray-500'>Price</h5>
          <h1 className='text-2xl'>{data.priceUnit} {data.price}</h1>
        </div>
      </div>

      <div className='w-full rounded-sm overflow-hidden my-10'>
        <div className="grid grid-cols-2 md:grid-cols-5 md:grid-rows-5 gap-[5px] h-50vh md:h-full w-full">
            <div className="col-span-2 md:col-span-3 md:row-span-5">
              <ImageWrapper
                src={data.images[0]}
                width={1920}
                height={1080}
                alt={data.name}
                className="h-full w-full object-cover"
                quality={100}
                priority
              />
            </div>
            <div className="row-start-2 md:col-span-2 md:row-span-2 md:col-start-4">
              <ImageWrapper
                src={data.images[1]}
                width={1920}
                height={1080}
                alt={data.name}
                className="h-full w-full object-cover"
                quality={100}
                priority
              />
            </div>
            <div className="row-start-2 md:col-span-2 md:row-span-3 md:col-start-4 md:row-start-3">
              <ImageWrapper
                src={data.images[2]}
                width={1920}
                height={1080}
                alt={data.name}
                className="h-full w-full object-cover"
                quality={100}
                priority
              />
            </div>
        </div>
      </div>

      <div className='flex md:flex-row flex-wrap justify-around text-xs md:text-[1rem] space-y-3'>
        <div className='w-1/2 md:w-1/6 flex flex-col items-center justify-center text-gray-500 md:border-r border-gray-500  gap-3'>
          <Building2 className='w-4 h-4 md:w-6 md:h-6'/>
          <span>{data.DevelopedBy}</span>
        </div>
        <div className='w-1/2 md:w-1/6 flex flex-col items-center justify-center text-gray-500 md:border-r border-gray-500  gap-3'>
          <SquaresSubtract className='w-4 h-4 md:w-6 md:h-6'/>
          <span>BUA {data.BUA} sq.ft</span>
        </div>
        <div className='w-1/2 md:w-1/6 flex flex-col items-center justify-center text-gray-500 md:border-r border-gray-500  gap-3'>
          <SquaresSubtract className='w-4 h-4 md:w-6 md:h-6'/>
          <span>Plot Size {data.plotSize} sq.ft</span>
        </div>
        <div className='w-1/2 md:w-1/6 flex flex-col items-center justify-center text-gray-500 md:border-r border-gray-500  gap-3'>
          <Bed className='w-4 h-4 md:w-6 md:h-6'/>
          <span>{data.bathrooms} Bedrooms</span>
        </div>
        <div className='w-1/2 md:w-1/6 flex flex-col items-center justify-center text-gray-500 md:border-r border-gray-500  gap-3'>
          <Bath className='w-4 h-4 md:w-6 md:h-6'/>
          <span>{data.bathrooms} Bathrooms</span>
        </div>
        <div className='w-1/2 md:w-1/6 flex flex-col items-center justify-center text-gray-500  gap-3'>
          <Warehouse className='w-4 h-4 md:w-6 md:h-6'  />
          <span>{data.parking}</span>
        </div>
      </div>
    </section>
  )
}

export default MansionHero