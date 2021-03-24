import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';

type doFetchFollowedCausesType = {
  uuids: string[];
  isUserLoggedIn: boolean;
};

export const useFetchFollowedCauses = () => {
  const [{ loading, error }, doFetchFollowedCauses] = useTypedAsyncFn(
    async ({ uuids, isUserLoggedIn }: doFetchFollowedCausesType) => {
      if (!isUserLoggedIn) return [];
      try {
        return await authenticatedApiClient.post('v3/causes/followed', { uuids });
      } catch (error) {
        return [];
      }
    },
    [],
  );

  return { loading, error, doFetchFollowedCauses };
};
