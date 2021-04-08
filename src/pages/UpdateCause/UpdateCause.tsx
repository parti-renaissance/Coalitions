import React, { FunctionComponent, useEffect } from 'react';
import { LoaderContainer } from './UpdateCause.style';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';
import { useLocation } from 'react-router';
import Loader from 'components/Loader';
import CauseForm from 'components/CauseForm';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { getCause } from 'redux/Cause/selectors';
import { useUpdateCause } from 'redux/Cause/hooks/useUpdateCause';
import { Cause, InCreationCause } from 'redux/Cause/types';

const CreateCause: FunctionComponent = () => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const toUpdateCauseId = params.get('causeId');
  const toUpdateCause = useSelector(getCause(toUpdateCauseId));
  const { loading: isFetchingCause, fetchCause } = useFetchOneCause(toUpdateCauseId);
  const { loading: isUpdatingCause, updateCause } = useUpdateCause();

  useEffect(() => {
    if (toUpdateCauseId !== null) {
      fetchCause(isUserLoggedIn);
    }
  }, [fetchCause, isUserLoggedIn, toUpdateCauseId]);

  if (isFetchingCause && toUpdateCause === undefined) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <CauseForm
      onSubmit={updateCause as (cause: InCreationCause | Cause) => void}
      initialCause={toUpdateCause}
      isSubmitting={isUpdatingCause}
    />
  );
};

export default CreateCause;
