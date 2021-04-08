import { useEffect, useState } from 'react';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';
import { useLocation } from 'react-router';
import { getInCreationCause } from 'redux/Cause/selectors';
import { Cause, InCreationCause } from 'redux/Cause/types';
import { getCause } from 'redux/Cause/selectors';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { convertCauseToFormValues } from './convertCauseToFormValues';
import { FormValues } from './useValidateForm';

const useFetchToUpdateCause = () => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [toUpdateCauseId, setToUpdateCauseId] = useState<null | string>(params.get('causeId'));
  const toUpdateCause = useSelector(getCause(toUpdateCauseId));
  const { loading, fetchCause } = useFetchOneCause(toUpdateCauseId);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const causeId = params.get('causeId');
    if (causeId !== null && toUpdateCauseId !== causeId) {
      setToUpdateCauseId(causeId);
    }
  }, [location, toUpdateCauseId]);

  useEffect(() => {
    if (toUpdateCauseId !== null) {
      fetchCause(isUserLoggedIn);
    }
  }, [fetchCause, isUserLoggedIn, toUpdateCauseId]);

  return { toUpdateCause, fetchingToUpdateCause: loading };
};

export const useInitialFormValues = (): {
  initialFormValues: FormValues;
  loadingInitialFormValues: boolean;
} => {
  const inCreationCause = useSelector(getInCreationCause);
  const { toUpdateCause, fetchingToUpdateCause } = useFetchToUpdateCause();

  let cause: Cause | InCreationCause | undefined = inCreationCause;
  if (toUpdateCause !== undefined) {
    cause = toUpdateCause;
  }

  return {
    initialFormValues: convertCauseToFormValues(cause),
    loadingInitialFormValues: fetchingToUpdateCause,
  };
};
