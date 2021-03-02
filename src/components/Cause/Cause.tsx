import React from 'react';

import { StyledButton, DefaultButton } from 'components/Button/Button';

import { Cause as CauseType } from 'redux/Cause/types';
import {
  Author,
  ButtonContainer,
  CauseName,
  CoalitionName,
  Icon,
  StyledCard,
  StyledContent,
  StyledMedia,
  Supports,
} from './Cause.style';
import { isMobile } from 'services/mobile/mobile';

interface CauseProps {
  cause: CauseType;
}

const Cause: React.FunctionComponent<CauseProps> = ({ cause }: CauseProps) => {
  return (
    <StyledCard isMobile={isMobile()}>
      <StyledMedia image={cause.image_url} title="" />
      <StyledContent>
        <CoalitionName>{cause.coalition.name}</CoalitionName>
        <CauseName>{cause.name}</CauseName>
        <Author>
          Par {cause.author.first_name} {cause.author.last_name_initial}
        </Author>
        <Supports>
          <Icon src="/images/supports.svg"></Icon>
          <span>17038 soutiens</span>
        </Supports>
        <ButtonContainer>
          <StyledButton size="small" variant="contained" color="secondary">
            Soutenir
          </StyledButton>
          <DefaultButton size="small" variant="outlined">
            Voir
          </DefaultButton>
        </ButtonContainer>
      </StyledContent>
    </StyledCard>
  );
};

export default Cause;
