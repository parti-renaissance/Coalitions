import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLogged } from 'redux/Login';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';
import { adaptEvent } from '../helpers/adapter';
import { updateOneEvent } from '../slice';
import { RawEventType } from '../types';

export const useFetchEvent = (id: string) => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const dispatch = useDispatch();

  const [{ loading, error }, doFetchEvent] = useTypedAsyncFn(async () => {
    return await coalitionApiClient.get(`events/${id}`);
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchEvent = useCallback(async () => {
    if (!isUserLoggedIn) {
      return;
    }

    const rawEvent: RawEventType | undefined = await doFetchEvent();
    if (rawEvent === undefined || rawEvent instanceof Error) {
      return;
    }

    dispatch(updateOneEvent(adaptEvent(rawEvent)));
  }, [doFetchEvent, isUserLoggedIn, dispatch]);

  return { loading, fetchEvent };
};
