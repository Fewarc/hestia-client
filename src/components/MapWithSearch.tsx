/* eslint-disable no-undef */
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, { useCallback, useRef } from "react";
import mapStyle from "../constants/googleMapStyle";
import PlaceSearch from "./PlaceSearch";
import Spinner from "./Spinner";

type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];

const libraries: Libraries = ["places"];
const apiKey: string = (process.env.REACT_APP_MAPS_JS_API as string);
const mapContainerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
}
const mapCenter: google.maps.LatLngLiteral= {
  lat: 0,
  lng: 0
};
const options: google.maps.MapOptions = {
  styles: mapStyle,
  disableDefaultUI: true
}

interface mapProps {
  markers?: any[],
  onClick: (event: any) => void,
  zoom?: number,
  containerClassName?: string,
  searchBarClassName?: string,
  onChange: (e: any) => void,
  onFocus: () => void,
  onSelect: (addressObj: {
    lat: number,
    lng: number,
    address: string
  }) => void,
}

const MapWithSearch: React.FC<mapProps> = ({
  markers,
  onClick,
  zoom,
  containerClassName,
  searchBarClassName,
  onChange,
  onFocus,
  onSelect
}) => {
  const { isLoaded, loadError } = useLoadScript({
  googleMapsApiKey: apiKey,
  libraries
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onMapCLick = useCallback((event) => onClick(event), []);

  const mapRef = useRef<google.maps.Map>();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  const panTo = useCallback(({ lat, lng }) => {
    mapRef?.current?.panTo({ lat, lng });
    mapRef?.current?.setZoom(18);
  }, []);

  if(loadError) return <div>Load error</div>;

  return (
    <div className={`relative ${containerClassName}`}>
      <PlaceSearch 
          onSelect={onSelect}
          panTo={panTo}
          onChange={onChange}
          onFocus={onFocus}
          className={searchBarClassName}
        />
      {isLoaded ? 
        <GoogleMap 
          mapContainerStyle={mapContainerStyle}
          zoom={zoom}
          center={mapCenter}
          options={options}
          onClick={onMapCLick}
          onLoad={onMapLoad}
        >
          {markers?.map((marker, index) => {
            if(!marker?.lat && !marker?.lng) return null; 
            
            return (
              <Marker 
                key={index + ''}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{
                  url: '/pin.svg',
                  scaledSize: new window.google.maps.Size(40, 40)
                }}
              />
            );
          })}
        </GoogleMap> : 
        <Spinner className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'/>
        }
    </div>
  );
}

export default MapWithSearch;