import { Coalition } from 'redux/Coalition/types';
import { FormValues } from './useValidateForm';

export const getOnCoalitionClick = ({
  values,
  setFieldValue,
  setFieldTouched,
}: {
  values: FormValues;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setFieldTouched: (
    field: string,
    isTouched?: boolean | undefined,
    shouldValidate?: boolean | undefined,
  ) => void;
}) => (coalition: Coalition) => {
  if (values.coalitions !== undefined) {
    const selectedCoalitionUuids = values.coalitions.map(({ uuid }) => uuid);
    if (selectedCoalitionUuids.includes(coalition.uuid)) {
      const indexToRemove = selectedCoalitionUuids.indexOf(coalition.uuid);
      const newValues = [...values.coalitions];
      newValues.splice(indexToRemove, 1);
      setFieldValue('coalitions', newValues);
    } else if (values.coalitions.length < 2) {
      setFieldValue('coalitions', [...values.coalitions, coalition]);
    }
  } else {
    setFieldTouched('coalitions');
    setFieldValue('coalitions', [coalition]);
  }
};
