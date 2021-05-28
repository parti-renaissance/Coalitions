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
  slidesHeight: { mobile: number; desktop: number };
  TitleComponent?: FunctionComponent;
  desktopSlideWidth: number;
  desktopCellSpacing: number;
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

// eslint-disable-next-line complexity
const Slider: FunctionComponent<SliderProps> = ({
  slidesCount,
  isLoadingSlides,
  title,
  onSeeAllClick,
  slidesHeight,
  TitleComponent = 'h3',
  desktopSlideWidth,
  desktopCellSpacing,
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

  let areSlidesAllVisible = false;
  if (carouselRef?.current?.frame?.clientWidth !== undefined) {
    areSlidesAllVisible =
      (desktopSlideWidth + desktopCellSpacing) * slidesCount <
      carouselRef.current.frame.clientWidth;
  }

  return (
    <Container>
      <Header>
        <TitleComponent>{title}</TitleComponent>
        <RightHeaderSubContainer>
          {!areSlidesAllVisible ? (
            <CarouselControlsContainer>
              <IconButton onClick={onControlButtonClick(false)}>
                <LeftArrow src="/images/leftCircleArrow.svg" />
              </IconButton>
              <IconButton onClick={onControlButtonClick(true)}>
                <RightArrow src="/images/leftCircleArrow.svg" />
              </IconButton>
            </CarouselControlsContainer>
          ) : null}
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
        <SlidesContainer
          cellSpacing={desktopCellSpacing}
          slideWidth={`${desktopSlideWidth}px`}
          dragging={!areSlidesAllVisible}
          swiping={!areSlidesAllVisible}
          ref={carouselRef}
        >
          {children}
        </SlidesContainer>
      )}
    </Container>
  );
};

export default Slider;
