import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCauseQuickActions } from 'redux/Cause';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';

type RawQuickActions = {
  id: string;
  title: string;
  url: string;
};

export const useFetchQuickActions = (id: string) => {
  const dispatch = useDispatch();

  const [{ loading, error }, doFetchQuickActions] = useTypedAsyncFn(async () => {
    return await coalitionApiClient.get(`causes/${id}/quick_actions`);
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchQuickActions = useCallback(async () => {
    const rawQuickActions: RawQuickActions[] = await doFetchQuickActions();

    if (rawQuickActions instanceof Error) {
      return;
    }

    dispatch(
      setCauseQuickActions({
        id,
        quickActions: rawQuickActions.map(({ id, title, url }) => ({
          id,
          label: title,
          link: url,
        })),
      }),
    );
  }, [dispatch, doFetchQuickActions, id]);

  return { loading, fetchQuickActions };
};
