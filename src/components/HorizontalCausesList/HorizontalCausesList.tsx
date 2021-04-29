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
  CarouselControlsContainer,
  LeftArrow,
  RightArrow,
  LoaderContainer,
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
import { defaultMarginsAsNumber } from 'stylesheet';
import Carousel, { CarouselProps } from 'nuka-carousel';
import IconButton from '@material-ui/core/IconButton';

interface HorizontalCausesListProps {
  coalitionId?: string;
}

const DesktopCarousel: ForwardRefRenderFunction<any, CarouselProps> = (props, ref) => (
  <CarouselWrapper>
    <Carousel
      {...props}
      slideWidth={`${DESKTOP_CAUSE_CARD_WIDTH}px`}
      cellSpacing={DESKTOP_CAUSE_MARGIN_RIGHT}
      framePadding={`0px ${defaultMarginsAsNumber.horizontal.desktop}px`}
      frameOverflow="visible"
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
          <CarouselControlsContainer>
            <IconButton onClick={onControlButtonClick(false)}>
              <LeftArrow src="/images/leftCircleArrow.svg" />
            </IconButton>
            <RightCarouselButton onClick={onControlButtonClick(true)}>
              <RightArrow src="/images/leftCircleArrow.svg" />
            </RightCarouselButton>
          </CarouselControlsContainer>
          <SeeAllButton onClick={onSeeAllClick}>
            {intl.formatMessage({ id: 'horizontal_causes_list.see-all' })}
          </SeeAllButton>
        </RightHeaderSubContainer>
      </Header>
      {isFetchingCauses && causes.length === 0 ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
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
