import Loader from 'components/Loader';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks';
import { getCause } from 'redux/Cause/selectors';
import { CausePageHeader, CauseName, CoalitionName, CauseImage } from './CausePage.style';

const CausePage: React.FunctionComponent = () => {
  const { causeId } = useParams();
  const { loading, fetchCause } = useFetchOneCause(causeId);
  const cause = useSelector(getCause(causeId));

  useEffect(() => {
    fetchCause();
  }, [fetchCause]);

  if (loading && cause === undefined) {
    return <Loader />;
  }

  return (
    <>
      {cause !== undefined && (
        <CausePageHeader>
          <CauseImage backgroundImage={cause.image_url} />
          <CoalitionName>{cause.coalition.name}</CoalitionName>
          <CauseName>{cause.name}</CauseName>
        </CausePageHeader>
      )}
    </>
  );
};

export default CausePage;
