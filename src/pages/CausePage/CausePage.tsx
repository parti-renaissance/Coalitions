import Loader from 'components/Loader';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks';
import { getCause } from 'redux/Cause/selectors';
import {
  CausePageHeader,
  CauseName,
  CoalitionName,
  CauseImage,
  CausePageSubHeaderContainer,
} from './CausePage.style';

interface CausePageNavParams {
  causeId: string;
}

const CausePage: React.FunctionComponent = () => {
  const { causeId } = useParams<CausePageNavParams>();
  const { loading, fetchCause } = useFetchOneCause(causeId);
  const cause = useSelector(getCause(causeId));

  useEffect(() => {
    fetchCause();
  }, [fetchCause]);

  if (loading && cause === undefined) {
    return <Loader />;
  }

  if (cause === undefined) {
    return null;
  }

  return (
    <CausePageHeader>
      <CauseImage backgroundImage={cause.image_url} />
      <CausePageSubHeaderContainer>
        <CoalitionName>{cause.coalition.name}</CoalitionName>
        <CauseName>{cause.name}</CauseName>
      </CausePageSubHeaderContainer>
    </CausePageHeader>
  );
};

export default CausePage;
