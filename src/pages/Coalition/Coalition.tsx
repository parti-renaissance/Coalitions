import React, { useEffect, FunctionComponent } from 'react';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchCoalitions } from 'redux/Coalition/hooks';
import { getCoalition } from 'redux/Coalition/selectors';
import {
  HeaderContainer,
  Image,
  Title,
  ContentContainer,
  ContentSubContainer,
  DescriptionWrapper,
  HeaderSubContainer,
} from './Coalition.style';
import { SeeMore } from 'components/SeeMore/SeeMore';
import ShareButton from 'components/ShareButton';
import HorizontalCausesList from 'components/HorizontalCausesList';
import { useFetchCauses } from 'redux/Cause/hooks/useFetchCauses';
import { getAllCauses } from 'redux/Cause/selectors';
import { isUserLogged } from 'redux/Login/selectors';
import { useFeatureToggling } from 'services/useFeatureToggling';
import Video from 'components/Video';
import { VIDEO_ID as HOME_VIDEO_ID } from 'pages/Home/Home';

interface CoalitionNavParams {
  coalitionId: string;
}

const Coalition: FunctionComponent = () => {
  const { coalitionId } = useParams<CoalitionNavParams>();
  const coalition = useSelector(getCoalition(coalitionId));
  const { fetchCoalitions, isFetchingCoalitions } = useFetchCoalitions();
  const causes = useSelector(getAllCauses);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const { loading: isFetchingCauses, fetchFirstPage: fetchCauses } = useFetchCauses();
  const { isCoalitionVideoPlaceholderEnable } = useFeatureToggling();

  useEffect(() => {
    fetchCauses([coalitionId], isUserLoggedIn);
  }, [fetchCauses, coalitionId, isUserLoggedIn]);

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

  if (isFetchingCoalitions && coalition === undefined) {
    return <Loader />;
  }

  if (coalition === undefined) {
    return null;
  }

  let videoId = undefined;
  if (Boolean(coalition.youtube_id)) {
    videoId = coalition.youtube_id;
  } else if (isCoalitionVideoPlaceholderEnable) {
    videoId = HOME_VIDEO_ID;
  }

  return (
    <>
      <Image src={coalition.image_url} />
      <HeaderContainer>
        <Title>{coalition.name}</Title>
        <HeaderSubContainer>
          <ShareButton
            displayMobileIcon
            shareContent={{ title: coalition.name, text: coalition.name }}
          />
        </HeaderSubContainer>
      </HeaderContainer>
      <ContentContainer>
        <DescriptionWrapper>
          <SeeMore text={coalition.description} />
        </DescriptionWrapper>
        {videoId !== undefined ? (
          <ContentSubContainer center>
            <Video videoId={videoId as string} />
          </ContentSubContainer>
        ) : null}
        <ContentSubContainer>
          <HorizontalCausesList isLoading={isFetchingCauses} causes={causes} />
        </ContentSubContainer>
      </ContentContainer>
    </>
  );
};

export default Coalition;
