import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSelector from 'redux/useSelector';
import { useFetchCauses, Filters } from 'redux/Cause/hooks/useFetchCauses';
import {
  CauseListContainer,
  CTAContainer,
  Title,
  TitleContainer,
  SearchFieldWrapper,
} from './CauseList.style';
import Loader from 'components/Loader';
import Cause from 'components/Cause';
import { getAllCauses, getNumberOfCauses } from 'redux/Cause/selectors';
import { CoalitionsFilter } from './CoalitionsFilter/CoalitionsFilter';
import { CreateCauseCTA } from './CreateCauseCTA/CreateCauseCTA';
import { DESKTOP_BREAK_POINT, TABLET_BREAK_POINT } from 'stylesheet';
import SearchField from 'components/SearchField';

interface CauseListHeaderProps {
  loading: boolean;
  causesNumber: number;
}

const CauseListHeader: React.FunctionComponent<CauseListHeaderProps> = ({
  loading,
  causesNumber,
}) => (
  <>
    {loading && causesNumber === 0 && <Loader />}
    {!loading && causesNumber === 0 && <FormattedMessage id="cause_list.no_cause" />}
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
  const [filters, setFilters] = useState<Filters>({ coalitionIds: [], searchText: '' });
  const { hasMore, loading, fetchFirstPage, fetchNextPage } = useFetchCauses();
  const [ctaPosition, setCtaPosition] = useState(defineCtaPositionInList());
  const numberOfCauses = useSelector(getNumberOfCauses);

  useEffect(() => {
    fetchFirstPage(filters);
  }, [fetchFirstPage, filters]);

  useEffect(() => {
    const handleResize = () => {
      setCtaPosition(defineCtaPositionInList());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const fetchNextPageCauses = useCallback(() => {
    fetchNextPage(filters);
  }, [fetchNextPage, filters]);

  const setSearchText = (searchText: string) => {
    setFilters({ ...filters, searchText });
  };

  const setSelectedCoalitionIds = (coalitionIds: string[]) => {
    setFilters({ ...filters, coalitionIds });
  };

  const causesBeforeCTA = causes.slice(0, ctaPosition);
  const causesAfterCTA = causes.slice(ctaPosition);
  return (
    <>
      <TitleContainer>
        <Title>
          <FormattedMessage id="cause_list.title" values={{ numberOfCauses }} />
        </Title>
        <p>
          <FormattedMessage id="cause_list.description" />
        </p>
      </TitleContainer>
      <SearchFieldWrapper>
        <SearchField
          searchText={filters?.searchText}
          setSearchText={setSearchText}
          isSearchingByText={
            loading && filters?.searchText !== undefined && filters.searchText.length > 0
          }
        />
      </SearchFieldWrapper>
      <CoalitionsFilter
        setSelectedCoalitionIds={setSelectedCoalitionIds}
        selectedCoalitionIds={filters?.coalitionIds}
      />
      <CauseListHeader loading={loading} causesNumber={causes.length} />
      {causes.length > 0 ? (
        <>
          <InfiniteScroll
            dataLength={causes.length}
            next={fetchNextPageCauses}
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
      ) : null}
    </>
  );
};

export default CauseList;
