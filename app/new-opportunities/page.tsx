import React from 'react'
import { carouselData } from '@/components/data'
import Hero from '@/components/Hero'
import Flow from '@/components/Flow'

const page = () => {
  return (
    <div>
      <Hero data={carouselData}/>
      <Flow />
    </div>

  )
}

export default page