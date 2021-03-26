import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import {
  Container,
  SubContainer,
  SubTitle,
  Content,
  Image,
  DesktopCreateCauseButton,
  Title,
} from './OurMission.style';
import { DefaultLink as Link } from 'components/Link/Link';
import { PATHS } from 'routes';

const OurMissionHeader: FunctionComponent = () => {
  const intl = useIntl();

  return (
    <Container>
      <SubContainer>
        <Title>{intl.formatMessage({ id: 'our_mission.title' })}</Title>
        <SubTitle>{intl.formatMessage({ id: 'our_mission.our-mission' })}</SubTitle>
        <Content>{intl.formatMessage({ id: 'our_mission.explanation' })}</Content>
        <Link to={PATHS.CREATE_CAUSE.url()}>
          <DesktopCreateCauseButton size="small" variant="contained" color="primary">
            {intl.formatMessage({ id: 'cause-cta.cause-creation' })}
          </DesktopCreateCauseButton>
        </Link>
      </SubContainer>
      <Image />
    </Container>
  );
};

export default OurMissionHeader;
