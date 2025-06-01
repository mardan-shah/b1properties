import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { Button } from '@/components/ui/button';


interface TeamMemberProps {
  name: string;
  photo: string;
  languages: string[];
  focusArea: string[];
  cell?:string;
  whatsapp?:string;
}

interface Props{
  data:TeamMemberProps;
  showButton?: boolean;

}

const TeamCard = ({ data, showButton=false }: Props) => {
  return (
    <Card className="flex flex-col items-center gap-[5px] border w-full hover:border-black text-center rounded-2xl shadow-md overflow-hidden">
      <div className="relative w-full h-60">
        <Image
          src={data.photo}
          alt={data.name}
          fill
          className="object-contain grayscale hove:scale-[20%] border-b"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <CardContent className="w-full">
        <h2 className="text-lg font-semibold mb-2">{data.name}</h2>
        <div className="text-sm text-muted-foreground w-full lg:px-3">
          <div className="flex  text-xs lg:text-base justify-between w-full min-h-18 items-center border-t pt-2">
            <span className="font-medium text-gray-500 text-left w-1/3">Languages</span>
            <span className='text-right'>{data.languages.join(' | ')}</span>
          </div>
          <div className="flex text-xs lg:text-base justify-between items-center border-t pt-2 mt-2 min-h-18" >
            <span className="font-medium text-gray-500 text-left w-1/3">Focus Area</span>
            <span className='text-right'>{data.focusArea.join(' | ')}</span>
          </div>
        </div>
      </CardContent>
      {showButton && (
        <CardFooter className='flex justify-between w-full gap-2 pt-5 border-t'>
          <Button className='w-[45%] p-5 flex gap-5'>Call <FiPhone /></Button>
          <Button className='w-[45%] p-5 flex gap-5'>WhatsApp <FaWhatsapp /></Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default TeamCard;
