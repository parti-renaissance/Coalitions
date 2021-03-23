import * as React from 'react';
import {
  CoalitionContainer,
  MobileCreateCauseButtonContainer,
  Container,
  SubContainer,
  Title,
  SubTitle,
  Content,
  DesktopCreateCauseButton,
  Image,
} from './Home.style';
import { CauseDefinition } from 'components/Definition/CauseDefinition';
import { CoalitionDefinition } from 'components/Definition/CoalitionDefinition';
import { DefaultLink } from 'components/Link/Link';
import { FormattedMessage } from 'react-intl';
import { PATHS } from 'routes';
import { MediumLargeButton } from 'components/Button/Button';
import { DefinitionWrapper } from 'components/Definition/Definition.style';
import CoalitionCards from 'components/CoalitionCards';
import { Coalition } from 'redux/Coalition/types';

const Home: React.FunctionComponent = () => {
  const onCoalitionClick = (coalition: Coalition) => {
    // TODO
    console.log({ coalition });
  };

  return (
    <>
      <Container>
        <SubContainer>
          <Title>
            <FormattedMessage id="our_mission.title" />
          </Title>
          <SubTitle>
            <FormattedMessage id="our_mission.our-mission" />
          </SubTitle>
          <Content>
            <FormattedMessage id="our_mission.explanation" />
          </Content>
          <DefaultLink to={PATHS.OUR_MISSION.url()}>
            <DesktopCreateCauseButton size="small" variant="contained" color="primary">
              <FormattedMessage id="cause-cta.cause-creation" />
            </DesktopCreateCauseButton>
          </DefaultLink>
        </SubContainer>
        <Image />
      </Container>
      <MobileCreateCauseButtonContainer>
        <DefaultLink to={PATHS.OUR_MISSION.url()}>
          <MediumLargeButton variant="contained" color="primary">
            <FormattedMessage id="cause-cta.cause-creation" />
          </MediumLargeButton>
        </DefaultLink>
      </MobileCreateCauseButtonContainer>
      <DefinitionWrapper>
        <CauseDefinition />
      </DefinitionWrapper>
      <DefinitionWrapper>
        <CoalitionDefinition />
      </DefinitionWrapper>
      <CoalitionContainer>
        <SubTitle id="coalitions">
          <FormattedMessage id="coalition.title" />
        </SubTitle>
        <CoalitionCards onCoalitionClick={onCoalitionClick} updateTabletNbOfCardsByLine />
      </CoalitionContainer>
    </>
  );
};

export default Home;
