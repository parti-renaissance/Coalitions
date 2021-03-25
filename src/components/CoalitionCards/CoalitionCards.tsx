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

interface CoalitionCardsProps {
  onCoalitionClick: (coalition: Coalition) => void;
  selectedCoalitionUuids?: string[];
  responsiveNbOfCardsByLine?: boolean;
}

const CoalitionCards: FunctionComponent<CoalitionCardsProps> = ({
  onCoalitionClick,
  selectedCoalitionUuids,
  responsiveNbOfCardsByLine,
}) => {
  const coalitions = useSelector(getCoalitions);
  const { fetchCoalitions } = useFetchCoalitions();

  useEffect(() => {
    if (coalitions.length === 0) {
      fetchCoalitions();
    }
  }, [fetchCoalitions, coalitions]);

  const renderCoalitionCard = (coalition: Coalition) => {
    const onClick = () => onCoalitionClick(coalition);
    return (
      <CoalitionContainer
        key={coalition.uuid}
        onClick={onClick}
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

  if (coalitions.length === 0) {
    return null;
  }

  return (
    <Container>
      <SubContainer>{coalitions.map(renderCoalitionCard)}</SubContainer>
    </Container>
  );
};

export default CoalitionCards;
