import { coalitionApiClient } from 'services/networking/client';
import { useDispatch } from 'react-redux';
import { updateCauses } from './slice';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';

export const useFetchCauses = () => {
  const dispatch = useDispatch();

  return useTypedAsyncFn(async () => {
    const causes = await coalitionApiClient.get('causes');
    dispatch(updateCauses(causes.items));
  }, [dispatch]);
};
