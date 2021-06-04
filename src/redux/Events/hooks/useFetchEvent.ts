import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';
import { adaptEvent } from '../helpers/adapter';
import { updateOneEvent } from '../slice';
import { RawEventType } from '../types';

export const useFetchEvent = (id: string) => {
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
    const rawEvent: RawEventType | undefined = await doFetchEvent();
    if (rawEvent === undefined || rawEvent instanceof Error) {
      return;
    }

    dispatch(updateOneEvent(adaptEvent(rawEvent)));
  }, [doFetchEvent, dispatch]);

  return { loading, fetchEvent };
};
