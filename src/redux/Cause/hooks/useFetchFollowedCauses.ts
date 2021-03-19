import { useSelector } from 'react-redux';
import { isUserLogged } from 'redux/Login';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';

export const useFetchFollowedCauses = () => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const [{ loading, error }, doFetchFollowedCauses] = useTypedAsyncFn(async (uuids: string[]) => {
    if (!isUserLoggedIn) return [];
    try {
      return await authenticatedApiClient.post('v3/causes/followed', { uuids });
    } catch (error) {
      return [];
    }
  }, []);
  return { loading, error, doFetchFollowedCauses };
};
