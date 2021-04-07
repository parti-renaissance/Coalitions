import { useEffect } from 'react';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';
import { useLocation } from 'react-router';
import { getInCreationCause } from 'redux/Cause/selectors';
import { Cause, InCreationCause } from 'redux/Cause/types';
import { getCause } from 'redux/Cause/selectors';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { convertCauseToFormValues } from './convertCauseToFormValues';
import { FormValues } from './useValidateForm';

export const useInitialFormValues = (): { initialFormValues: FormValues; loading: boolean } => {
  const inCreationCause = useSelector(getInCreationCause);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const causeId = params.get('causeId');
  const toUpdateCause = useSelector(getCause(causeId));
  const { loading, fetchCause } = useFetchOneCause(causeId);

  useEffect(() => {
    if (causeId !== null) {
      fetchCause(isUserLoggedIn);
    }
  }, [fetchCause, isUserLoggedIn, causeId]);

  let cause: Cause | InCreationCause | undefined = inCreationCause;
  if (toUpdateCause !== undefined) {
    cause = toUpdateCause;
  }

  return { initialFormValues: convertCauseToFormValues(cause), loading };
};
