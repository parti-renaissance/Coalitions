import React, { useEffect, useState } from 'react';
import { useFetchCoalitions } from 'redux/Coalition/hooks';
import {
  Chevron,
  CoalitionFiltersContainer,
  CoalitionFiltersSubContainer,
  StyledChip,
} from './CoalitionsFilter.style';

import { getCoalitions } from 'redux/Coalition/selectors';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'services/mobile/mobile';
import { useLocation } from 'react-router';
import { useCoalitionsFilter } from './service';

type Props = {
  handleCoalitionsFilterClick: (ids: string[]) => void;
};

export const CoalitionsFilter: React.FunctionComponent<Props> = ({
  handleCoalitionsFilterClick,
}) => {
  const coalitions = useSelector(getCoalitions);
  const {
    allSelected,
    selectedCoalitions,
    handleClickOnChips,
    onClickOnChips,
  } = useCoalitionsFilter(handleCoalitionsFilterClick);
  const { fetchCoalitions } = useFetchCoalitions();
  const isMobile = getIsMobile();
  const [displayAll, setDisplayAll] = useState(!isMobile);
  const { search } = useLocation();

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const coalitionId = params.get('coalitionId');
    if (selectedCoalitions.length === 0) {
      handleClickOnChips(coalitionId);
    }
  }, [search, handleCoalitionsFilterClick, handleClickOnChips, selectedCoalitions]);

  if (coalitions.length === 0) {
    return null;
  }

  return (
    <CoalitionFiltersContainer>
      <CoalitionFiltersSubContainer displayAll={displayAll}>
        <StyledChip onClick={() => onClickOnChips(null)} isSelected={allSelected}>
          Tout
        </StyledChip>
        {coalitions.map(coalition => (
          <StyledChip
            key={coalition.uuid}
            onClick={() => onClickOnChips(coalition.uuid)}
            isSelected={selectedCoalitions.includes(coalition.uuid)}
          >
            {coalition.name}
          </StyledChip>
        ))}
      </CoalitionFiltersSubContainer>
      {isMobile && (
        <Chevron
          displayAll={displayAll}
          onClick={() => setDisplayAll(!displayAll)}
          src="/images/chevronDownBlack.svg"
        />
      )}
    </CoalitionFiltersContainer>
  );
};
