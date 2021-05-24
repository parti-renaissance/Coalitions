import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLogged } from 'redux/Login';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { updateOneEvent } from '../slice';
import { EventType } from '../types';

export const FAKE_EVENT: EventType = {
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
  participants_count: 4,
  organizer: {
    uuid: '123',
    first_name: 'Gaspard',
    last_name: 'Denis',
  },
  causeId: '3165e54b-aab9-40e4-90cf-2de59ac591ca',
};

export const useFetchEvent = (id: string) => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const dispatch = useDispatch();

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

    dispatch(updateOneEvent(event));
  }, [doFetchEvent, isUserLoggedIn, dispatch]);

  return { loading, fetchEvent };
};
