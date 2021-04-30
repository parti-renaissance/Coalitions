import React, { FunctionComponent, MouseEvent } from 'react';
import {
  Container,
  Image,
  Name,
  SelectedContainer,
  SelectedIndex,
  NameContainer,
  FollowButton,
  UnfollowButtonWrapper,
} from './CoalitionCard.style';
import { Coalition } from 'redux/Coalition/types';
import FollowTag, { FOLLOW_TAG_TYPE } from 'components/FollowTag/FollowTag';
import { useLocation } from 'react-router';
import { PATHS } from 'routes';
import { useCoalitionFollow, useCoalitionUnfollow } from 'redux/Coalition/hooks/useCoalitionFollow';
import { useSelector } from 'react-redux';
import { isUserLogged } from 'redux/Login';
import { useIntl } from 'react-intl';
import MoreOptionsMenu from 'components/MoreOptionsMenu';

interface CoalitionCardProps {
  onClick?: () => void;
  selectedIndex?: number;
  coalition: Coalition;
}

// eslint-disable-next-line complexity
const CoalitionCard: FunctionComponent<CoalitionCardProps> = ({
  onClick,
  selectedIndex,
  coalition,
}) => {
  const { pathname } = useLocation();
  const { loading: isFollowing, followCoalition } = useCoalitionFollow(coalition.uuid);
  const { loading: isUnfollowing, unfollowCoalition } = useCoalitionUnfollow(coalition.uuid);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const intl = useIntl();

  const follow = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    followCoalition();
  };

  const onCreateOrUpdateCausePage =
    pathname.includes(PATHS.CREATE_CAUSE.url()) || pathname.includes(PATHS.CAUSE_ADMIN.url(''));
  const canFollowOrUnfollow = isUserLoggedIn && !onCreateOrUpdateCausePage;
  return (
    <Container responsiveNbOfCardsByLine={!onCreateOrUpdateCausePage}>
      <Image backgroundImage={coalition.image_url} onClick={onClick}>
        {selectedIndex !== undefined ? (
          <SelectedContainer>
            <SelectedIndex>
              {selectedIndex === 0
                ? intl.formatMessage({ id: 'create_cause.coalitions.main_theme' })
                : intl.formatMessage({ id: 'create_cause.coalitions.secondary_theme' })}
            </SelectedIndex>
          </SelectedContainer>
        ) : null}
      </Image>
      <NameContainer>
        <Name>{coalition.name}</Name>
        {canFollowOrUnfollow ? (
          Boolean(coalition.followed) ? (
            <UnfollowButtonWrapper>
              <MoreOptionsMenu
                isUnfollowing={isUnfollowing}
                unfollow={unfollowCoalition}
                unfollowModalLabels={{
                  description: intl.formatMessage({ id: 'coalition.unfollow_modal.description' }),
                  confirm: intl.formatMessage({ id: 'coalition.unfollow_modal.confirm' }),
                }}
              />
            </UnfollowButtonWrapper>
          ) : (
            <div>
              <FollowButton size="small" color="primary" onClick={follow} isLoading={isFollowing}>
                {intl.formatMessage({ id: 'coalition.follow' })}
              </FollowButton>
            </div>
          )
        ) : null}
      </NameContainer>
      {canFollowOrUnfollow && Boolean(coalition.followed) ? (
        <FollowTag labelKey="coalition.followed" type={FOLLOW_TAG_TYPE.coalition} />
      ) : null}
    </Container>
  );
};

export default CoalitionCard;
