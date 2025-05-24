import React from 'react'
import Image from 'next/image'
import ContactCards from '@/components/ContactCards'
import AppointmentForm from '@/components/ApointmentForm'

const Page = () => {
  return (
    <div>
      <div className='bg-black h-20'>
      </div>
      <div className=' h-[calc(100vh-5rem)] w-full bg-black relative'>
        <Image 
          src='/images/contactB1.webp'
          alt='office'
          fill
          className='object-cover'
          priority
        />
      </div>
      <ContactCards />
      <AppointmentForm title='Send Us a Message' subtitle='' />
    </div>
  )
}

export default Page
