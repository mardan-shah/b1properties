import { carouselData } from '@/lib/data'
import Hero from '@/components/Hero'
import Flow from '@/app/new-opportunities/components/Flow'
import NewOpportunities from '@/app/new-opportunities/components/NewOpportunities'

const page = () => {
  return (
    <>
      <Hero data={carouselData}/>
      <div className='w-full max-w-[98%] md:max-w-[95%] mx-auto font-lora'>
        <Flow />
        <NewOpportunities />
      </div>
    </>
  )
}

export default page