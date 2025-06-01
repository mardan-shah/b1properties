import Hero from '@/components/Hero';
import { carouselData } from '@/lib/data';
import ImageWrapper from '@/components/ui/ImageWrapper';
import SoldPropertySection from '@/components/SoldPropertySection';
import CustomButton from '@/components/ui/CustomButton';
import CountUpComponent from '@/components/CountUpComponent';

const Page = () => {
  const CarouselData = [...carouselData].reverse(); // avoid mutation

  return (
    <>
      <Hero data={CarouselData} />
      <div className='w-full max-w-[98%] md:max-w-[95%] mx-auto font-lora'>
        
        <CountUpComponent />
        <div className='my-10 md:my-24 w-full flex flex-col md:flex-row justify-between max-h-[600px] gap-6'>
          <div className='w-full md:w-1/2 relative aspect-[7/6] max-h-[600px] overflow-hidden rounded-md'>
            <ImageWrapper
              src='/images/office.jpeg'
              alt='Office image'
              fill
              className='object-cover'
              priority
            />
          </div>

          
          <div className='w-full md:w-1/2 flex flex-col justify-center items-center gap-5'>
            <h1 className='heading mb-4'>Experience a new dimension in luxurious living in Dubai</h1>
            <p className='text-base leading-relaxed'>
              Think your lifestyle needs an upgrade? At B1 Properties, we don&apos;t find you a house; we create an experience.
              With our ultra-luxury properties, bespoke services, and unparalleled knowledge of the marketplace,
              we will transform your vision into a living masterpiece.
            </p>
            <CustomButton 
              title='Sell With Us'
              className='w-1/3'
              arrow
            />
          </div>
        </div>
          <SoldPropertySection />
        <div className='py-5 flex justify-between items-center'>
          <h1 className='heading text-2xl font-bold'>Sell With Us</h1>
          <CustomButton 
            title='Contact us'
            arrow
          />
        </div>
      </div>
    </>
  );
};

export default Page;
