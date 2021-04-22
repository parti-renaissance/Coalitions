import React, { FunctionComponent, useEffect } from 'react';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchCoalitions } from 'redux/Coalition/hooks/useFetchCoalitions';
import { getCoalition } from 'redux/Coalition/selectors';
import {
  HeaderContainer,
  Image,
  Title,
  ContentContainer,
  ContentSubContainer,
  HeaderSubContainer,
  FollowButton,
} from './Coalition.style';
import { SeeMore } from 'components/SeeMore/SeeMore';
import ShareButton from 'components/ShareButton';
import HorizontalCausesList from 'components/HorizontalCausesList';
import { useFeatureToggling } from 'services/useFeatureToggling';
import Video from 'components/Video';
import { VIDEO_ID as HOME_VIDEO_ID } from 'pages/Home/Home';
import { getIsMobile } from 'services/mobile/mobile';
import { useIntl } from 'react-intl';
import { isUserLogged } from 'redux/Login';
import { useCoalitionFollow } from 'redux/Coalition/hooks/useCoalitionFollow';
import FixedBottomButton from 'components/FixedBottomButton';
import FollowTag, { FOLLOW_TAG_TYPE } from 'components/FollowTag/FollowTag';
import IconAndLabel from 'components/IconAndLabel';

interface CoalitionNavParams {
  coalitionId: string;
}

// eslint-disable-next-line complexity
const Coalition: FunctionComponent = () => {
  const { coalitionId } = useParams<CoalitionNavParams>();
  const coalition = useSelector(getCoalition(coalitionId));
  const { fetchCoalitions, isFetchingCoalitions } = useFetchCoalitions();
  const { isCoalitionVideoPlaceholderEnable } = useFeatureToggling();
  const isMobile = getIsMobile();
  const { loading: isFollowing, followCoalition } = useCoalitionFollow(coalitionId);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const intl = useIntl();

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

  if (isFetchingCoalitions && coalition === undefined) {
    return <Loader />;
  }

  if (coalition === undefined) {
    return null;
  }

  const renderVideo = () => {
    let videoId = undefined;
    if (Boolean(coalition.youtube_id)) {
      videoId = coalition.youtube_id;
    } else if (isCoalitionVideoPlaceholderEnable) {
      videoId = HOME_VIDEO_ID;
    }

    if (videoId === undefined) {
      return null;
    }
    return (
      <ContentSubContainer center>
        <Video videoId={videoId as string} />
      </ContentSubContainer>
    );
  };

  const showFollowButton = isUserLoggedIn && !Boolean(coalition.followed);
  return (
    <>
      <Image src={coalition.image_url} />
      {Boolean(coalition.followed) ? (
        <FollowTag labelKey="coalition.followed" type={FOLLOW_TAG_TYPE.coalition} />
      ) : null}
      <HeaderContainer>
        <div>
          <Title>{coalition.name}</Title>
          <IconAndLabel
            iconSrc="/images/supports.svg"
            label={
              coalition.cause_followers_count > 1
                ? intl.formatMessage(
                    { id: 'coalition.followers' },
                    {
                      followersNumber: coalition.cause_followers_count,
                    },
                  )
                : intl.formatMessage(
                    { id: 'coalition.follower' },
                    {
                      followersNumber: coalition.cause_followers_count,
                    },
                  )
            }
          />
        </div>
        <HeaderSubContainer>
          {showFollowButton ? (
            <FollowButton
              size="small"
              variant="contained"
              color="primary"
              onClick={followCoalition}
              isLoading={isFollowing}
            >
              {intl.formatMessage({ id: 'coalition.follow' })}
            </FollowButton>
          ) : null}
          <ShareButton
            displayMobileIcon
            shareContent={{ title: coalition.name, text: coalition.name }}
          />
        </HeaderSubContainer>
      </HeaderContainer>
      <ContentContainer>
        {isMobile ? renderVideo() : null}
        <ContentSubContainer maxWidth>
          <SeeMore text={coalition.description} />
        </ContentSubContainer>
        {!isMobile ? renderVideo() : null}
        <ContentSubContainer>
          <HorizontalCausesList coalitionId={coalitionId} />
        </ContentSubContainer>
      </ContentContainer>
      {showFollowButton ? (
        <FixedBottomButton onClick={followCoalition} isLoading={isFollowing}>
          {intl.formatMessage({ id: 'coalition.follow' })}
        </FixedBottomButton>
      ) : null}
    </>
  );
};

export default Coalition;
