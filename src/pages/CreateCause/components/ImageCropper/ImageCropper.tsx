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
import Resizer from 'react-image-file-resizer';

const IMAGE_DIMENSIONS = {
  width: 960,
  height: 540,
};

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
  const [croppedImage, setCroppedImage] = useState<Blob | null>(null);
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
    } else if (croppedImage !== null) {
      Resizer.imageFileResizer(
        croppedImage,
        IMAGE_DIMENSIONS.width,
        IMAGE_DIMENSIONS.height,
        'base64',
        100,
        0,
        (resizedImage: string | Blob | File | ProgressEvent<FileReader>): void => {
          setImage(resizedImage as string);
          setCroppedImage(null);
          setImageToCrop(undefined);
        },
        'base64',
        IMAGE_DIMENSIONS.width,
        IMAGE_DIMENSIONS.height,
      );
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      setImageToCrop(URL.createObjectURL(event.target.files[0]));
      event.target.value = '';
    }
  };

  const onCrop = () => {
    if (cropperRef.current !== null) {
      cropperRef.current.cropper.getCroppedCanvas().toBlob((newCroppedImage: Blob | null) => {
        setCroppedImage(newCroppedImage);
      });
    }
  };

  const renderTopPart = () => {
    if (image !== undefined && imageToCrop === undefined) {
      return <Image src={image} />;
    } else if (imageToCrop !== undefined) {
      return (
        <StyledCropper
          aspectRatio={16 / 9}
          src={imageToCrop}
          cropend={onCrop}
          ready={onCrop}
          ref={cropperRef}
          guides={false}
          modal={false}
          background={false}
          movable={false}
          zoomable={false}
          viewMode={1}
        />
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
              : intl.formatMessage({ id: 'create_cause.image.save' })}
          </UpdateButton>
        </BottomContainer>
      ) : null}
      <HiddenInput type="file" ref={inputRef} onChange={onChange} />
    </>
  );
};

export default ImageCropper;
