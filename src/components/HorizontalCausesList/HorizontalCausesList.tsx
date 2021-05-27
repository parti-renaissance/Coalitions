import React, { FunctionComponent, useEffect } from 'react';
import { CauseCardWrapper, EmptyMobileDiv } from './HorizontalCausesList.style';
import Cause from 'components/Cause';
import { useIntl } from 'react-intl';
import { PATHS } from 'routes';
import { useSelector } from 'react-redux';
import { useFetchCauses, SortOptions } from 'redux/Cause/hooks/useFetchCauses';
import { getAllCauses } from 'redux/Cause/selectors';
import { useHistory } from 'react-router';
import { getIsMobile } from 'services/mobile/mobile';
import Slider from 'components/Slider';
import {
  MOBILE_CAUSE_CARD_HEIGHT,
  DESKTOP_CAUSE_CARD_HEIGHT,
  DESKTOP_CAUSE_CARD_WIDTH,
  DESKTOP_CAUSE_MARGIN_RIGHT,
} from 'components/Cause/Cause.style';

interface HorizontalCausesListProps {
  coalitionId?: string;
}

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

  return (
    <Slider
      slidesCount={causes.length}
      isLoadingSlides={isFetchingCauses}
      title={intl.formatMessage({ id: 'horizontal_causes_list.title' })}
      onSeeAllClick={onSeeAllClick}
      desktopCellSpacing={DESKTOP_CAUSE_MARGIN_RIGHT}
      desktopSlideWidth={DESKTOP_CAUSE_CARD_WIDTH}
      slidesHeight={{ mobile: MOBILE_CAUSE_CARD_HEIGHT, desktop: DESKTOP_CAUSE_CARD_HEIGHT }}
    >
      {causes.slice(0, 20).map(cause => (
        <CauseCardWrapper key={cause.uuid}>
          <Cause cause={cause} />
        </CauseCardWrapper>
      ))}
      {isMobile ? <EmptyMobileDiv /> : null}
    </Slider>
  );
};

export default HorizontalCausesList;
