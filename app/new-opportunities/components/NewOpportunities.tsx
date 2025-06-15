import PropertyListSection from '../../../components/PropertyListSection';
import NewOpportunityCard from '../../../components/NewOpportunityCard';
import { exampleProperty } from '../../../lib/data';

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
