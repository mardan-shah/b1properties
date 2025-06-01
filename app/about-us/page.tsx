import React from 'react'
import CustomButton from '@/components/ui/CustomButton'
import ImageWrapper from '@/components/ui/ImageWrapper'
import TeamSection from '@/components/TeamSection'

const page = () => {
  return (
    <>
      <div className='w-full h-screen bg-no-repeat bg-center bg-cover flex flex-col items-center justify-center gap-10' style={{
          backgroundImage: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.3) 0%,
              rgba(0,0,0,0.6) 50%,
              rgba(0,0,0,0.8) 100%
            ),
            url('/images/officeAbout.jpeg')`,
          }}>
          <h4 className='text-lg text-white mt-20 text-shadow-lg'>Shaping Signature Lifestyles | Unmatched Experties</h4>
          <h1 className='text-4xl text-white text-shadow-lg'>About Us</h1>
          <div className='w-full flex flex-col md:flex-row justify-center items-center gap-10'>
            <CustomButton title='Download Our Company Profile' arrow className='bg-black text-md p-6'/>
            <CustomButton title='Download Our Current Portfolio' arrow className='bg-black text-md p-6'/>
          </div>
      </div>
      <div className='w-full max-w-[98%] md:max-w-[95%] mx-auto font-lora'>
      

        <div className='w-full mx-auto my-20'>
          <h1 className='text-5xl text-center py-5'>About <span className='text-accent'>B1 Properties</span></h1>
          <div className='bg-[#F9F9F9] p-10 text-sm leading-6'>
            <h1 className='text-lg mb-5'>About B1</h1>
            <div className='border-b-4 border-accent space-y-2 pb-2'>
              <p>At <strong>B1 Properties</strong>, we&apos;re not just a luxury real estate brokerage, we&apos;re <strong>purveyors of extraordinary lifestyles.</strong> Our passion for <strong>tailored luxury</strong> drives us to redefine the Dubai real estate market so that each home we represent is not just a property but a <strong>work of art</strong> in tune with the aspirations of our discerning clients. We believe that property is more than just transactions; it&apos;s about <strong>crafting one-of-a-kind experiences,</strong> delivering <strong>unparalleled service,</strong> and developing <strong>signature lifestyles</strong> that embody elegance and sophistication.</p>
              <p>Our mission is straightforward: to <strong>lead the luxury real estate market</strong> through the application of <strong>innovative technology, innovative strategies,</strong> and an <strong>unwavering commitment to excellence.</strong></p>
              <p>We understand that our clientele seek more than a house; they desire an <strong>unparalleled, high-end experience</strong> aligned with their vision of luxury and refinement. That&apos;s why we go <strong>above brokerage,</strong> offering <strong>tailored guidance, insider access</strong> to Dubai&apos;s most sought-after properties, and an <strong>unmatched level of service</strong> that makes each experience stress-free and rewarding.</p>
              <p>At the heart of <strong>B1 Properties</strong> is a commitment to <strong>innovation, exclusivity,</strong> and <strong>integrity.</strong> We take pride in offering nothing but <strong>perfection,</strong> so every client experience is as exceptional as the homes that we feature. Whether you are buying your <strong>dream home,</strong> a <strong>strategic investment,</strong> or adding to a <strong>portfolio of luxury properties,</strong> our expertise and dedication create an <strong>unparalleled real estate experience</strong>—one that is marked by <strong>prestige, personalization,</strong> and the <strong>art of fine living.</strong></p>
            </div>
          </div>
        </div>


        <div className='my-10 md:my-24 w-full flex flex-col md:flex-row justify-between px-3.5 max-h-[600px] gap-6'>
          <div className='w-full md:w-1/2 relative aspect-[7/6] max-h-[600px] overflow-hidden rounded-md'>
            <ImageWrapper
              src='/images/office.jpeg'
              alt='Office image'
              fill
              className='object-cover'
              priority
            />
          </div>

          
          <div className='w-full md:w-1/2 flex flex-col justify-center items-center px-5 gap-5'>
            <h1 className='heading mb-4'>Experience a new dimension in luxurious living in Dubai</h1>
            <p className='text-base leading-relaxed'>
              Think your lifestyle needs an upgrade? At B1 Properties, we don&apos;t find you a house; we create an experience.
              With our ultra-luxury properties, bespoke services, and unparalleled knowledge of the marketplace,
              we will transform your vision into a living masterpiece.
            </p>
            <CustomButton 
              title='Register Intrest'
              className='w-1/3'
              arrow
            />
          </div>
        </div>

        <TeamSection />

        <div className='flex flex-col md:flex-row w-full justify-center items-center mb-20 gap-5 xl:gap-20'>
          <CustomButton title='Download Company Profile' arrow className='xl:p-8 xl:text-xl md:w-1/4'/>
          <CustomButton title='Download Company Profile' arrow className='xl:p-8 xl:text-xl md:w-1/4'/>
        </div>
      </div>
    </>
  )
}

export default page