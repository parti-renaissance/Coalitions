import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { LoaderContainer } from './UpdateCause.style';
import useSelector from 'redux/useSelector';
import Loader from 'components/Loader';
import CauseForm from 'components/CauseForm';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { getCause } from 'redux/Cause/selectors';
import { useUpdateCause } from 'redux/Cause/hooks/useUpdateCause';
import { Cause, InCreationCause } from 'redux/Cause/types';

type UpdateCauseProps = {
  causeId: string;
};

const UpdateCause: FunctionComponent<UpdateCauseProps> = ({ causeId }) => {
  const toUpdateCause = useSelector(getCause(causeId));
  const { loading: isFetchingCause, fetchCause } = useFetchOneCause(causeId);
  const { loading: isUpdatingCause, updateCause } = useUpdateCause();

  useEffect(() => {
    if (causeId !== null) {
      fetchCause();
    }
  }, [fetchCause, causeId]);

  const onSubmit = useCallback(
    (cause: InCreationCause | Cause) => {
      updateCause({
        cause: cause as Cause,
        shouldUpdateImage:
          toUpdateCause === undefined || toUpdateCause.image_url !== cause.image_url,
      });
    },
    [toUpdateCause, updateCause],
  );

  if (isFetchingCause && toUpdateCause === undefined) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <CauseForm onSubmit={onSubmit} initialCause={toUpdateCause} isSubmitting={isUpdatingCause} />
  );
};

export default UpdateCause;
