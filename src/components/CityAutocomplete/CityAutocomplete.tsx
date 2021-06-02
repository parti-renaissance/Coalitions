import React, { FunctionComponent, ChangeEvent, FocusEvent } from 'react';
import { CircularProgress } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import InputField from 'components/InputField';
import { getCityOrCountryLabel, CityOrCountryType } from './hooks/useCityAndCountryAutocomplete';
import { useCityAndCountryAutocomplete, useCountryAutocompleteDefaultValue } from './hooks';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface CityAutocompleteProps {
  touched?: boolean;
  error?: string;
  setValue: (value: string) => void;
  setIsTouched: () => void;
  onChange: (e: ChangeEvent) => void;
  onBlur: (e: FocusEvent) => void;
  type?: CityOrCountryType;
  placeholder: string;
  initialCountryCode?: string;
  useCode?: boolean;
}

const CityAutocomplete: FunctionComponent<CityAutocompleteProps> = ({
  touched,
  error,
  setValue,
  setIsTouched,
  onChange,
  onBlur,
  type,
  placeholder,
  initialCountryCode,
  useCode,
}) => {
  const {
    fetchCitiesAndCountries,
    isFetchingCitiesAndCountries,
    citiesAndCountries,
  } = useCityAndCountryAutocomplete(type);
  const { defaultValue, isSettingDefaultValue } = useCountryAutocompleteDefaultValue({
    fetchCitiesAndCountries,
    type,
    initialCountryCode,
    citiesAndCountries,
  });

  if (isSettingDefaultValue) {
    return null;
  }

  return (
    <Autocomplete
      freeSolo
      options={citiesAndCountries}
      defaultValue={defaultValue}
      getOptionLabel={getCityOrCountryLabel}
      onBlur={setIsTouched}
      onChange={(_, value) => {
        if (value !== null && typeof value !== 'string') {
          setValue(useCode ? value.code : value.uuid);
        } else {
          setValue('');
        }
      }}
      renderInput={(params: TextFieldProps) => (
        <InputField
          {...params}
          required
          placeholder={placeholder}
          error={touched === true && error !== undefined}
          helperText={touched === true ? error : undefined}
          onChange={e => {
            onChange(e);
            setValue('');
            fetchCitiesAndCountries(e.target.value);
          }}
          onBlur={onBlur}
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
