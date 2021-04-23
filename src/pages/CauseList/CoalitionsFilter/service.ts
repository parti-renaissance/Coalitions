import { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

export const useCoalitionsFilter = () => {
  const [selectedCoalitionIds, setSelectedCoalitionIds] = useState<string[]>([]);
  const { replace } = useHistory();
  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const coalitionId = params.get('coalitionId');
    if (coalitionId !== null) {
      setSelectedCoalitionIds([coalitionId]);
    }
  }, [search]);

  const onSelectCoalitionId = useCallback(
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

      if (search.length > 0) {
        replace({ search: '' });
      }
    },
    [selectedCoalitionIds, search, replace],
  );

  return {
    selectedCoalitionIds,
    onSelectCoalitionId,
  };
};
