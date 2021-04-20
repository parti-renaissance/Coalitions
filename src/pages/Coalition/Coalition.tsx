import React, { useEffect, FunctionComponent } from 'react';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchCoalitions } from 'redux/Coalition/hooks';
import { getCoalition } from 'redux/Coalition/selectors';
import { Image, Title, ContentContainer, DescriptionWrapper } from './Coalition.style';
import { Container as HeaderContainer } from 'components/CauseDetails/components/Header/Header.style';
import { SeeMore } from 'components/SeeMore/SeeMore';

interface CoalitionNavParams {
  coalitionId: string;
}

const Coalition: FunctionComponent = () => {
  const { coalitionId } = useParams<CoalitionNavParams>();
  const coalition = useSelector(getCoalition(coalitionId));
  const { fetchCoalitions, isFetchingCoalitions } = useFetchCoalitions();

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

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
