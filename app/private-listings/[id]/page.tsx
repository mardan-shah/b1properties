import { notFound } from "next/navigation"
import MansionHero from "@/components/MansionHero"
import { exampleProperty } from "@/lib/data"
import Image from "next/image"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { teamMembers } from "@/lib/data"
import CustomButton from "@/components/ui/CustomButton"
interface Props {
  params: { id: string }
}

const Page = ({ params }: Props) => {
  const property = exampleProperty.find((p) => p.id === params.id)
  const teamMember= teamMembers.find((p)=>p.name === property?.assignedAgent)

  if (!property) return notFound()

  return (
    <div className="w-full max-w-[98%] lg:max-w-[95%] mx-auto font-lora">
      <div className="text-center text-2xl lg:text-4xl py-5 lg:py-10">{property.heading}</div>
      <MansionHero data={property} />
      <div className="flex flex-col lg:flex-row justify-between py-10 lg:py-30 gap-3">
        <div className="w-full lg:w-1/2 space-y-3">
          {/*description*/}
          <div className="border rounded-lg w-full p-10">
            <div className="font-bold text-xl py-5">Description</div>
            <div className="text-sm text-secondary-foregroun leading-6 space-y-3">
              {property.description?.map((des,i)=>(
                <p key={i} dangerouslySetInnerHTML={{ __html: des }} />
              ))}
            </div>
            <div className="flex w-full justify-center items-center py-10">
              {property.qrImg && (
                <div className="space-y-2 flex flex-col justify-center items-center">
                  <Image 
                    src={property.qrImg}
                    alt={property.title}
                    width={150}
                    height={150}
                  />
                  <span className="text-green-600">Varified</span>
                </div>
              )}
            </div>
            <div className="flex justify-center rounded-lg overflow-hidden">
            <iframe 
                title={property.title}
                width="600" 
                height="315" 
                src={property.youTubeLink}
                allow="accelerometer; autoplay; clipboard-write; 
                encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                loading="lazy"
              />
            </div>

          </div>
          <div className="border rounded-lg w-full p-10">
            <div className="font-bold text-xl pt-5 pb-2">Designer</div>
            <div className="text-sm font-semibold">Meticulously designed by renowned designers from all around the world.</div>
            <div className="w-full spacy-y-2 py-5">
              {property.designer?.map((des,i)=>(
                <div key={i} className="py-3 text-sm font-light text-muted-foreground w-full flex justify-between border-b">
                  <span>{des.title}</span>
                  <span>{des.subtitle}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border rounded-lg w-full p-10">
            <div className="font-bold text-xl pt-5 pb-2">Facts & Features</div>
            <div className="w-full space-y-5">
              {property.features?.map((feature,i)=>(
                <div key={i} className="w-full space-y-1">
                  <div className="text-base font-medium">{feature.category}</div>
                  <div className="grid grid-cols-2 gap-x-20 gap-y-1 text-sm font-bold">
                    {feature.items.map((item,i)=>(
                      <span key={i} className="flex gap-1 items-center">
                        <CheckCircle2 className="w-4 h-4"/>
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 space-y-3">
          {/*Highlights*/}
          <div className="border rounded-lg w-full p-10">
            <div className="font-bold text-xl pt-5 pb-2">Facts & Features</div>
            {property.highlight?.map((h,i)=>(
              <div key={i} className="py-5 space-y-2">
                <div className="text-base font-semibold">{h.title}</div>
                <div className="text-sm font-light">{h.subtitle}</div>
              </div>
            ))}
          </div>

          <div className="border rounded-lg w-full p-10 space-y-10">
            <div className="font-bold text-xl pt-5 pb-2 flex justify-between w-full items-center">
              <span>Contact Information</span>
              <Button 
                variant='ghost'
                className="border text-muted-foreground hover:text-white hover:bg-black"
              >More Villas</Button>
            </div>
            {teamMember?.photo &&(
              <div className="flex gap-3 items-center">
                <Image 
                  src={teamMember?.photo}
                  alt={teamMember?.name}
                  width={150}
                  height={150}
                  className="object-cover"
                />
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>{teamMember.name}</div>
                  <div>{teamMember.email}</div>
                  <div>{teamMember.cell}</div>
                </div>
              </div>
            )}
            <CustomButton 
            title="Register if Your Intrested"
            arrow
            className="w-full"
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Page
