import React, { FunctionComponent, useRef, useState, ChangeEvent } from 'react';
import { useIntl } from 'react-intl';
import {
  InputContainer,
  HiddenInput,
  BottomContainer,
  UpdateButton,
  PlusIconContainer,
  ImportLabel,
  Image,
  StyledCropper,
} from './ImageCropper.style';
import { getIsMobile } from 'services/mobile/mobile';
import PlusIcon from '@material-ui/icons/Add';
import { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const InputPlaceholder: FunctionComponent<{ openGallery: () => void }> = ({ openGallery }) => {
  const isMobile = getIsMobile();
  const intl = useIntl();
  return (
    <InputContainer onClick={openGallery}>
      <PlusIconContainer>
        <PlusIcon color="primary" fontSize={isMobile ? 'small' : 'default'} />
      </PlusIconContainer>
      <ImportLabel>
        {isMobile
          ? intl.formatMessage({ id: 'create_cause.image.importFromGallery' })
          : intl.formatMessage({ id: 'create_cause.image.importFromComputer' })}
      </ImportLabel>
    </InputContainer>
  );
};

interface ImageCropperProps {
  image?: string;
  setImage: (image: string) => void;
}

const ImageCropper: FunctionComponent<ImageCropperProps> = ({ setImage, image }) => {
  const [imageToCrop, setImageToCrop] = useState<string | undefined>(undefined);
  const [croppedImage, setCroppedImage] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<ReactCropperElement | null>(null);
  const intl = useIntl();

  const openGallery = () => {
    if (inputRef?.current !== null) {
      inputRef.current.click();
    }
  };

  const onGenerateOrUpdateClick = () => {
    if (image !== undefined && imageToCrop === undefined) {
      openGallery();
    } else if (croppedImage !== undefined) {
      setImage(croppedImage);
      setCroppedImage(undefined);
      setImageToCrop(undefined);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      setImageToCrop(URL.createObjectURL(event.target.files[0]));
    }
  };

  const onCrop = () => {
    if (cropperRef.current !== null) {
      setCroppedImage(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const renderTopPart = () => {
    if (image !== undefined && imageToCrop === undefined) {
      return <Image src={image} />;
    } else if (imageToCrop !== undefined) {
      return (
        <StyledCropper aspectRatio={16 / 9} src={imageToCrop} crop={onCrop} ref={cropperRef} />
      );
    } else {
      return <InputPlaceholder openGallery={openGallery} />;
    }
  };

  return (
    <>
      {renderTopPart()}
      {(image !== undefined && imageToCrop === undefined) || imageToCrop !== undefined ? (
        <BottomContainer>
          <UpdateButton variant="outlined" color="primary" onClick={onGenerateOrUpdateClick}>
            {image !== undefined && imageToCrop === undefined
              ? intl.formatMessage({ id: 'create_cause.image.update' })
              : intl.formatMessage({ id: 'create_cause.image.generate' })}
          </UpdateButton>
        </BottomContainer>
      ) : null}
      <HiddenInput type="file" ref={inputRef} onChange={onChange} />
    </>
  );
};

export default ImageCropper;
