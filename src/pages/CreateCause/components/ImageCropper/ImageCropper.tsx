import React, { FunctionComponent, useRef } from 'react';
import { InputContainer, StyledInput } from './ImageCropper.style';

const ImageCropper: FunctionComponent<{}> = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    if (inputRef?.current !== null) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <InputContainer onClick={onClick}></InputContainer>
      <StyledInput type="file" ref={inputRef} />
    </>
  );
};

export default ImageCropper;
