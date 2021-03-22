import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import {
  Container,
  SubContainer,
  SubTitle,
  Content,
  Image,
  DesktopCreateCauseButton,
  MobileSupportButtonWrapper,
  Title,
} from './OurMission.style';
import FixedBottomButton from 'components/FixedBottomButton';
import { DefaultLink as Link } from 'components/Link/Link';
import { PATHS } from 'routes';

const OurMissionHeader: FunctionComponent = () => {
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
          <Link to={PATHS.CREATE_CAUSE.url()}>
            <DesktopCreateCauseButton
              size="small"
              variant="contained"
              color="primary"
              onClick={onCreateCauseClick}
            >
              {intl.formatMessage({ id: 'cause-cta.cause-creation' })}
            </DesktopCreateCauseButton>
          </Link>
        </SubContainer>
        <Image />
      </Container>
      <MobileSupportButtonWrapper>
        <Link to={PATHS.CREATE_CAUSE.url()}>
          <FixedBottomButton onClick={onCreateCauseClick}>
            {intl.formatMessage({ id: 'cause-cta.cause-creation' })}
          </FixedBottomButton>
        </Link>
      </MobileSupportButtonWrapper>
    </>
  );
};

export default OurMissionHeader;
