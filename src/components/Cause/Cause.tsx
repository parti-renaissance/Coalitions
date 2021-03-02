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
import { FormattedMessage } from 'react-intl';

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
          <FormattedMessage
            id="cause.author"
            values={{
              firstName: cause.author.first_name,
              lastNameInitial: cause.author.last_name_initial,
            }}
          />
        </Author>
        <Supports>
          <Icon src="/images/supports.svg"></Icon>
          <FormattedMessage
            id="cause.supports"
            values={{
              supportsNumber: 17038,
            }}
          />
        </Supports>
        <ButtonContainer>
          <StyledButton size="small" variant="contained" color="secondary">
            <FormattedMessage id="cause.support-button" />
          </StyledButton>
          <DefaultButton size="small" variant="outlined">
            <FormattedMessage id="cause.see-button" />
          </DefaultButton>
        </ButtonContainer>
      </StyledContent>
    </StyledCard>
  );
};

export default Cause;
