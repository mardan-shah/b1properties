// components/PropertyListSection.tsx
'use client';

import { useEffect, useState } from 'react';
import CustomButton from './ui/CustomButton';
import { IPropertyData } from '@/types/types';

const MAX_ROWS = 3;
const ITEMS_PER_ROW_SM = 1;
const ITEMS_PER_ROW_MD = 2;
const ITEMS_PER_ROW_LG = 3;

const getItemsPerRow = (width: number) => {
  if (width >= 1024) return ITEMS_PER_ROW_LG;
  if (width >= 768) return ITEMS_PER_ROW_MD;
  return ITEMS_PER_ROW_SM;
};

interface PropertyListSectionProps {
  title: string;
  breadcrumb?: string;
  data: IPropertyData[];
  CardComponent: React.ComponentType<{ property: IPropertyData }>;
}

const PropertyListSection = ({ title, breadcrumb, data, CardComponent }: PropertyListSectionProps) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [itemsPerRow, setItemsPerRow] = useState(ITEMS_PER_ROW_SM);

  const updateLayout = () => {
    const perRow = getItemsPerRow(window.innerWidth);
    setItemsPerRow(perRow);
    setVisibleCount(prev => {
      const alreadyVisibleRows = Math.ceil(prev / perRow);
      return alreadyVisibleRows * perRow;
    });
  };

  useEffect(() => {
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    setVisibleCount(MAX_ROWS * itemsPerRow);
  }, [itemsPerRow]);

  const showMore = () => {
    setVisibleCount(prev => prev + 3 * itemsPerRow);
  };

  const propertiesToShow = data.slice(0, visibleCount);
  const hasMore = visibleCount < data.length;

  return (
    <div className="py-10 md:my:20">
      <div className="pb-10">
        <h1 className="heading">{title}</h1>
        {breadcrumb && <h4 className="text-center font-light text-sm -mt-5">{breadcrumb}</h4>}
      </div>

      <div className="flex flex-wrap gap-[5px] w-full justify-center">
        {propertiesToShow.map((property, i) => (
          <div key={i} className="w-full md:w-[48%] lg:w-[32%]">
            <CardComponent property={property} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-5">
          <CustomButton onClick={showMore} title="Show More" className="btn" />
        </div>
      )}
    </div>
  );
};

export default PropertyListSection;
