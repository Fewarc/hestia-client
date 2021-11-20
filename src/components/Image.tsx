import React, { useState } from "react";

const Image: React.FC<{file: any}> = ({
  file
}) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>();
  const reader = new FileReader();
  const url = reader.readAsDataURL(file);
  reader.onloadend = () => {
    setImage(reader.result);
  }

  return (
    <div>
      <img src={image as string} />
    </div>
  );
}

export default Image;