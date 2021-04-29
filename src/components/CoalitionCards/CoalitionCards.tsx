import React, { FunctionComponent, useEffect } from 'react';
import { Container, SubContainer } from './CoalitionCards.style';
import { useFetchCoalitions } from 'redux/Coalition/hooks/useFetchCoalitions';
import { getCoalitions } from 'redux/Coalition/selectors';
import { useSelector } from 'react-redux';
import { Coalition } from 'redux/Coalition/types';
import Loader from 'components/Loader';
import CoalitionCard from './components/CoalitionCard';

interface CoalitionCardsProps {
  onCoalitionClick?: (coalition: Coalition) => void;
  selectedCoalitionUuids?: string[];
}

const CoalitionCards: FunctionComponent<CoalitionCardsProps> = ({
  onCoalitionClick,
  selectedCoalitionUuids,
}) => {
  const coalitions = useSelector(getCoalitions);
  const { fetchCoalitions, isFetchingCoalitions } = useFetchCoalitions();

  useEffect(() => {
    if (coalitions.length === 0) {
      fetchCoalitions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCoalitions]);

  const renderCoalitionCard = (coalition: Coalition) => {
    const onClick = () => {
      if (onCoalitionClick !== undefined) {
        onCoalitionClick(coalition);
      }
    };

    const selectedIndex =
      selectedCoalitionUuids !== undefined && selectedCoalitionUuids.includes(coalition.uuid)
        ? selectedCoalitionUuids.indexOf(coalition.uuid)
        : undefined;

    return <CoalitionCard onClick={onClick} selectedIndex={selectedIndex} coalition={coalition} />;
  };

  if (isFetchingCoalitions && coalitions.length === 0) {
    return <Loader />;
  }

  if (coalitions.length === 0) {
    return null;
  }

  let filteredCoalitions = coalitions;
  if (onCoalitionClick === undefined) {
    filteredCoalitions = coalitions.filter(
      ({ uuid }) => selectedCoalitionUuids !== undefined && selectedCoalitionUuids.includes(uuid),
    );
  }
  return (
    <Container>
      <SubContainer>{filteredCoalitions.map(renderCoalitionCard)}</SubContainer>
    </Container>
  );
};

export default CoalitionCards;
