import React, { useState } from "react";
import Button from "./Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import Image from "./Image";

interface ImageObject {
  imageLink: string
}

interface CarouselProps {
  images: ImageObject[],
  className?: string
}

const iconClass = classNames(
  'w-10 h-10',
  'text-primary'
);

const imageClass = classNames(
  ''
);

const Carousel: React.FC<CarouselProps> = ({
  images,
  className
}) => {
  const [image, setImage] = useState<number>(0);

  const handleImageChange = (value: number): void => {
    if (image + value > images.length - 1) {
      setImage(0);
    } else {
      if (image + value < 0) {
        setImage(images.length - 1);
      } else {
        setImage(image + value);
      }
    }
  }

  console.log(image);
  console.log(images.length);
  
  

  return (
    <div className={`flex justify-evenly h-96 ${className}`}>
      <Button 
        type='transparent'
        onClick={() => handleImageChange(-1)}
        children={<ChevronLeftIcon className={iconClass} />}
      />
      <div className="flex-grow flex justify-evenly w-full">
        <img src={images[image].imageLink} alt='offer_image' className={imageClass}/>
      </div>
      <Button 
        type='transparent'
        onClick={() => handleImageChange(1)}
        children={<ChevronRightIcon className={iconClass} />}
      />
    </div>
  );
}

export default Carousel;