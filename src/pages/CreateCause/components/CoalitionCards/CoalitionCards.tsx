import React, { FunctionComponent, useEffect } from 'react';
import {
  Container,
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
  onCoalitionClick: (coalitionUuid: string) => void;
  selectedCoalitionUuids?: string[];
}

const CoalitionCards: FunctionComponent<CoalitionCardsProps> = ({
  onCoalitionClick,
  selectedCoalitionUuids,
}) => {
  const coalitions = useSelector(getCoalitions);
  const { fetchCoalitions } = useFetchCoalitions();

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

  const renderCoalitionCard = (coalition: Coalition) => {
    const onClick = () => onCoalitionClick(coalition.uuid);
    return (
      <CoalitionContainer key={coalition.uuid} onClick={onClick}>
        <CoalitionImage src={coalition.image_url} />
        <CoalitionName>{coalition.name}</CoalitionName>
        {selectedCoalitionUuids !== undefined && selectedCoalitionUuids.includes(coalition.uuid) ? (
          <SelectedCoalitionContainer>
            <SelectedCoalitionIndex>
              {selectedCoalitionUuids.indexOf(coalition.uuid) + 1}
            </SelectedCoalitionIndex>
          </SelectedCoalitionContainer>
        ) : null}
      </CoalitionContainer>
    );
  };

  if (coalitions.length === 0) {
    return null;
  }

  return <Container>{coalitions.map(renderCoalitionCard)}</Container>;
};

export default CoalitionCards;
