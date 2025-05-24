'use client';

import { useEffect, useState } from 'react';
import LuxuryPropertyCard from '@/components/LuxuryPropertyCard';
import { exampleProperty } from './data';
import CustomButton from './ui/CustomButton';

const MAX_ROWS = 3;
const ITEMS_PER_ROW_SM = 1;
const ITEMS_PER_ROW_MD = 2;
const ITEMS_PER_ROW_LG = 3;

const getItemsPerRow = (width: number) => {
  if (width >= 1024) return ITEMS_PER_ROW_LG;
  if (width >= 768) return ITEMS_PER_ROW_MD;
  return ITEMS_PER_ROW_SM;
};

const PrivateListings = () => {
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
    // Show initial 3 rows
    setVisibleCount(MAX_ROWS * itemsPerRow);
  }, [itemsPerRow]);

  const showMore = () => {
    setVisibleCount(prev => prev + 3 * itemsPerRow);
  };

  const propertiesToShow = exampleProperty.slice(0, visibleCount);
  const hasMore = visibleCount < exampleProperty.length;

  return (
    <div className="py-10 md:py-50 px-[5px]">
      <div className="pb-10">
        <h1 className="heading">Private Listings</h1>
        <h4 className="text-center text-sm -mt-5">Home / Private Listings</h4>
      </div>

      <div className="flex flex-wrap gap-[5px] w-full justify-center">
        {propertiesToShow.map((property, i) => (
          <div key={i} className="w-full md:w-[48%] lg:w-[32%]">
            <LuxuryPropertyCard property={property} />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-5">
          <CustomButton 
            onClick={showMore}
            title='Show More'
            className='btn'
          />
        </div>
      )}
    </div>
  );
};

export default PrivateListings;
