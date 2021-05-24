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
  HeaderSubSubContainer,
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
import { useCoalitionFollow, useCoalitionUnfollow } from 'redux/Coalition/hooks/useCoalitionFollow';
import FixedBottomButton from 'components/FixedBottomButton';
import FollowTag, { FOLLOW_TAG_TYPE } from 'components/FollowTag/FollowTag';
import IconAndLabel from 'components/IconAndLabel';
import MoreOptionsMenu from 'components/MoreOptionsMenu';
import EventCardsSlider from 'components/EventCardsSlider';
import EventDetailsModal from 'components/EventDetailsModal';

interface CoalitionNavParams {
  coalitionId: string;
}

// eslint-disable-next-line complexity
const Coalition: FunctionComponent = () => {
  const { coalitionId } = useParams<CoalitionNavParams>();
  const coalition = useSelector(getCoalition(coalitionId));
  const { fetchCoalitions, isFetchingCoalitions } = useFetchCoalitions();
  const { isCoalitionVideoPlaceholderEnable, areEventsEnable } = useFeatureToggling();
  const isMobile = getIsMobile();
  const { loading: isFollowing, followCoalition } = useCoalitionFollow(coalitionId);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const { loading: isUnfollowing, unfollowCoalition } = useCoalitionUnfollow(coalitionId);
  const intl = useIntl();

  useEffect(() => {
    fetchCoalitions();
  }, [fetchCoalitions]);

  if (isFetchingCoalitions && coalition === undefined) {
    return <Loader fullScreen />;
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
          <HeaderSubSubContainer>
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
            {coalition.followed === true ? (
              <MoreOptionsMenu
                isUnfollowing={isUnfollowing}
                unfollow={unfollowCoalition}
                unfollowModalLabels={{
                  description: intl.formatMessage({ id: 'coalition.unfollow_modal.description' }),
                  confirm: intl.formatMessage({ id: 'coalition.unfollow_modal.confirm' }),
                }}
              />
            ) : null}
          </HeaderSubSubContainer>
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
        {areEventsEnable ? (
          <ContentSubContainer>
            <EventCardsSlider coalitionId={coalitionId} />
          </ContentSubContainer>
        ) : null}
      </ContentContainer>
      {showFollowButton ? (
        <FixedBottomButton onClick={followCoalition} isLoading={isFollowing}>
          {intl.formatMessage({ id: 'coalition.follow' })}
        </FixedBottomButton>
      ) : null}
      <EventDetailsModal />
    </>
  );
};

export default Coalition;
