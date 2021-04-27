import { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Filters } from 'redux/Cause/hooks/useFetchCauses';

export const useSetSearchParams = () => {
  const { replace } = useHistory();
  const { search } = useLocation();

  const setSearchParams = useCallback(
    ({ searchText, coalitionIds }: Filters) => {
      const params = new URLSearchParams(search);

      if (searchText.length > 0) {
        params.set('name', searchText);
      } else {
        params.delete('name');
      }

      if (coalitionIds.length !== 1 || coalitionIds[0] !== params.get('coalitionId')) {
        params.delete('coalitionId');
      }

      replace({ search: params.toString() });
    },
    [replace, search],
  );

  return { setSearchParams };
};
