import React, { FunctionComponent, useEffect } from 'react';
import {
  Container,
  CoalitionContainer,
  CoalitionImage,
  CoalitionName,
} from './CoalitionCards.style';
import { useFetchCoalitions } from 'redux/Coalition/hooks';
import { getCoalitions } from 'redux/Coalition/selectors';
import { useSelector } from 'react-redux';
import { Coalition } from 'redux/Coalition/types';

const CoalitionCards: FunctionComponent<{}> = () => {
  const coalitions = useSelector(getCoalitions);
  const { fetchCoalitions } = useFetchCoalitions();

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

  const renderCoalitionCard = (coalition: Coalition) => (
    <CoalitionContainer key={coalition.uuid}>
      <CoalitionImage src={coalition.image_url} />
      <CoalitionName>{coalition.name}</CoalitionName>
    </CoalitionContainer>
  );

  if (coalitions.length === 0) {
    return null;
  }

  return <Container>{coalitions.map(renderCoalitionCard)}</Container>;
};

export default CoalitionCards;
