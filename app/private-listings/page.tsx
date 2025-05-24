import Hero from '@/components/Hero';
import { carouselData } from '@/components/data';
import ImageWrapper from '@/components/ui/ImageWrapper';
import PrivateListings from '@/components/PrivateListings';
import AppointmentForm from '@/components/ApointmentForm';

const Page = () => {
  const CarouselData = [...carouselData].reverse(); // avoid mutation

  return (
    <div>
      <Hero data={CarouselData} />
      
      <div className='my-10 md:my-24 mx-[5px] w-full flex flex-col md:flex-row justify-between px-3.5 max-h-[600px] gap-6'>
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
        </div>
      </div>

      <PrivateListings />

      <AppointmentForm />
    </div>
  );
};

export default Page;
