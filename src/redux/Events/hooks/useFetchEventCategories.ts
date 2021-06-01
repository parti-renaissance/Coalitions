import { useCallback, useEffect, useState } from 'react';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';
import { EventCategory } from '../types';

export const useFetchEventCategories = () => {
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

  const [{ loading, error }, doFetchEventCategories] = useTypedAsyncFn(async () => {
    return await coalitionApiClient.get('event_categories');
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchEventCategories = useCallback(async () => {
    const categories: EventCategory[] = await doFetchEventCategories();

    if (categories instanceof Error) {
      return;
    }

    setEventCategories(categories);
  }, [doFetchEventCategories]);

  return { loading, fetchEventCategories, eventCategories };
};
