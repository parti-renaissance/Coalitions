import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isUserLogged } from 'redux/Login';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { EventType } from '../types';

export const useFetchEvent = (id: string) => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const [event, setEvent] = useState<undefined | EventType>(undefined);

  const [{ loading, error }, doFetchEvent] = useTypedAsyncFn(async () => {
    console.log({ id });
    setTimeout(() => {
      // fake loading state
    }, 3000);
    // todo
    return Promise.resolve();
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

    let event: EventType | undefined = await doFetchEvent();

    if (event === undefined || event instanceof Error) {
      return;
    }

    setEvent(event);
  }, [doFetchEvent, isUserLoggedIn]);

  return { loading, fetchEvent, event };
};
