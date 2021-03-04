import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';

import useSelector from 'redux/useSelector';
import { useFetchCauses } from 'redux/Cause/hooks';
import { StyledCauseList, CauseListContainer } from './CauseList.style';
import Loader from 'components/Loader';
import Cause from 'components/Cause';
import { getCauses } from 'redux/Cause/selectors';
import { CoalitionsFilter } from './CoalitionsFilter/CoalitionsFilter';

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

const CauseList: React.FunctionComponent = () => {
  const causes = useSelector(getCauses);
  const { hasMore, loading, error, fetchFirstPage, fetchNextPage } = useFetchCauses();

  useEffect(() => {
    fetchFirstPage();
  }, [fetchFirstPage]);

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
              {causes.map(cause => (
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
