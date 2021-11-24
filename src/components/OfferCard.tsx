import React from "react";

interface OfferCardTypes {
  className?: string,
  offer: any
}

const OfferCard: React.FC<OfferCardTypes> = ({
  className,
  offer
}) => {
  return (
    <div className={className}>
      <div className='flex'>
        
      </div>
    </div>
  );
}

export default OfferCard;