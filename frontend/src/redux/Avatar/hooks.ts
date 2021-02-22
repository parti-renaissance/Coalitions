import { githubApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { updateUser } from './slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';

export const useFetchUser = () => {
  const dispatch = useDispatch();

  return useTypedAsyncFn<{ username: string }>(
    async ({ username }) => {
      const user = await githubApiClient.get(`https://api.github.com/users/${username}`);
      dispatch(updateUser(user));
    },
    [dispatch],
  );
};
