import React from 'react'
import { MapPin, Phone, LaptopMinimalCheck } from 'lucide-react'


const contactCardData = [
  {
    label : "Our Address",
    icon : <MapPin className='w-[35px] h-[35px]'/>,
    address : "M Floor, First Motors building Al Waha St., Sheikh Zayed Rd., Al Qouz 1, Dubai, UAE.",
    subtitle : "See On Map"
  },
  {
    label : "Contact Info",
    icon : <Phone className='w-[35px] h-[35px]'/>,
    address : "+971 5 64 33 8399",
    subtitle : "Give Us A Call"
  },
  {
    label : "Support",
    icon : <LaptopMinimalCheck className='w-[35px] h-[35px]'/>,
    address : "info@b1properties.ae",
    subtitle : "Contact Via Email"
  }
]
const ContactCards = () => {
  return (
    <div className=' flex flex-col md:flex-row justify-center w-full items-center -mt-24 mb-20 gap-10 z-30'>
      {contactCardData.map((data,i)=>(
        <div key={i} className='w-full max-w-[80%] md:max-w-md flex flex-col justify-center items-center gap-5 text-center bg-white z-40 py-10 rounded-md px-3.5 border'>
            <div className='w-20 h-20 bg-[#F9F9F9] flex justify-center items-center rounded-full hover:text-accent'>
              {data.icon}
            </div>
            <div className='min-h-9 font-semibold text-xl hover:text-accent'>{data.label}</div>
            <p className='min-h-14  text-gray-500 text-sm'>{data.address}</p>
            <div className='border-t w-full pt-5 font-bold text-lg text-gray-700 hover:text-accent'>{data.subtitle}</div>
        </div>
      ))}
    </div>
  )
}

export default ContactCards