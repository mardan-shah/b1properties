import PropertyListSection from './PropertyListSection';
import NewOpportunityCard from './NewOpportunityCard';
import { exampleProperty } from '../lib/data';

const NewOpportunities = () => {
  const newListings = exampleProperty.filter(p => p.tag === 'new-opportunities');

  return (
    <PropertyListSection 
      title="New Opportunities" 
      breadcrumb="Home / Investment Opportunities" 
      data={newListings} 
      CardComponent={NewOpportunityCard} 
    />
  );
};

export default NewOpportunities;
