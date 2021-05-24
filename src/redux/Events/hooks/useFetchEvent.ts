import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isUserLogged } from 'redux/Login';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { EventType } from '../types';

const FAKE_EVENT: EventType = {
  uuid: '1',
  name: 'mon événement',
  begin_at: '2021-06-20T08:00',
  finish_at: '2021-06-21T08:00',
  mode: 'online',
  category: {
    uuid: '1',
    name: 'category1',
  },
  time_zone: 'Europe/Paris',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  visio_url: 'www.google.com',
};

export const useFetchEvent = (id: string) => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const [event, setEvent] = useState<undefined | EventType>(undefined);

  const [{ loading, error }, doFetchEvent] = useTypedAsyncFn(async () => {
    console.log({ id });
    return new Promise(resolve => setTimeout(resolve, 2000, FAKE_EVENT));
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

    const event: EventType | undefined = await doFetchEvent();

    if (event === undefined || event instanceof Error) {
      return;
    }

    setEvent(event);
  }, [doFetchEvent, isUserLoggedIn]);

  return { loading, fetchEvent, event };
};
