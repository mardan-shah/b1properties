import PropertyListSection from '../../../components/PropertyListSection';
import PrivateListingCard from '../../../components/PrivateListingCard';
import { exampleProperty } from '../../../lib/data';

const PrivateListings = () => {
  const privateListings = exampleProperty.filter(p => p.tag === 'private-listings');

  return (
    <PropertyListSection 
      title="Private Listings" 
      breadcrumb="Home / Private Listings" 
      data={privateListings} 
      CardComponent={PrivateListingCard} 
    />
  );
};

export default PrivateListings;
