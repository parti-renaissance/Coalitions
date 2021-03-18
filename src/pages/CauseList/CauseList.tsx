import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';

import useSelector from 'redux/useSelector';
import { useFetchCauses } from 'redux/Cause/hooks/useFetchCauses';
import { StyledCauseList, CauseListContainer, CTAContainer } from './CauseList.style';
import Loader from 'components/Loader';
import Cause from 'components/Cause';
import { getAllCauses } from 'redux/Cause/selectors';
import { CoalitionsFilter } from './CoalitionsFilter/CoalitionsFilter';
import { CreateCauseCTA } from './CreateCauseCTA/CreateCauseCTA';
import { DESKTOP_BREAK_POINT, TABLET_BREAK_POINT } from 'stylesheet';
import { getUserToken } from 'redux/Login/selectors';

interface CauseListHeaderProps {
  loading: boolean;
  error?: Error;
  causesNumber: number;
}

const CauseListHeader: React.FunctionComponent<CauseListHeaderProps> = ({
  loading,
  error,
  causesNumber,
}) => (
  <>
    {loading && causesNumber === 0 && <Loader />}
    {!loading && error !== undefined && <FormattedMessage id="cause_list.error" />}
    {!loading && error === undefined && causesNumber === 0 && (
      <FormattedMessage id="cause_list.no_cause" />
    )}
  </>
);

const defineCtaPositionInList = (): number => {
  let ctaPosition = 3;
  if (window.innerWidth > TABLET_BREAK_POINT) {
    ctaPosition = 6;
  }
  if (window.innerWidth > DESKTOP_BREAK_POINT) {
    ctaPosition = 12;
  }
  return ctaPosition;
};

const CauseList: React.FunctionComponent = () => {
  const causes = useSelector(getAllCauses);
  const isUserLoggedIn = Boolean(useSelector(getUserToken));
  const [filteredByCoalitionIds, setFilteredByCoalitionIds] = useState<string[]>([]);
  const { hasMore, loading, error, fetchFirstPage, fetchNextPage } = useFetchCauses();

  useEffect(() => {
    fetchFirstPage(filteredByCoalitionIds);
  }, [fetchFirstPage, filteredByCoalitionIds, isUserLoggedIn]);

  const [ctaPosition, setCtaPosition] = useState(defineCtaPositionInList());

  useEffect(() => {
    const handleResize = () => {
      setCtaPosition(defineCtaPositionInList());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const causesBeforeCTA = causes.slice(0, ctaPosition);
  const causesAfterCTA = causes.slice(ctaPosition);

  return (
    <StyledCauseList>
      <FormattedMessage id="cause_list.description" />
      <CoalitionsFilter handleCoalitionsFilterClick={setFilteredByCoalitionIds} />
      <CauseListHeader loading={loading} error={error} causesNumber={causes.length} />
      {causes.length > 0 && (
        <>
          <InfiniteScroll
            dataLength={causes.length}
            next={() => fetchNextPage(filteredByCoalitionIds)}
            hasMore={hasMore}
            loader={<Loader />}
          >
            <CauseListContainer>
              {causesBeforeCTA.map(cause => (
                <Cause key={cause.uuid} cause={cause} />
              ))}
            </CauseListContainer>
            <CTAContainer>
              <CreateCauseCTA />
            </CTAContainer>
            <CauseListContainer>
              {causesAfterCTA.map(cause => (
                <Cause key={cause.uuid} cause={cause} />
              ))}
            </CauseListContainer>
          </InfiniteScroll>
        </>
      )}
    </StyledCauseList>
  );
};

export default CauseList;
