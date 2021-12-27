import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import mapStyle from "../constants/googleMapStyle";
import React from "react";

interface StaticMapsProps {
  className?: string,
  lat: number, 
  lng: number
}

const apiKey: string = (process.env.REACT_APP_MAPS_JS_API as string);
const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
}

const options: google.maps.MapOptions = {
  styles: mapStyle,
  disableDefaultUI: true
}

const StaticMap: React.FC<StaticMapsProps> = ({
  className,
  lat,
  lng
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  if (loadError) return <div>Load error</div>; // remove string
  
  return (
    <div className={`relative ${className}`}>
      {isLoaded ? 
        <GoogleMap 
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={{
            lat: lat,
            lng: lng
          }}
          options={options}
        >
          <Marker 
            position={{ lat: lat, lng: lng }}
            icon={{
              url: '/pin.svg',
              scaledSize: new window.google.maps.Size(40, 40)
            }}
          />
        </GoogleMap>
        :
        null
      }
    </div>
  );
}

export default StaticMap;