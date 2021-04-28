import React, { useCallback, useEffect, useState, FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import useSelector from 'redux/useSelector';
import { useFetchCauses, Filters } from 'redux/Cause/hooks/useFetchCauses';
import {
  CauseListContainer,
  Title,
  TitleContainer,
  SearchAndSortWrapper,
  LoaderAndEmptyLabelContainer,
} from './CauseList.style';
import Loader from 'components/Loader';
import Cause from 'components/Cause';
import { getAllCauses, getNumberOfCauses } from 'redux/Cause/selectors';
import CoalitionsFilter from './components/CoalitionsFilter';
import CreateCauseCTA from '../../components/CreateCauseCTA';
import SearchField from 'components/SearchField';
import { useLocation } from 'react-router';
import { useSetSearchParams } from './lib/useSetSearchParams';
import { Cause as CauseType } from 'redux/Cause/types';
import { defineCtaPositionInList } from './lib/defineCtaPositionInList';

const renderCause = (cause: CauseType) => <Cause key={cause.uuid} cause={cause} />;

const renderLoader = () => (
  <LoaderAndEmptyLabelContainer>
    <Loader />
  </LoaderAndEmptyLabelContainer>
);

const LoaderAndEmptyLabel: FunctionComponent<{
  loading: boolean;
  hasFilters: boolean;
}> = ({ loading, hasFilters }) => {
  const intl = useIntl();

  if (loading) {
    return renderLoader();
  }

  return (
    <LoaderAndEmptyLabelContainer>
      <p>
        {hasFilters
          ? intl.formatMessage({ id: 'cause_list.no_search_result' })
          : intl.formatMessage({ id: 'cause_list.no_cause' })}
      </p>
    </LoaderAndEmptyLabelContainer>
  );
};

const CauseList: React.FunctionComponent = () => {
  const causes = useSelector(getAllCauses);
  const { search } = useLocation();
  const coalitionId = new URLSearchParams(search).get('coalitionId');
  const searchText = new URLSearchParams(search).get('name');
  const [filters, setFilters] = useState<Filters>({
    coalitionIds: coalitionId !== null ? [coalitionId] : [],
    searchText: searchText !== null ? searchText : '',
  });
  const { hasMore, loading, fetchFirstPage, fetchNextPage } = useFetchCauses();
  const [ctaPosition, setCtaPosition] = useState(defineCtaPositionInList());
  const numberOfCauses = useSelector(getNumberOfCauses);
  const { setSearchParams } = useSetSearchParams();
  const intl = useIntl();

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

  useEffect(() => {
    setSearchParams(filters);
  }, [filters, setSearchParams]);

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
        <Title>{intl.formatMessage({ id: 'cause_list.title' }, { numberOfCauses })}</Title>
        <p>{intl.formatMessage({ id: 'cause_list.description' })}</p>
      </TitleContainer>
      <SearchAndSortWrapper>
        <SearchField searchText={filters.searchText} setSearchText={setSearchText} />
      </SearchAndSortWrapper>
      <CoalitionsFilter
        setSelectedCoalitionIds={setSelectedCoalitionIds}
        selectedCoalitionIds={filters.coalitionIds}
      />
      {causes.length > 0 ? (
        <InfiniteScroll
          dataLength={causes.length}
          next={fetchNextPageCauses}
          hasMore={hasMore}
          loader={renderLoader()}
        >
          <CauseListContainer>{causesBeforeCTA.map(renderCause)}</CauseListContainer>
          <CreateCauseCTA />
          {causesAfterCTA.length > 0 ? (
            <CauseListContainer bellowCTA>{causesAfterCTA.map(renderCause)}</CauseListContainer>
          ) : null}
        </InfiniteScroll>
      ) : (
        <LoaderAndEmptyLabel
          loading={loading}
          hasFilters={filters.searchText.length > 0 || filters.coalitionIds.length > 0}
        />
      )}
    </>
  );
};

export default CauseList;
