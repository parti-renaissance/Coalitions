import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';
import { isUserLogged } from 'redux/Login';
import useSelector from 'redux/useSelector';

export const useFetchFollowedCoalitions = () => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));

  const [{ loading, error }, doFetchFollowedCoalitions] = useTypedAsyncFn(async () => {
    if (!isUserLoggedIn) return [];
    try {
      return await authenticatedApiClient.get('v3/coalitions/followed');
    } catch (error) {
      return [];
    }
  }, []);
  return { loading, error, doFetchFollowedCoalitions };
};
