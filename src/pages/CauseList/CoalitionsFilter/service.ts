import { useState, useCallback } from 'react';
import { useHistory } from 'react-router';

export const useCoalitionsFilter = (handleCoalitionsFilterClick: (ids: string[]) => void) => {
  const [allSelected, setAllSelected] = useState(true);
  const [selectedCoalitions, setSelectedCoalitions] = useState<string[]>([]);
  const { replace } = useHistory();

  const handleClickOnChips = useCallback(
    (id: string | null) => {
      if (id === null && !allSelected) {
        setAllSelected(true);
        setSelectedCoalitions([]);
        handleCoalitionsFilterClick([]);
      } else if (id !== null && !selectedCoalitions.includes(id)) {
        setAllSelected(false);
        setSelectedCoalitions([...selectedCoalitions, id]);
        handleCoalitionsFilterClick([...selectedCoalitions, id]);
      }
    },
    [handleCoalitionsFilterClick, selectedCoalitions, allSelected],
  );

  const onClickOnChips = useCallback(
    (id: string | null) => {
      handleClickOnChips(id);
      replace({ search: '' });
    },
    [handleClickOnChips, replace],
  );

  return {
    allSelected,
    selectedCoalitions,
    handleClickOnChips,
    onClickOnChips,
  };
};
