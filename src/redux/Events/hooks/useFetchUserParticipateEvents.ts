import { isUserLogged } from 'redux/Login';
import useSelector from 'redux/useSelector';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';

export const useFetchUserParticipateEvents = () => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));

  const [{ loading, error }, doFetchUserParticipateEvents] = useTypedAsyncFn(
    async (uuids: string[]) => {
      if (!isUserLoggedIn) {
        return [];
      }

      try {
        return await authenticatedApiClient.post('v3/events/registered', { uuids });
      } catch (error) {
        return [];
      }
    },
    [],
  );
  return { loading, error, doFetchUserParticipateEvents, isUserLoggedIn };
};
