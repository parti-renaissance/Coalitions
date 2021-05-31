import React, { FunctionComponent, ChangeEvent, FocusEvent } from 'react';
import { CircularProgress } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import InputField from 'components/InputField';
import {
  useCityAndCountryAutocomplete,
  CityOrCountry,
  getCityOrCountryLabel,
  CityOrCountryType,
} from './lib/useCityAndCountryAutocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface CityAutocompleteProps {
  touched?: boolean;
  error?: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => void;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: FocusEvent) => void;
  type?: CityOrCountryType;
  placeholder: string;
}

const CityAutocomplete: FunctionComponent<CityAutocompleteProps> = ({
  touched,
  error,
  setFieldValue,
  setFieldTouched,
  handleChange,
  handleBlur,
  type,
  placeholder,
}) => {
  const {
    fetchCitiesAndCountries,
    isFetchingCitiesAndCountries,
    citiesAndCountries,
  } = useCityAndCountryAutocomplete(type);

  const field = type === CityOrCountryType.country ? 'countryId' : 'cityId';

  return (
    <Autocomplete
      freeSolo
      options={citiesAndCountries}
      getOptionLabel={getCityOrCountryLabel}
      onBlur={() => setFieldTouched(field, true)}
      onChange={(e, value) => {
        setFieldValue(field, (value as CityOrCountry)?.uuid || '');
      }}
      renderInput={(params: TextFieldProps) => (
        <InputField
          {...params}
          required
          placeholder={placeholder}
          error={touched === true && error !== undefined}
          helperText={touched === true ? error : undefined}
          onChange={e => {
            handleChange(e);
            setFieldValue(field, '');
            fetchCitiesAndCountries(e.target.value);
          }}
          onBlur={handleBlur}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetchingCitiesAndCountries ? (
                  <CircularProgress color="primary" size={20} />
                ) : null}
                {params?.InputProps?.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};
export default CityAutocomplete;
