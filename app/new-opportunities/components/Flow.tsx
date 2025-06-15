import React from 'react'
import Image from 'next/image'

const dataflow = [
  {
    icon: '/images/svg/1.svg',
    title: 'Discovery Call',
    Subtitle: 'Share your vision with us—whether you’re seeking a dream home or a smart investment, we’ll understand your exact needs.'
  },
  {
    icon: '/images/svg/2.svg',
    title: 'Curated Property Selection',
    Subtitle: 'We’ll present you with a list of exclusive properties that align with your unique lifestyle and investment goals.'
  },
  {
    icon: '/images/svg/3.svg',
    title: 'Immersive Property Tours',
    Subtitle: 'Take virtual or in-person tours of the properties, focusing on key features that match your vision.'
  },
  {
    icon: '/images/svg/4.svg',
    title: 'Expert Consultation',
    Subtitle: 'Receive market insights, guidance on ROI, and answers to any questions regarding the legal and investment aspects of your purchase.'
  },
  {
    icon: '/images/svg/5.svg',
    title: 'Hassle-Free Transactions',
    Subtitle: 'From negotiations to closing, we handle all the details so you can focus on making your new home truly yours.'
  },
  {
    icon: '/images/svg/6.svg',
    title: 'Continued Support Beyond Closing',
    Subtitle: 'Whether it’s property management or post-purchase customization, we remain by your side to ensure your investment continues to exceed your expectations.'
  }
]
const Flow = () => {
  return (
    <div className='flex justify-center items-center gap-5 flex-wrap py-10 md:py-20 px-10 '>
      {dataflow.map((data, i)=>(
        <div key={i} className='w-full md:max-w-[400px] flex flex-col items-center p-5 space-y-5 min-h-[330px]'>
          <Image 
            src={data.icon}
            alt={data.title}
            width={125}
            height={125}
          />
          <h1 className='text-center text-xl font-bold hover:text-accent'>{i+1}.{data.title}</h1>
          <p className='text-sm text-muted-foreground flex justify-center items-center text-center'>{data.Subtitle}</p>
        </div>
      ))}
    </div>
  )
}

export default Flow