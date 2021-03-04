import React, { useEffect, useState } from 'react';
import { useFetchCoalitions } from 'redux/Coalition/hooks';
import { CoalitionFiltersContainer, StyledChip } from './CoalitionsFilter.style';

import { Coalition } from 'redux/Coalition/types';
import { getCoalitions } from 'redux/Coalition/selectors';
import { clearFilterByCoalition, toggleFilterByCoalition } from 'redux/Coalition/slice';
import { useDispatch, useSelector } from 'react-redux';

export const CoalitionsFilter: React.FunctionComponent = () => {
  const coalitions = useSelector(getCoalitions);
  const dispatch = useDispatch();
  const [allSelected, setAllSelected] = useState(true);
  const { fetchCoalitions } = useFetchCoalitions();

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

  const handleClickOnChips = (coalition: Coalition | null) => {
    if (coalition === null) {
      setAllSelected(true);
      dispatch(clearFilterByCoalition());
    } else {
      setAllSelected(false);
      dispatch(toggleFilterByCoalition(coalition));
    }
  };

  return (
    <CoalitionFiltersContainer>
      <StyledChip onClick={() => handleClickOnChips(null)} isSelected={allSelected}>
        Tout
      </StyledChip>
      {coalitions.map(coalition => (
        <StyledChip
          key={coalition.uuid}
          onClick={() => handleClickOnChips(coalition)}
          isSelected={coalition.filtered_by}
        >
          {coalition.name}
        </StyledChip>
      ))}
    </CoalitionFiltersContainer>
  );
};
