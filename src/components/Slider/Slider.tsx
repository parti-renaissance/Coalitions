import React, { forwardRef, FunctionComponent, ForwardRefRenderFunction, useRef } from 'react';
import {
  Header,
  SubContainer,
  SeeAllButton,
  CarouselWrapper,
  Container,
  RightHeaderSubContainer,
  CarouselControlsContainer,
  LeftArrow,
  RightArrow,
  LoaderContainer,
} from './Slider.style';
import { useIntl } from 'react-intl';
import Loader from 'components/Loader';
import { getIsMobile } from 'services/mobile/mobile';
import { defaultMarginsAsNumber } from 'stylesheet';
import Carousel, { CarouselProps } from 'nuka-carousel';
import IconButton from '@material-ui/core/IconButton';

interface SliderProps {
  slidesCount: number;
  isLoadingSlides?: boolean;
  title: string;
  onSeeAllClick?: () => void;
  desktopCarouselProps: CarouselProps;
  slidesHeight: { mobile: number; desktop: number };
  TitleComponent?: FunctionComponent;
}

const DesktopCarousel: ForwardRefRenderFunction<any, CarouselProps> = (props, ref) => (
  <CarouselWrapper>
    <Carousel
      {...props}
      framePadding={`0px ${defaultMarginsAsNumber.horizontal.desktop}px`}
      frameOverflow="visible"
      withoutControls
      wrapAround
      ref={ref}
    />
  </CarouselWrapper>
);

const DesktopCarouselWithRef = forwardRef<any, CarouselProps>(DesktopCarousel);

const Slider: FunctionComponent<SliderProps> = ({
  slidesCount,
  isLoadingSlides,
  title,
  onSeeAllClick,
  desktopCarouselProps,
  slidesHeight,
  TitleComponent = 'h3',
  children,
}) => {
  const intl = useIntl();
  const isMobile = getIsMobile();
  const carouselRef = useRef<any>(null);

  const onControlButtonClick = (goRight: boolean) => () => {
    if (goRight && carouselRef?.current?.nextSlide !== undefined) {
      carouselRef.current.nextSlide();
    } else if (!goRight && carouselRef?.current?.previousSlide !== undefined) {
      carouselRef.current.previousSlide();
    }
  };

  if (!Boolean(isLoadingSlides) && slidesCount === 0) {
    return null;
  }

  const SlidesContainer = (isMobile
    ? ({ children }) => <SubContainer height={slidesHeight.mobile}>{children}</SubContainer>
    : DesktopCarouselWithRef) as ForwardRefRenderFunction<any, CarouselProps & { ref: any }>;
  return (
    <Container>
      <Header>
        <TitleComponent>{title}</TitleComponent>
        <RightHeaderSubContainer>
          <CarouselControlsContainer>
            <IconButton onClick={onControlButtonClick(false)}>
              <LeftArrow src="/images/leftCircleArrow.svg" />
            </IconButton>
            <IconButton onClick={onControlButtonClick(true)}>
              <RightArrow src="/images/leftCircleArrow.svg" />
            </IconButton>
          </CarouselControlsContainer>
          {onSeeAllClick !== undefined ? (
            <SeeAllButton onClick={onSeeAllClick}>
              {intl.formatMessage({ id: 'horizontal_causes_list.see-all' })}
            </SeeAllButton>
          ) : null}
        </RightHeaderSubContainer>
      </Header>
      {isLoadingSlides === true && slidesCount === 0 ? (
        <LoaderContainer mobileHeight={slidesHeight.mobile} desktopHeight={slidesHeight.desktop}>
          <Loader />
        </LoaderContainer>
      ) : (
        <SlidesContainer {...desktopCarouselProps} ref={carouselRef}>
          {children}
        </SlidesContainer>
      )}
    </Container>
  );
};

export default Slider;
