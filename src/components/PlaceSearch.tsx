/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import Button from "./Button";
import TextArea from "./TextArea";

interface placeSearchProps {
  onChange?: () => void,
  onFocus?: () => void,
  onSelect?: (description: string) => void,
  className?: string
}

const PlaceSearch: React.FC<placeSearchProps> = ({
  onChange,
  onFocus,
  onSelect,
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
      radius: 50 * 1000,
    }
  });
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLHeadingElement>(null); 

  const handleClick = (e: any) => {
    if(!node.current) return;
    if(!node.current.contains(e.target)) setOpen(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const comboBoxClass = classNames(
    'absolute',
    'z-50',
    'px-2',
    '-mt-3',
    'bg-white',
    'w-full',
    'border-2 border-primary',
    'rounded-b-md',
    'border-t-0'
  );

  return (
    <div className={`relative ${className} ${!ready && 'opacity-20 pointer-events-none'}`}>
      <TextArea 
        value={value}
        onChange={e => {
          setValue(e.target.value); 
          setOpen(true); 
          onChange && onChange();
        }}
        onFocus={() => {
          setOpen(true); 
          onFocus && onFocus();
        }}
        className={`${open && 'border-b-0'}`}
      />
      {!!data.length && open &&
        <div ref={node} 
        className={comboBoxClass}>
          {status === 'OK' && data.map(({id, description}) => (
            <Button 
              key={id}
              type='transparent'
              onClick={() => {
                setValue(description); 
                setOpen(false);
                onSelect && onSelect(description);
              }}
              children={description}
              className='mt-2 block text-left'
            />
          ))}
        </div>
      }
    </div>
  );
}

export default PlaceSearch;