import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import { Container, Title } from './OurMission.style';

const OurMission: FunctionComponent = () => {
  const intl = useIntl();
  return (
    <Container>
      <Title>{intl.formatMessage({ id: 'our_mission.title' })}</Title>
    </Container>
  );
};

export default OurMission;
