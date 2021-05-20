import { useCallback, useEffect, useState } from 'react';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { EventCategory } from '../types';

export const useFetchEventCategories = () => {
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

  const [{ loading, error }, doFetchEventCategories] = useTypedAsyncFn(async () => {
    setTimeout(() => {
      // fake loading state
    }, 3000);
    // todo
    return Promise.resolve([
      { id: '1', name: 'category1' },
      { id: '2', name: 'category2' },
      { id: '3', name: 'category3' },
    ]);
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchEventCategories = useCallback(async () => {
    const categories: EventCategory[] | undefined = await doFetchEventCategories();

    if (categories === undefined || categories instanceof Error) {
      return;
    }

    setEventCategories(categories);
  }, [doFetchEventCategories]);

  return { loading, fetchEventCategories, eventCategories };
};
