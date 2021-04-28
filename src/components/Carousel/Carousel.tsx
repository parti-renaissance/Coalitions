import React, { FunctionComponent } from 'react';
import NukaCarousel, { CarouselProps as NukaCarouselProps } from 'nuka-carousel';

export type CarouselProps = NukaCarouselProps;

const Carousel: FunctionComponent<CarouselProps> = props => {
  return <NukaCarousel {...props} withoutControls />;
};

export default Carousel;
