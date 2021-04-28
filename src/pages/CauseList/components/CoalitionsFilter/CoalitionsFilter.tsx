import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
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
import { FormattedMessage } from 'react-intl';

interface CoalitionFilterProps {
  selectedCoalitionIds: string[];
  setSelectedCoalitionIds: (ids: string[]) => void;
}

const CoalitionsFilter: FunctionComponent<CoalitionFilterProps> = ({
  selectedCoalitionIds,
  setSelectedCoalitionIds,
}) => {
  const coalitions = useSelector(getCoalitions);
  const { fetchCoalitions } = useFetchCoalitions();
  const isMobile = getIsMobile();
  const [displayAll, setDisplayAll] = useState(!isMobile);

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

  const onChipClick = useCallback(
    (id?: string) => () => {
      let newSelectedCoalitionIds = [...selectedCoalitionIds];

      if (id === undefined && newSelectedCoalitionIds.length !== 0) {
        newSelectedCoalitionIds = [];
      }

      if (id !== undefined) {
        const idIndex = newSelectedCoalitionIds.indexOf(id);
        if (idIndex > -1) {
          newSelectedCoalitionIds.splice(idIndex, 1);
        } else {
          newSelectedCoalitionIds.push(id);
        }
      }

      setSelectedCoalitionIds(newSelectedCoalitionIds);
    },
    [selectedCoalitionIds, setSelectedCoalitionIds],
  );

  const hideOrShowAllChips = () => {
    setDisplayAll(!displayAll);
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

export default CoalitionsFilter;
