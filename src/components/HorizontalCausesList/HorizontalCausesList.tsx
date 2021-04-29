import React, {
  forwardRef,
  FunctionComponent,
  ForwardRefRenderFunction,
  useEffect,
  useRef,
} from 'react';
import {
  Header,
  SubContainer,
  SeeAllButton,
  CarouselWrapper,
  Container,
  CauseCardWrapper,
  DESKTOP_CAUSE_MARGIN_RIGHT,
  EmptyMobileDiv,
  RightHeaderSubContainer,
  RightCarouselButton,
  LeftCarouselButton,
  LeftArrow,
  RightArrow,
} from './HorizontalCausesList.style';
import Cause from 'components/Cause';
import { useIntl } from 'react-intl';
import { PATHS } from 'routes';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { useFetchCauses, SortOptions } from 'redux/Cause/hooks/useFetchCauses';
import { getAllCauses } from 'redux/Cause/selectors';
import { useHistory } from 'react-router';
import { getIsMobile } from 'services/mobile/mobile';
import { DESKTOP_CAUSE_CARD_WIDTH } from 'components/Cause/Cause.style';
import { LARGE_DESKTOP_BREAK_POINT, defaultMarginsAsNumber } from 'stylesheet';
import Carousel, { CarouselProps } from 'nuka-carousel';

interface HorizontalCausesListProps {
  coalitionId?: string;
}

const DesktopCarousel: ForwardRefRenderFunction<any, CarouselProps> = (props, ref) => (
  <CarouselWrapper>
    <Carousel
      {...props}
      slideWidth={`${DESKTOP_CAUSE_CARD_WIDTH + DESKTOP_CAUSE_MARGIN_RIGHT}px`}
      width={`${Math.min(window.innerWidth, LARGE_DESKTOP_BREAK_POINT)}px`}
      framePadding={`0px ${defaultMarginsAsNumber.horizontal.desktop}px`}
      frameOverflow="visible"
      swiping={false}
      withoutControls
      wrapAround
      ref={ref}
    />
  </CarouselWrapper>
);

const DesktopCarouselWithRef = forwardRef<any, CarouselProps>(DesktopCarousel);

const HorizontalCausesList: FunctionComponent<HorizontalCausesListProps> = ({ coalitionId }) => {
  const intl = useIntl();
  const causes = useSelector(getAllCauses);
  const { loading: isFetchingCauses, fetchFirstPage: fetchCauses } = useFetchCauses();
  const history = useHistory();
  const isMobile = getIsMobile();
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    fetchCauses({
      coalitionIds: coalitionId !== undefined ? [coalitionId] : [],
      searchText: '',
      sort: SortOptions.moreSupported,
    });
  }, [fetchCauses, coalitionId]);

  const onSeeAllClick = () => {
    if (coalitionId !== undefined) {
      history.push({ pathname: PATHS.CAUSE_LIST.url(), search: `?coalitionId=${coalitionId}` });
    } else {
      history.push(PATHS.CAUSE_LIST.url());
    }
  };

  const onControlButtonClick = (goRight: boolean) => () => {
    if (goRight && carouselRef?.current?.nextSlide !== undefined) {
      carouselRef.current.nextSlide();
    } else if (!goRight && carouselRef?.current?.previousSlide !== undefined) {
      carouselRef.current.previousSlide();
    }
  };

  if (!isFetchingCauses && causes.length === 0) {
    return null;
  }

  const CausesContainer = isMobile ? SubContainer : DesktopCarouselWithRef;
  return (
    <Container>
      <Header>
        <h3>{intl.formatMessage({ id: 'horizontal_causes_list.title' })}</h3>
        <RightHeaderSubContainer>
          <LeftCarouselButton onClick={onControlButtonClick(false)}>
            <LeftArrow src="/images/leftCircleArrow.svg" />
          </LeftCarouselButton>
          <RightCarouselButton onClick={onControlButtonClick(true)}>
            <RightArrow src="/images/leftCircleArrow.svg" />
          </RightCarouselButton>
          <SeeAllButton onClick={onSeeAllClick}>
            {intl.formatMessage({ id: 'horizontal_causes_list.see-all' })}
          </SeeAllButton>
        </RightHeaderSubContainer>
      </Header>
      {isFetchingCauses && causes.length === 0 ? (
        <Loader />
      ) : (
        <CausesContainer ref={carouselRef}>
          {causes.slice(0, 20).map(cause => (
            <CauseCardWrapper key={cause.uuid}>
              <Cause cause={cause} />
            </CauseCardWrapper>
          ))}
          {isMobile ? <EmptyMobileDiv /> : null}
        </CausesContainer>
      )}
    </Container>
  );
};

export default HorizontalCausesList;
