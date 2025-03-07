import React from 'react';
import Breadcrumb from './Breadcrumb';
import FacilityDetails from './FacilityDetails';
import ImageVideoSection from './ImageVideoSection';
import RegardingSection from './RegardingSection';

const FacilityDetailManagement: React.FC = () => {
  return (    
       
        <div className="flex flex-col flex-grow">            
            <div className="flex-grow p-5">
                <Breadcrumb className="mb-5" />
                <FacilityDetails className="mb-5" />
                <ImageVideoSection className="mb-5" />
                <RegardingSection className="mb-5" />
            </div>          
        </div>
  
  );
};

export default FacilityDetailManagement;

