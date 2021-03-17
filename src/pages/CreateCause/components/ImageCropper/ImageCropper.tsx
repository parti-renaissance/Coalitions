import React, { FunctionComponent, useRef } from 'react';
import { useIntl } from 'react-intl';
import {
  InputContainer,
  StyledInput,
  BottomContainer,
  UpdateButton,
  PlusIconContainer,
  ImportLabel,
} from './ImageCropper.style';
import { getIsMobile } from 'services/mobile/mobile';
import PlusIcon from '@material-ui/icons/Add';

const ImageCropper: FunctionComponent<{}> = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const intl = useIntl();
  const isMobile = getIsMobile();

  const onClick = () => {
    if (inputRef?.current !== null) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <InputContainer onClick={onClick}>
        <PlusIconContainer>
          <PlusIcon color="primary" fontSize={isMobile ? 'small' : 'default'} />
        </PlusIconContainer>
        <ImportLabel>
          {isMobile
            ? intl.formatMessage({ id: 'create_cause.image.importFromGallery' })
            : intl.formatMessage({ id: 'create_cause.image.importFromComputer' })}
        </ImportLabel>
      </InputContainer>
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
