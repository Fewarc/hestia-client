/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

const Image: React.FC<{
  file: any,
  className?: string
}> = ({
  file,
  className
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const reader = new FileReader();
  const url = reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImage(reader.result);
  }

  return (
    <div className={className}>
      <img alt='offer_image' src={image as string} />
    </div>
  );
}

export default Image;