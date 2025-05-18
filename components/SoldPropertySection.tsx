import React from 'react';
import ImageWrapper from '@/components/ui/ImageWrapper';
import { MapPin } from 'lucide-react';

interface iSoldProperty {
  name : string;
  location : string;
  image: string;
}

interface prop {
  data :iSoldProperty;
}

const soldProperty :iSoldProperty[] = [
  {
    name: 'Casa De Sole',
    location: 'Palm Jumeirah',
    image: '/sold/casadelsole/images/11.webp',
  },
  {
    name: 'Royal Atlantis',
    location: 'Palm Jumeirah',
    image: '/sold/royalatlantis/images/3.webp',
  },
  {
    name: 'Famed Allure',
    location: 'Palm Jumeirah',
    image: '/sold/Framed Allure/images/1.jpg',
  },
  {
    name: 'Riva Del Lusso',
    location: 'Palm Jumeirah',
    image: '/sold/Riva Del Lusso/images/39.webp',
  },
  {
    name: 'Serene Versante',
    location: 'Palm Jumeirah',
    image: '/sold/Serene Versante/images/0.jpg',
  },
  {
    name: 'Kural Vista',
    location: 'Palm Jumeirah',
    image: '/sold/g23/images/home.webp',
  },
];

const SoldCard = ({ data }: prop) => {
  return (
    <div className="w-full h-full group relative">
      <div className="relative h-full w-full overflow-hidden">
        <ImageWrapper
          src={data?.image || '/placeholder.svg'}
          alt={data?.name || 'Sold Property'}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t z-10 from-black/70 to-transparent p-4 text-white">
          <h2 className="text-lg font-semibold">{data?.name}</h2>
          <div className="flex items-center gap-1 text-sm">
            <MapPin size={16} />
            {data?.location}
          </div>
        </div>
      </div>
    </div>
  );
};

const SoldPropertySection = () => {
  return (
    <section className="px-[2px] mb-10 pt-10 md:mt-20">
      <h1 className="heading">Sold Properties</h1>
      <h3 className="text-lg text-muted-foreground mb-6 text-center">
        Shaping Signature Lifestyles | Unmatched Expertise
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[5px] auto-rows-[200px]">
        <div className="col-span-2 row-span-2 rounded-sm overflow-hidden">
          <SoldCard data={soldProperty[0]} />
        </div>
        <div className="row-span-2 rounded-sm overflow-hidden">
          <SoldCard data={soldProperty[1]} />
        </div>
        <div className="row-span-2 rounded-sm overflow-hidden">
          <SoldCard data={soldProperty[2]} />
        </div>
        <div className="row-span-2 rounded-sm overflow-hidden">
          <SoldCard data={soldProperty[3]} />
        </div>
        <div className="row-span-2 rounded-sm overflow-hidden">
          <SoldCard data={soldProperty[4]} />
        </div>
          <div className="col-span-2 row-span-2 rounded-sm overflow-hidden">
            <SoldCard data={soldProperty[5]} />
          </div>
      </div>
    </section>
  );
};

export default SoldPropertySection;
