import React, { useEffect, useState } from 'react';
import { useFetchCoalitions } from 'redux/Coalition/hooks';
import { CoalitionFiltersContainer, StyledChip } from './CoalitionsFilter.style';

import { Coalition } from 'redux/Coalition/types';
import { getCoalitions } from 'redux/Coalition/selectors';
import { useSelector } from 'react-redux';

type Props = {
  handleCoalitionsFilterClick: (ids: string[]) => void;
};

export const CoalitionsFilter: React.FunctionComponent<Props> = ({
  handleCoalitionsFilterClick,
}) => {
  const coalitions = useSelector(getCoalitions);
  const [allSelected, setAllSelected] = useState(true);
  const [selectedCoalitions, setSelectedCoalitions] = useState<string[]>([]);
  const { fetchCoalitions } = useFetchCoalitions();

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

  const handleClickOnChips = (coalition: Coalition | null) => {
    if (coalition === null) {
      setAllSelected(true);
      setSelectedCoalitions([]);
      handleCoalitionsFilterClick([]);
    } else {
      setAllSelected(false);
      setSelectedCoalitions([...selectedCoalitions, coalition.uuid]);
      handleCoalitionsFilterClick([...selectedCoalitions, coalition.uuid]);
    }
  };
  if (coalitions.length === 0) {
    return null;
  }
  return (
    <CoalitionFiltersContainer>
      <StyledChip onClick={() => handleClickOnChips(null)} isSelected={allSelected}>
        Tout
      </StyledChip>
      {coalitions.map(coalition => (
        <StyledChip
          key={coalition.uuid}
          onClick={() => handleClickOnChips(coalition)}
          isSelected={selectedCoalitions.includes(coalition.uuid)}
        >
          {coalition.name}
        </StyledChip>
      ))}
    </CoalitionFiltersContainer>
  );
};
