import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import CauseDetails from 'components/CauseDetails';
import { getInCreationCause } from 'redux/Cause/selectors';

const CausePreview: FunctionComponent = () => {
  const cause = useSelector(getInCreationCause);

  if (cause === undefined) {
    return null;
  }

  return <CauseDetails cause={cause} />;
};

export default CausePreview;
