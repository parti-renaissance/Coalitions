import { coalitionApiClient } from 'services/networking/client';
import { useState } from 'react';

export interface City {
  uuid: string;
  name: string;
}

export const useCityAndCountryAutocomplete = () => {
  const [isFetchingCities, setisFetchingCities] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);

  const fetchCities = async (searchText: string) => {
    setisFetchingCities(true);
    try {
      const { items } = await coalitionApiClient.get(
        `zones?type[]=city&type[]=country&name=${searchText}`,
      );
      setCities(items);
    } catch (e) {
      // TODO call error service
      console.warn(e);
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
