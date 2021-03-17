import React, { FunctionComponent, useRef } from 'react';
import { useIntl } from 'react-intl';
import { InputContainer, StyledInput, BottomContainer, UpdateButton } from './ImageCropper.style';

const ImageCropper: FunctionComponent<{}> = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const intl = useIntl();

  const onClick = () => {
    if (inputRef?.current !== null) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <InputContainer onClick={onClick}></InputContainer>
      <BottomContainer>
        <UpdateButton variant="outlined" color="primary">
          {intl.formatMessage({ id: 'create_cause.image.update' })}
        </UpdateButton>
      </BottomContainer>
      <StyledInput type="file" ref={inputRef} />
    </>
  );
};

export default ImageCropper;
