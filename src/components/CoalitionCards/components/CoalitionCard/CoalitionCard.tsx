import React, { FunctionComponent } from 'react';
import { Container, Image, Name, SelectedContainer, SelectedIndex } from './CoalitionCard.style';
import { Coalition } from 'redux/Coalition/types';
import FollowTag, { FOLLOW_TAG_TYPE } from 'components/FollowTag/FollowTag';
import { useLocation } from 'react-router';
import { PATHS } from 'routes';

interface CoalitionCardProps {
  onClick?: () => void;
  selectedIndex?: number;
  coalition: Coalition;
}

const CoalitionCard: FunctionComponent<CoalitionCardProps> = ({
  onClick,
  selectedIndex,
  coalition,
}) => {
  const { pathname } = useLocation();
  const onCreateOrUpdateCausePage =
    pathname.includes(PATHS.CREATE_CAUSE.url()) || pathname.includes(PATHS.CAUSE_ADMIN.url(''));

  return (
    <Container onClick={onClick} responsiveNbOfCardsByLine={!onCreateOrUpdateCausePage}>
      <Image backgroundImage={coalition.image_url}>
        {selectedIndex !== undefined ? (
          <SelectedContainer>
            <SelectedIndex>{selectedIndex + 1}</SelectedIndex>
          </SelectedContainer>
        ) : null}
      </Image>
      <Name>{coalition.name}</Name>
      {Boolean(coalition.followed) ? (
        <FollowTag labelKey="coalition.followed" type={FOLLOW_TAG_TYPE.coalition} />
      ) : null}
    </Container>
  );
};

export default CoalitionCard;
