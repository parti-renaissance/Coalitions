import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';

import useSelector from 'redux/useSelector';
import { useFetchCauses } from 'redux/Cause/hooks';
import { StyledCauseList, CauseListContainer } from './CauseList.style';
import Loader from 'components/Loader';
import Cause from 'components/Cause';
import { getAllCauses } from 'redux/Cause/selectors';
import { CoalitionsFilter } from './CoalitionsFilter/CoalitionsFilter';
import { CreateCauseCTA } from './CreateCauseCTA/CreateCauseCTA';
import { DESKTOP_BREAK_POINT, TABLET_BREAK_POINT } from 'stylesheet';

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
    <FormattedMessage id="cause_list.description" />
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
  const { hasMore, loading, error, fetchFirstPage, fetchNextPage } = useFetchCauses();

  useEffect(() => {
    fetchFirstPage();
  }, [fetchFirstPage]);

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

  return (
    <StyledCauseList>
      <CauseListHeader loading={loading} error={error} causesNumber={causes.length} />
      {causes.length > 0 && (
        <>
          <CoalitionsFilter />

          <InfiniteScroll
            dataLength={causes.length}
            next={fetchNextPage}
            hasMore={hasMore}
            loader={<Loader />}
          >
            <CauseListContainer>
              {causes.reduce((acc: JSX.Element[], cause, index) => {
                if (index === ctaPosition) {
                  acc.push(<CreateCauseCTA key="cta" />);
                }
                acc.push(<Cause key={cause.uuid} cause={cause} />);
                return acc;
              }, [])}
            </CauseListContainer>
          </InfiniteScroll>
        </>
      )}
    </StyledCauseList>
  );
};

export default CauseList;
