import React, { FunctionComponent } from 'react';
import { Container, Image, Name, SelectedContainer, SelectedIndex } from './CoalitionCard.style';
import { Coalition } from 'redux/Coalition/types';
import FollowTag, { FOLLOW_TAG_TYPE } from 'components/FollowTag/FollowTag';

interface CoalitionCardProps {
  onClick?: () => void;
  selectedIndex?: number;
  coalition: Coalition;
  responsiveNbOfCardsByLine?: boolean;
}

const CoalitionCard: FunctionComponent<CoalitionCardProps> = ({
  onClick,
  selectedIndex,
  coalition,
  responsiveNbOfCardsByLine,
}) => {
  return (
    <Container onClick={onClick} responsiveNbOfCardsByLine={responsiveNbOfCardsByLine}>
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
