import React, { FunctionComponent, useCallback } from 'react';
import CauseForm from 'components/CauseForm';
import { useUpdateCause } from 'redux/Cause/hooks/useUpdateCause';
import { Cause, InCreationCause } from 'redux/Cause/types';

type UpdateCauseProps = {
  cause: Cause;
};

const UpdateCause: FunctionComponent<UpdateCauseProps> = ({ cause }) => {
  const { loading: isUpdatingCause, updateCause } = useUpdateCause();

  const onSubmit = useCallback(
    (updatedCause: InCreationCause | Cause) => {
      updateCause({
        cause: cause as Cause,
        shouldUpdateImage: cause.image_url !== updatedCause.image_url,
      });
    },
    [cause, updateCause],
  );

  return <CauseForm onSubmit={onSubmit} initialCause={cause} isSubmitting={isUpdatingCause} />;
};

export default UpdateCause;
