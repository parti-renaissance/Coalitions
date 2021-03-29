import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
// import { optimisticallyMarkCauseAsSupported } from '..';
import HandleErrorService from 'services/HandleErrorService';

export const useUnauthenticatedCauseFollow = (id: string) => {
  //   const dispatch = useDispatch();

  const [{ loading, error }, doFollowCause] = useTypedAsyncFn(async () => {
    // TODO;
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  const followCause = useCallback(async () => {
    const response = await doFollowCause();

    if (response instanceof Error) {
      return;
    }

    // if (response.uuid !== undefined) {
    //   dispatch(optimisticallyMarkCauseAsSupported(id));
    // }
  }, [doFollowCause]);

  if (error) {
    console.log({ error });
    HandleErrorService.showErrorSnackbar(error);
  }

  return { loading, followCause };
};
