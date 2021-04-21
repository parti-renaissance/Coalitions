import { useCallback, useEffect, useState } from 'react';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService from 'services/HandleErrorService';
import { coalitionApiClient } from 'services/networking/client';

export type PhoneCountry = {
  name: string;
  region: string;
  code: number;
};

export const useFetchPhoneCountries = () => {
  const [phoneCountries, setPhoneCountries] = useState<PhoneCountry[]>([]);

  const [{ loading, error }, doFetchPhoneCountries] = useTypedAsyncFn(async () => {
    return await coalitionApiClient.get(`countries`);
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error);
    }
  }, [error]);

  const fetchPhoneCountries = useCallback(async () => {
    const countries = await doFetchPhoneCountries();

    if (countries instanceof Error) {
      return;
    }

    setPhoneCountries(countries);
  }, [doFetchPhoneCountries]);

  return { loading, error, phoneCountries, fetchPhoneCountries };
};
