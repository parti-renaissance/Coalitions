import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const Demo: React.FC = () => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const [image, setImage] = useState('');
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
  };

  const handleChange = (event: any) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      {image !== '' ? (
        <Cropper
          src={image}
          style={{ height: 400, width: '100%' }}
          // Cropper.js options
          aspectRatio={16 / 9}
          guides={false}
          crop={onCrop}
          ref={cropperRef}
        />
      ) : null}
    </>
  );
};

export default Demo;
