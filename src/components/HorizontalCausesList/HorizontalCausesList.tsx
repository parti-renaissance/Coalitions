import React, { FunctionComponent, useEffect } from 'react';
import {
  Header,
  SubContainer,
  SeeAllButton,
  CarouselWrapper,
  Container,
  CauseCardWrapper,
  DESKTOP_CAUSE_MARGIN_RIGHT,
  EmptyMobileDiv,
} from './HorizontalCausesList.style';
import Cause from 'components/Cause';
import { useIntl } from 'react-intl';
import { PATHS } from 'routes';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { useFetchCauses, SortOptions } from 'redux/Cause/hooks/useFetchCauses';
import { getAllCauses } from 'redux/Cause/selectors';
import { useHistory } from 'react-router';
import Carousel, { CarouselProps } from 'components/Carousel/Carousel';
import { getIsMobile } from 'services/mobile/mobile';
import { DESKTOP_CAUSE_CARD_WIDTH } from 'components/Cause/Cause.style';
import { Cause as CauseType } from 'redux/Cause/types';
import { LARGE_DESKTOP_BREAK_POINT, defaultMarginsAsNumber } from 'stylesheet';

interface HorizontalCausesListProps {
  coalitionId?: string;
}

const renderCause = (cause: CauseType) => (
  <CauseCardWrapper key={cause.uuid}>
    <Cause cause={cause} />
  </CauseCardWrapper>
);

const HorizontalCausesList: FunctionComponent<HorizontalCausesListProps> = ({ coalitionId }) => {
  const intl = useIntl();
  const causes = useSelector(getAllCauses);
  const { loading: isFetchingCauses, fetchFirstPage: fetchCauses } = useFetchCauses();
  const history = useHistory();
  const isMobile = getIsMobile();

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

  if (!isFetchingCauses && causes.length === 0) {
    return null;
  }

  const CausesContainer = isMobile
    ? SubContainer
    : (props: CarouselProps) => (
        <CarouselWrapper>
          <Carousel
            {...props}
            slideWidth={`${DESKTOP_CAUSE_CARD_WIDTH + DESKTOP_CAUSE_MARGIN_RIGHT}px`}
            width={`${Math.min(window.innerWidth, LARGE_DESKTOP_BREAK_POINT)}px`}
            framePadding={`0px ${defaultMarginsAsNumber.horizontal.desktop}px`}
            frameOverflow="visible"
          />
        </CarouselWrapper>
      );
  return (
    <Container>
      <Header>
        <h3>{intl.formatMessage({ id: 'horizontal_causes_list.title' })}</h3>
        <SeeAllButton onClick={onSeeAllClick}>
          {intl.formatMessage({ id: 'horizontal_causes_list.see-all' })}
        </SeeAllButton>
      </Header>
      {isFetchingCauses && causes.length === 0 ? (
        <Loader />
      ) : (
        <CausesContainer>
          {causes.slice(0, 5).map(renderCause)}
          <EmptyMobileDiv />
        </CausesContainer>
      )}
    </Container>
  );
};

export default HorizontalCausesList;
