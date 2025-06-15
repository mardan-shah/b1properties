import { notFound } from "next/navigation"
import { exampleProperty } from "@/lib/data"
import { teamMembers } from "@/lib/data"
import CustomButton from "@/components/ui/CustomButton"
import Image from "next/image"
import ShowcaseGrid from "@/components/ShowcaseGrid"
import ImageWrapper from "@/components/ui/ImageWrapper"


const page =  async ({ params }: { params: Promise<{ id: string }> }) => {
   const { id } = await params
    const property = exampleProperty.find((p) => p.id === id && p.tag === 'new-opportunities')
    if (!property) return notFound()
    const teamMember = teamMembers.find((p) => p.name === property.assignedAgent)

  return (
    <div className="md:-mt-20">
      <div 
        style={{
        height: '100vh',
        background: `url(${property.heroImage}) no-repeat`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
      }}>
        <div className=" absolute h-full w-full inset-0 bg-black/40 flex flex-col md:flex-row justify-between pl-10 md:pl-20 items-center text-white">
          <div className="space-y-5 md:space-y-10 max-h-44">
            <div className="space-y-2">
              <div className="text-2xl md:text-4xl font-bold">{property?.district}</div>
              <div className="text-sm md:text-base font-medium">{property?.location}</div>
            </div>
            <CustomButton title="Register Intrest" arrow className="py-6 w-[180px]"/>
          </div>
          <div className="bg-[#1a1a1a] w-2/3 h-34 rounded-tl-4xl flex px-14 py-8 gap-15 justify-between md:justify-start items-center">
            <div className="flex flex-col gap-1 items-center justify-center">
              <div className="text-3xl font-bold">{property.paymentPlan}</div>
              <div className="text-sm font-medium">Payment Plan</div>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <div className="text-3xl font-bold">{property.currency}-{property.price}</div>
              <div className="text-sm font-medium">Starting Price</div>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <div className="text-3xl font-bold">{property.handover}</div>
              <div className="text-sm font-medium">Handover In</div>
            </div>
          </div>
          
        </div>
      
      </div>
      <div className="py-10 md:py-20 w-full max-w-[98%] md:max-w-[95%] mx-auto font-lora">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-5">
            <div>Get in touch for more information.</div>
            <CustomButton title='Register Intrest' arrow className="py-6 w-[180px] text-sm"/>
          </div>
          <div className="h-[300px] w-full md:w-[300px] px-10">
            <Image 
              src={teamMember?.photo || '/placeholder.svg'}
              alt={`${teamMember?.name} image`}
              width={300}
              height={300}
              className="object-cover rounded-full w-full h-full"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-10 md:mt-20 font-lora">
          <h1 className="heading">Payment Plan</h1>
          <h2 className="font-light text-sm">Naya offers a hassle-free payment plan designed to suit your lifestyle.</h2>
          <div className="flex items-center mt-5 h-full w-full justify-center gap-5 md:gap-14 md:px-40 py-10">
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="text-2xl md:text-5xl font-bold">{property.downPayment || '20%'}</div>
              <div className="text-base md:text-lg font-light">Down Payment</div>
            </div>
            <div className="h-[60px] border-r-2 border-muted-foreground"/>
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="text-2xl md:text-5xl font-bold">{property.duringConstructionPayment || '60%'}</div>
              <div className="text-base md:text-lg font-light">During Construction</div>
            </div>
            <div className="h-[60px] border-r-2 border-muted-foreground"/>
            <div className="flex flex-col justify-center items-center gap-1">
              <div className="text-2xl md:text-5xl font-bold">{property.handoverPayment || '20%'}</div>
              <div className="text-base md:text-lg font-light">On Handover</div>
            </div>
          </div>
        </div>
        <ShowcaseGrid images={property.images} title={property.title}/>
        <div className="my-10 md:my-20">
          <div className="text-2xl font-medium mb-5">Description</div>
          <div className="flex  gap-5 justify-between w-full">
            <div className="w-1/2 space-y-2">
              {property.description?.map((desc, index) => (
                <p className="text-sm" key={index} dangerouslySetInnerHTML={{ __html: desc }} />
              ))}
            </div>
            <div className="w-1/2">
              <ImageWrapper src={property.images[2]} alt={property.title} width={400} height={400} className=" object-contain rounded-lg overflow-hidden"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page