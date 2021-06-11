import React, { FunctionComponent, useEffect } from 'react';
import { CauseCardWrapper, EmptyMobileDiv } from './HorizontalCausesList.style';
import Cause from 'components/Cause';
import { useIntl } from 'react-intl';
import { PATHS } from 'routes';
import { useSelector } from 'react-redux';
import { useFetchCauses, SortOptions, PAGE_SIZE } from 'redux/Cause/hooks/useFetchCauses';
import { getAllCauses, getMyCauses } from 'redux/Cause/selectors';
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
  onlyMine?: boolean;
}

const HorizontalCausesList: FunctionComponent<HorizontalCausesListProps> = ({
  coalitionId,
  onlyMine = false,
}) => {
  const intl = useIntl();
  const causes = useSelector(onlyMine ? getMyCauses : getAllCauses);
  const { loading: isFetchingCauses, fetchFirstPage: fetchCauses } = useFetchCauses(
    PAGE_SIZE,
    onlyMine,
  );
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

  const title = onlyMine
    ? intl.formatMessage({ id: 'horizontal_causes_list.title_onlyMine' })
    : intl.formatMessage({ id: 'horizontal_causes_list.title' });

  return (
    <Slider
      slidesCount={causes.length}
      isLoadingSlides={isFetchingCauses}
      title={title}
      onSeeAllClick={!onlyMine ? onSeeAllClick : undefined}
      desktopCellSpacing={DESKTOP_CAUSE_MARGIN_RIGHT}
      desktopSlideWidth={DESKTOP_CAUSE_CARD_WIDTH}
      slidesHeight={{ mobile: MOBILE_CAUSE_CARD_HEIGHT, desktop: DESKTOP_CAUSE_CARD_HEIGHT }}
    >
      {causes.slice(0, 20).map(cause => (
        <CauseCardWrapper key={cause.uuid}>
          <Cause cause={!onlyMine ? cause : { ...cause, supported: true }} />
        </CauseCardWrapper>
      ))}
      {isMobile ? <EmptyMobileDiv /> : null}
    </Slider>
  );
};

export default HorizontalCausesList;
