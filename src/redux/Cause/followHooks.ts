import { useSelector } from 'react-redux';
import { getUserToken } from 'redux/Login';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';

export const useFetchFollowedCauses = () => {
  const isUserLoggedIn = Boolean(useSelector(getUserToken));
  const [{ loading, error }, doFetchFollowedCauses] = useTypedAsyncFn(async (uuids: string[]) => {
    if (!isUserLoggedIn) return [];
    return await authenticatedApiClient.post('v3/causes/followed', { uuids });
  }, []);
  return { loading, error, doFetchFollowedCauses };
};
