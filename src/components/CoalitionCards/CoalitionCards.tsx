import React, { FunctionComponent, useEffect } from 'react';
import {
  Container,
  SubContainer,
  CoalitionContainer,
  CoalitionImage,
  CoalitionName,
  SelectedCoalitionContainer,
  SelectedCoalitionIndex,
} from './CoalitionCards.style';
import { useFetchCoalitions } from 'redux/Coalition/hooks';
import { getCoalitions } from 'redux/Coalition/selectors';
import { useSelector } from 'react-redux';
import { Coalition } from 'redux/Coalition/types';
import Loader from 'components/Loader';

interface CoalitionCardsProps {
  onCoalitionClick?: (coalition: Coalition) => void;
  selectedCoalitionUuids?: string[];
  responsiveNbOfCardsByLine?: boolean;
}

const CoalitionCards: FunctionComponent<CoalitionCardsProps> = ({
  onCoalitionClick,
  selectedCoalitionUuids,
  responsiveNbOfCardsByLine,
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
    return (
      <CoalitionContainer
        key={coalition.uuid}
        onClick={onCoalitionClick !== undefined ? onClick : undefined}
        responsiveNbOfCardsByLine={responsiveNbOfCardsByLine}
      >
        <CoalitionImage backgroundImage={coalition.image_url}>
          {selectedCoalitionUuids !== undefined &&
          selectedCoalitionUuids.includes(coalition.uuid) ? (
            <SelectedCoalitionContainer>
              <SelectedCoalitionIndex>
                {selectedCoalitionUuids.indexOf(coalition.uuid) + 1}
              </SelectedCoalitionIndex>
            </SelectedCoalitionContainer>
          ) : null}
        </CoalitionImage>
        <CoalitionName>{coalition.name}</CoalitionName>
      </CoalitionContainer>
    );
  };

  if (isFetchingCoalitions && coalitions.length === 0) {
    return (
      <Container>
        <Loader />
      </Container>
    );
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
