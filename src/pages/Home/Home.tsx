import * as React from 'react';
import {
  Block,
  MobileCreateCauseButtonContainer,
  HomeContainer,
  HomeSubContainer,
  Title,
  SubTitle,
  Content,
  DesktopCreateCauseButton,
  Image,
  CoalitionCardsWrapper,
  CauseCardsWrapper,
  CausesHeader,
  SeeAllButton,
} from './Home.style';
import { CauseDefinition } from 'components/Definition/CauseDefinition';
import Cause from 'components/Cause';
import { CoalitionDefinition } from 'components/Definition/CoalitionDefinition';
import { DefaultLink } from 'components/Link/Link';
import { FormattedMessage } from 'react-intl';
import { PATHS } from 'routes';
import { MediumLargeButton } from 'components/Button/Button';
import { DefinitionWrapper } from 'components/Definition/Definition.style';
import CoalitionCards from 'components/CoalitionCards';
import { Coalition } from 'redux/Coalition/types';
import { useSelector } from 'react-redux';
import { useFetchCauses } from 'redux/Cause/hooks/useFetchCauses';
import { getAllCauses } from 'redux/Cause/selectors';
import { isUserLogged } from 'redux/Login';
import Loader from 'components/Loader';

const Home: React.FunctionComponent = () => {
  const onCoalitionClick = (coalition: Coalition) => {
    // TODO
    console.log({ coalition });
  };
  const causes = useSelector(getAllCauses);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const { loading, fetchFirstPage } = useFetchCauses(10);

  React.useEffect(() => {
    fetchFirstPage([]);
  }, [fetchFirstPage, isUserLoggedIn]);

  return (
    <>
      <HomeContainer>
        <HomeSubContainer>
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
        </HomeSubContainer>
        <Image />
      </HomeContainer>
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
      <Block>
        <CausesHeader>
          <h3>
            <FormattedMessage id="home.support-causes" />
          </h3>
          <DefaultLink to={PATHS.CAUSE_LIST.url()}>
            <SeeAllButton>Voir tout</SeeAllButton>
          </DefaultLink>
        </CausesHeader>
        {loading ? (
          <Loader />
        ) : (
          <CauseCardsWrapper>
            {causes.map(cause => (
              <Cause key={cause.uuid} cause={cause} />
            ))}
          </CauseCardsWrapper>
        )}
      </Block>
      <DefinitionWrapper>
        <CoalitionDefinition />
      </DefinitionWrapper>
      <Block>
        <SubTitle id="coalitions">
          <FormattedMessage id="coalition.title" />
        </SubTitle>
        <CoalitionCardsWrapper>
          <CoalitionCards onCoalitionClick={onCoalitionClick} responsiveNbOfCardsByLine />
        </CoalitionCardsWrapper>
      </Block>
    </>
  );
};

export default Home;
