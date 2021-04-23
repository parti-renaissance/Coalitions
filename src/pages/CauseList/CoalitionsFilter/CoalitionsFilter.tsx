import React, { FunctionComponent, useEffect, useState } from 'react';
import { useFetchCoalitions } from 'redux/Coalition/hooks/useFetchCoalitions';
import {
  Chevron,
  CoalitionFiltersContainer,
  CoalitionFiltersSubContainer,
  StyledChip,
} from './CoalitionsFilter.style';
import { getCoalitions } from 'redux/Coalition/selectors';
import { useSelector } from 'react-redux';
import { getIsMobile } from 'services/mobile/mobile';
import { useCoalitionsFilter } from './service';
import { FormattedMessage } from 'react-intl';

interface CoalitionFilterProps {
  setSelectedCoalitionIds: (ids: string[] | undefined) => void;
}

export const CoalitionsFilter: FunctionComponent<CoalitionFilterProps> = ({
  setSelectedCoalitionIds: setSelectedCoalitionIdsFromProps,
}) => {
  const coalitions = useSelector(getCoalitions);
  const { selectedCoalitionIds, onSelectCoalitionId } = useCoalitionsFilter();
  const { fetchCoalitions } = useFetchCoalitions();
  const isMobile = getIsMobile();
  const [displayAll, setDisplayAll] = useState(!isMobile);

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

  useEffect(() => {
    setSelectedCoalitionIdsFromProps(selectedCoalitionIds);
  }, [selectedCoalitionIds, setSelectedCoalitionIdsFromProps]);

  const hideOrShowAllChips = () => {
    setDisplayAll(!displayAll);
  };

  const onChipClick = (id?: string) => () => {
    onSelectCoalitionId(id);
  };

  if (coalitions.length === 0) {
    return null;
  }

  return (
    <CoalitionFiltersContainer>
      <CoalitionFiltersSubContainer displayAll={displayAll}>
        <StyledChip onClick={onChipClick()} isSelected={selectedCoalitionIds.length === 0}>
          <FormattedMessage id="cause_list.all" />
        </StyledChip>
        {coalitions.map(coalition => (
          <StyledChip
            key={coalition.uuid}
            onClick={onChipClick(coalition.uuid)}
            isSelected={selectedCoalitionIds.includes(coalition.uuid)}
          >
            {coalition.name}
          </StyledChip>
        ))}
      </CoalitionFiltersSubContainer>
      {isMobile && (
        <Chevron
          displayAll={displayAll}
          onClick={hideOrShowAllChips}
          src="/images/chevronDownBlack.svg"
        />
      )}
    </CoalitionFiltersContainer>
  );
};
