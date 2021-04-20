import React, { useEffect, FunctionComponent, useState } from 'react';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchCoalitions } from 'redux/Coalition/hooks';
import { getCoalitions } from 'redux/Coalition/selectors';
import { Coalition as CoalitionType } from 'redux/Coalition/types';
import { Image } from './Coalition.style';

interface CoalitionNavParams {
  coalitionId: string;
}

const Coalition: FunctionComponent = () => {
  const { coalitionId } = useParams<CoalitionNavParams>();
  const coalitions = useSelector(getCoalitions);
  const [coalition, setCoalition] = useState<CoalitionType | undefined>(
    coalitions.find(({ uuid }) => uuid === coalitionId),
  );

  const { fetchCoalitions, isFetchingCoalitions } = useFetchCoalitions();

  useEffect(() => {
    if (coalitions.length === 0) {
      fetchCoalitions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCoalitions]);

  useEffect(() => {
    setCoalition(coalitions.find(({ uuid }) => uuid === coalitionId));
  }, [coalitions, coalitionId]);

  if (isFetchingCoalitions && coalition === undefined) {
    return <Loader />;
  }

  if (coalition === undefined) {
    return null;
  }

  return (
    <>
      <Image src={coalition.image_url} />
    </>
  );
};

export default Coalition;
