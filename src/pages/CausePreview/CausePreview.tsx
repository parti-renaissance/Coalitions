import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import CauseDetails from 'components/CauseDetails';
import { getInCreationCause } from 'redux/Cause/selectors';
import { getCurrentUser } from 'redux/User/selectors';

const CausePreview: FunctionComponent = () => {
  const causeWithoutAuthor = useSelector(getInCreationCause);
  const currentUser = useSelector(getCurrentUser);

  if (causeWithoutAuthor === undefined || currentUser === undefined) {
    return null;
  }

  return (
    <CauseDetails
      cause={{
        ...causeWithoutAuthor,
        author: {
          uuid: currentUser.uuid,
          first_name: currentUser.firstName,
          last_name_initial: '',
        },
      }}
    />
  );
};

export default CausePreview;
