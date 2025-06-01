import React from 'react'
import { carouselData } from '@/lib/data'
import Hero from '@/components/Hero'
import Flow from '@/components/Flow'

const page = () => {
  return (
    <>
      <Hero data={carouselData}/>
      <div className='w-full max-w-[98%] md:max-w-[95%] mx-auto font-lora'>
        <Flow />
      </div>
    </>
  )
}

export default page