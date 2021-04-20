import React, { useEffect, FunctionComponent, useState } from 'react';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchCoalitions } from 'redux/Coalition/hooks';
import { getCoalitions } from 'redux/Coalition/selectors';
import { Coalition as CoalitionType } from 'redux/Coalition/types';
import { Image, Title, ContentContainer, DescriptionWrapper } from './Coalition.style';
import { Container as HeaderContainer } from 'components/CauseDetails/components/Header/Header.style';
import { SeeMore } from 'components/SeeMore/SeeMore';

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
      <HeaderContainer>
        <Title>{coalition.name}</Title>
      </HeaderContainer>
      <ContentContainer>
        <DescriptionWrapper>
          <SeeMore text={coalition.description} />
        </DescriptionWrapper>
      </ContentContainer>
    </>
  );
};

export default Coalition;
