import { coalitionApiClient } from 'services/networking/client';
import { useState } from 'react';
import HandleErrorService from 'services/HandleErrorService';

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

const getFetchUrlByType = ({
  type,
  searchText,
}: {
  type?: CityOrCountryType;
  searchText: string;
}) => {
  let url = `zones?page_size=20&name=${searchText}`;
  if (type === undefined) {
    url = `${url}&type[]=city&type[]=country&type[]=borough`;
  } else {
    url = `${url}&type[]=${type}`;
    if (type === CityOrCountryType.city) {
      url = `${url}&type[]=borough`;
    }
  }
  return url;
};

export const useCityAndCountryAutocomplete = (type?: CityOrCountryType) => {
  const [isFetchingCitiesAndCountries, setIsFetchingCitiesAndCountries] = useState<boolean>(false);
  const [citiesAndCountries, setCitiesAndCountries] = useState<CityOrCountry[]>([]);

  const fetchCitiesAndCountries = async (searchText: string) => {
    setIsFetchingCitiesAndCountries(true);
    try {
      const { items } = await coalitionApiClient.get(getFetchUrlByType({ type, searchText }));

      let fetchedCitiesAndCountries = [...items] as CityOrCountry[];
      if (type === undefined) {
        fetchedCitiesAndCountries = fetchedCitiesAndCountries.filter(({ code }) => code !== 'FR');
      }

      setCitiesAndCountries(fetchedCitiesAndCountries);
    } catch (e) {
      HandleErrorService.showErrorSnackbar(e);
    } finally {
      setIsFetchingCitiesAndCountries(false);
    }
  };

  return {
    fetchCitiesAndCountries,
    isFetchingCitiesAndCountries,
    citiesAndCountries,
  };
};
