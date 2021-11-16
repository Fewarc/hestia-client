import React from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import TextArea from "./TextArea";

interface placeSearchProps {
  className?: string
}

const PlaceSearch: React.FC<placeSearchProps> = ({
  className
}) => {
  const location = ({ lat: () => 0, lng: () => 0 } as google.maps.LatLng);
  const {
    ready, 
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location,
      radius: 50 * 1000
    }
  });

  console.log(value, data, status, ready);
  

  return (
    <div className={`relative ${className}`}>
      <TextArea 
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <div className='absolute z-50 px-2 bg-white w-full border-2 border-primary'>
        {status === 'OK' && data.map(({id, description}) => (
          <div key={id}>{description}</div>
        ))}
      </div>
    </div>
  );
}

export default PlaceSearch;