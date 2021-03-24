import { coalitionApiClient } from 'services/networking/client';
import { useState } from 'react';
import HandleErrorService from 'services/HandleErrorService';
import { useSnackbar } from 'redux/Snackbar/hooks';

export enum CityOrCountryType {
  city = 'city',
  country = 'country',
}
export interface CityOrCountry {
  uuid: string;
  name: string;
  type: CityOrCountryType;
  code: string;
}

export const getCityOrCountryLabel = (cityOrCountry: CityOrCountry) => {
  let label = cityOrCountry.name;
  if (cityOrCountry.type === CityOrCountryType.city) {
    label = `${label} (${cityOrCountry.code.substring(0, 2)})`;
  }
  return label;
};

export const useCityAndCountryAutocomplete = () => {
  const { showErrorSnackbar } = useSnackbar();
  const [isFetchingCities, setisFetchingCities] = useState<boolean>(false);
  const [cities, setCities] = useState<CityOrCountry[]>([]);

  const fetchCities = async (searchText: string) => {
    setisFetchingCities(true);
    try {
      const { items } = await coalitionApiClient.get(
        `zones?type[]=city&type[]=country&page_size=20&name=${searchText}`,
      );
      setCities((items as CityOrCountry[]).filter(({ code }) => code !== 'FR'));
    } catch (e) {
      showErrorSnackbar(HandleErrorService.getErrorMessage(e));
    } finally {
      setisFetchingCities(false);
    }
  };

  return {
    fetchCities,
    isFetchingCities,
    cities,
  };
};
