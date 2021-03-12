import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import {
  Container,
  SubContainer,
  Title,
  SubTitle,
  Content,
  Image,
  DesktopCreateCauseButton,
  MobileSupportButtonWrapper,
} from './OurMission.style';
import FixedBottomButton from 'components/FixedBottomButton';

const OurMission: FunctionComponent = () => {
  const intl = useIntl();

  const onCreateCauseClick = () => {
    // TODO
  };

  return (
    <>
      <Container>
        <SubContainer>
          <Title>{intl.formatMessage({ id: 'our_mission.title' })}</Title>
          <SubTitle>{intl.formatMessage({ id: 'our_mission.our-mission' })}</SubTitle>
          <Content>{intl.formatMessage({ id: 'our_mission.explanation' })}</Content>
          <DesktopCreateCauseButton
            size="small"
            variant="contained"
            color="primary"
            onClick={onCreateCauseClick}
          >
            {intl.formatMessage({ id: 'cause-cta.cause-creation' })}
          </DesktopCreateCauseButton>
        </SubContainer>
        <Image />
      </Container>
      <MobileSupportButtonWrapper>
        <FixedBottomButton onClick={onCreateCauseClick}>
          {intl.formatMessage({ id: 'cause-cta.cause-creation' })}
        </FixedBottomButton>
      </MobileSupportButtonWrapper>
    </>
  );
};

export default OurMission;
