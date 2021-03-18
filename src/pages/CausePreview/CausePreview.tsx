import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CauseDetails from 'components/CauseDetails';
import { getInCreationCause } from 'redux/Cause/selectors';
import { useFetchCurrentUser } from 'redux/User/hooks/useFetchCurrentUser';
import { getCurrentUser } from 'redux/User/selectors';
import Loader from 'components/Loader';

const CausePreview: FunctionComponent = () => {
  const causeWithoutAuthor = useSelector(getInCreationCause);
  const currentUser = useSelector(getCurrentUser);
  const { fetchCurrentUser, isFetchingCurrentUser } = useFetchCurrentUser();

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (isFetchingCurrentUser) {
    return <Loader />;
  }

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
