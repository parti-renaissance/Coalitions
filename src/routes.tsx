import React, { FunctionComponent, lazy, Suspense, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import Loader from './components/Loader/Loader';
import Snackbar from 'components/Snackbar';

const Home = lazy(() => import('./pages/Home'));
const CausePage = lazy(() => import('./pages/CausePage'));
const OurMission = lazy(() => import('./pages/OurMission'));
const CreateCause = lazy(() => import('./pages/CreateCause'));
const CauseAdmin = lazy(() => import('./pages/CauseAdmin'));
const CausePreview = lazy(() => import('./pages/CausePreview'));
const CauseList = lazy(() => import('./pages/CauseList'));
const Password = lazy(() => import('./pages/Password'));
const Inscription = lazy(() => import('./pages/Inscription'));
const CookiesPolicy = lazy(() => import('./pages/CookiesPolicy'));
const LegalNotice = lazy(() => import('./pages/LegalNotice'));
const DataProtectionPolicy = lazy(() => import('./pages/DataProtectionPolicy'));
const Profile = lazy(() => import('./pages/Profile'));
const Coalition = lazy(() => import('./pages/Coalition'));

export const CHARTER_OF_VALUES_URL =
  'https://storage.googleapis.com/pourunecause/charte_des_valeurs.pdf';

export const PATHS = {
  HOME: {
    route: '/',
    url: () => '/',
  },
  CAUSE: {
    route: '/cause/:causeIdOrSlug',
    url: (causeIdOrSlug: string) => `/cause/${causeIdOrSlug}`,
  },
  CAUSE_LIST: {
    route: '/causes',
    url: () => '/causes',
  },
  OUR_MISSION: {
    route: '/pourquoi-creer-une-cause',
    url: () => '/pourquoi-creer-une-cause',
  },
  CREATE_CAUSE: {
    route: '/creer-une-cause',
    url: () => '/creer-une-cause',
  },
  CAUSE_ADMIN: {
    route: '/administrer-une-cause/:causeIdOrSlug',
    url: (causeIdOrSlug: string) => `/administrer-une-cause/${causeIdOrSlug}`,
  },
  CAUSE_PREVIEW: {
    route: '/apercu',
    url: () => '/apercu',
  },
  LEGAL_NOTICE: {
    route: '/mentions-legales',
    url: () => '/mentions-legales',
  },
  COOKIES_POLICY: {
    route: '/politique-cookies',
    url: () => '/politique-cookies',
  },
  DATA_PROTECTION_POLICY: {
    route: '/politique-protection-donnees',
    url: () => '/politique-protection-donnees',
  },
  CONFIRM_PASSWORD: {
    route: '/confirmation/:identifier/:token',
    url: ({ identifier, token }: { identifier: string; token: string }) =>
      `/confirmation/${identifier}/${token}`,
  },
  INSCRIPTION: {
    route: '/inscription',
    url: () => '/inscription',
  },
  PROFILE: {
    route: '/profile',
    url: () => '/profile',
  },
  COALITION: {
    route: '/coalition/:coalitionId',
    url: (coalitionId: string) => `/coalition/${coalitionId}`,
  },
};

const Routes: FunctionComponent<{}> = () => {
  const history = useHistory();

  useEffect(() => {
    return history.listen((_, action) => {
      if (action === 'PUSH') {
        window.scrollTo(0, 0);
      }
    });
  }, [history]);

  return (
    <>
      <Suspense fallback={<Loader fullScreen />}>
        <Switch>
          <Route exact path={PATHS.HOME.route} component={Home} />
          <Route exact path={PATHS.CAUSE_LIST.route} component={CauseList} />
          <Route path={PATHS.CAUSE_ADMIN.route} component={CauseAdmin}></Route>
          <Route path={PATHS.CAUSE.route} component={CausePage}></Route>
          <Route path={PATHS.OUR_MISSION.route} component={OurMission}></Route>
          <Route path={PATHS.CREATE_CAUSE.route} component={CreateCause}></Route>
          <Route path={PATHS.CAUSE_PREVIEW.route} component={CausePreview}></Route>
          <Route path={PATHS.LEGAL_NOTICE.route} component={LegalNotice}></Route>
          <Route path={PATHS.COOKIES_POLICY.route} component={CookiesPolicy}></Route>
          <Route path={PATHS.DATA_PROTECTION_POLICY.route} component={DataProtectionPolicy}></Route>
          <Route path={PATHS.CONFIRM_PASSWORD.route} component={Password}></Route>
          <Route path={PATHS.INSCRIPTION.route} component={Inscription}></Route>
          <Route path={PATHS.PROFILE.route} component={Profile}></Route>
          <Route path={PATHS.COALITION.route} component={Coalition}></Route>
        </Switch>
      </Suspense>
      <Snackbar />
    </>
  );
};

export default Routes;
