import { useEffect, useState } from 'react';
import { CityOrCountry, CityOrCountryType } from './useCityAndCountryAutocomplete';

export const useCountryAutocompleteDefaultValue = ({
  fetchCitiesAndCountries,
  citiesAndCountries,
  type,
  initialCountryCode,
}: {
  fetchCitiesAndCountries: (searchText: string) => Promise<void>;
  citiesAndCountries: CityOrCountry[];
  type?: CityOrCountryType;
  initialCountryCode?: string;
}) => {
  const [defaultValue, setDefaultValue] = useState<CityOrCountry | null | undefined>(null);

  useEffect(() => {
    if (
      initialCountryCode !== undefined &&
      type === CityOrCountryType.country &&
      defaultValue === null
    ) {
      if (citiesAndCountries.length === 0) {
        fetchCitiesAndCountries(initialCountryCode);
      } else {
        const defaultCountry = citiesAndCountries.find(
          ({ code: countryCode }) => initialCountryCode === countryCode,
        );
        setDefaultValue(defaultCountry);
      }
    }
  }, [initialCountryCode, fetchCitiesAndCountries, type, citiesAndCountries, defaultValue]);

  return {
    defaultValue,
    isSettingDefaultValue:
      initialCountryCode !== undefined &&
      type === CityOrCountryType.country &&
      defaultValue === null,
  };
};
