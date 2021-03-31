import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { authenticatedApiClient } from 'services/networking/client';
import { optimisticallyMarkCauseAsSupported } from '..';
import HandleErrorService, { APIErrorsType } from 'services/HandleErrorService';
import { useIntl } from 'react-intl';

const useCauseFollowErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (error.message.includes('Cette valeur est déjà utilisée')) {
        return formatMessage({ id: 'errors.already-followed-cause' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const useCauseFollow = (id: string) => {
  const dispatch = useDispatch();
  const errorHandler = useCauseFollowErrorHandler();

  const [{ loading, error }, doFollowCause] = useTypedAsyncFn(
    async () => await authenticatedApiClient.put(`v3/causes/${id}/follower`, null),
    [],
  );

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const followCause = useCallback(async () => {
    const response = await doFollowCause();

    if (response instanceof Error) {
      return;
    }

    if (response.uuid !== undefined) {
      dispatch(optimisticallyMarkCauseAsSupported(id));
    }
  }, [dispatch, doFollowCause, id]);

  return { loading, followCause };
};
