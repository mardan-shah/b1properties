import React from 'react'
import TeamSection from '@/components/TeamSection'
import CustomButton from '@/components/ui/CustomButton'
import Link from 'next/link'

const page = () => {
  return (
    <div className='w-full max-w-[98%] md:max-w-[95%] xl:max-w-[90%] mx-auto font-lora'>
      <div className=' space-y-4 '>
        <div className='mt-50 space-y-2'>
          <h1 className='text-center text-4xl font-bold'>Our Team</h1>
          <h5 className='text-center text-sm text-gray-500'>Home / B1 Team</h5> 
        </div>
        <div className='w-full border p-5 md:p-10 rounded-md text-sm leading-8 text-gray-600 space-y-3'>
          <p>We are a boutique real estate brokerage firm dedicated exclusively to luxury properties, with a clear mission: to become Dubai&apos;s premier luxury real estate agency. As the exclusive partner of <strong>Alpago Properties,</strong> we pride ourselves on bringing only the most distinguished properties to market, including landmark achievements such as Dubai&apos;s record-breaking penthouse sale on <strong>Bluewaters Island,</strong> another penthouse at the <strong>Atlantis – The Royal Residence,</strong> and the most expensive villa on <strong>The Palm,</strong> to name just a few.</p>
          <p>Unlike traditional agencies, we take an elite, highly personalized approach. Currently, we have only a select team of agents, each one chosen for their unparalleled expertise in the luxury market. As we expand, we plan to keep our team highly exclusive, capping at around <strong>16 top-tier agents</strong> to ensure that our clients receive nothing but the finest, most dedicated service. At <strong>B1 Properties,</strong> our commitment to quality and exclusivity extends from our listings to the expertise of every agent on our team.</p>
        </div>
      </div>
      <TeamSection button/>
      <div className='flex justify-center w-full pb-10'>
        <Link href='/contact-us'>
          <CustomButton title='Contact Us' arrow className='w-[200px]'/>
        </Link>
      </div>
    </div>
  )
}

export default page