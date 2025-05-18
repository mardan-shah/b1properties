import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface TeamMemberProps {
  name: string;
  photo: string;
  languages: string[];
  focusArea: string[];
}

const TeamCard = ({ name, photo, languages, focusArea }: TeamMemberProps) => {
  return (
    <Card className="flex flex-col items-center border min-w-sm 2xl:min-w-md hover:border-black text-center rounded-2xl shadow-md overflow-hidden">
      <div className="relative w-full h-60">
        <Image
          src={photo}
          alt={name}
          fill
          className="object-contain grayscale hove:scale-[20%] border-b"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <CardContent className="w-full">
        <h2 className="text-lg font-semibold mb-2">{name}</h2>
        <div className="text-sm text-muted-foreground w-full px-3">
          <div className="flex justify-between w-full border-t pt-2">
            <span className="font-medium text-gray-500">Languages</span>
            <span>{languages.join(' | ')}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-medium text-gray-500">Focus Area</span>
            <span>{focusArea.join(' | ')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
