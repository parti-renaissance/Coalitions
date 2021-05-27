import React, { FunctionComponent, ChangeEvent, FocusEvent } from 'react';
import { CircularProgress } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
import { useIntl } from 'react-intl';
import InputField from 'components/InputField';
import {
  useCityAndCountryAutocomplete,
  CityOrCountry,
  getCityOrCountryLabel,
} from './lib/useCityAndCountryAutocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormikErrors, FormikTouched } from 'formik';

interface CityAutocompleteProps {
  touched: FormikTouched<{ cityId: boolean }>;
  errors: FormikErrors<{ cityId: boolean }>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => void;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: FocusEvent) => void;
}

const CityAutocomplete: FunctionComponent<CityAutocompleteProps> = ({
  touched,
  errors,
  setFieldValue,
  setFieldTouched,
  handleChange,
  handleBlur,
}) => {
  const intl = useIntl();
  const { cities, fetchCities, isFetchingCities } = useCityAndCountryAutocomplete();

  return (
    <Autocomplete
      freeSolo
      options={cities}
      getOptionLabel={getCityOrCountryLabel}
      onBlur={() => setFieldTouched('cityId', true)}
      onChange={(e, value) => {
        setFieldValue('cityId', (value as CityOrCountry)?.uuid || '');
      }}
      renderInput={(params: TextFieldProps) => (
        <InputField
          {...params}
          required
          placeholder={intl.formatMessage({ id: 'login_modal.city-or-country' })}
          error={touched.cityId === true && errors.cityId !== undefined}
          helperText={touched.cityId === true ? errors.cityId : undefined}
          onChange={e => {
            handleChange(e);
            setFieldValue('cityId', '');
            fetchCities(e.target.value);
          }}
          onBlur={handleBlur}
          InputLabelProps={{ required: false }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isFetchingCities ? <CircularProgress color="primary" size={20} /> : null}
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
