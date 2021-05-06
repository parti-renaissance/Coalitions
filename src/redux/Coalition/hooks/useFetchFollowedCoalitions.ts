import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';

export const useFetchFollowedCoalitions = () => {
  const [{ loading, error }, doFetchFollowedCoalitions] = useTypedAsyncFn(
    async (isUserLoggedIn: boolean) => {
      if (!isUserLoggedIn) return [];
      try {
        return await authenticatedApiClient.get('v3/coalitions/followed');
      } catch (error) {
        return [];
      }
    },
    [],
  );
  return { loading, error, doFetchFollowedCoalitions };
};
