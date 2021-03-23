import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Loader from './components/Loader/Loader';
import Snackbar from 'components/Snackbar';

const Home = lazy(() => import('./pages/Home'));
const CausePage = lazy(() => import('./pages/CausePage'));
const OurMission = lazy(() => import('./pages/OurMission'));
const CreateCause = lazy(() => import('./pages/CreateCause'));
const CausePreview = lazy(() => import('./pages/CausePreview'));
const CauseList = lazy(() => import('./pages/CauseList'));

export const PATHS = {
  HOME: {
    route: '/',
    url: () => '/',
  },
  CAUSE: {
    route: '/cause/:causeId',
    url: (causeId: string) => `/cause/${causeId}`,
  },
  CAUSE_LIST: {
    route: '/cause-list',
    url: () => '/cause-list',
  },
  OUR_MISSION: {
    route: '/our-mission',
    url: () => '/our-mission',
  },
  CREATE_CAUSE: {
    route: '/create-cause',
    url: () => '/create-cause',
  },
  CAUSE_PREVIEW: {
    route: '/cause-preview',
    url: () => '/cause-preview',
  },
};

const routes: FunctionComponent<{}> = () => (
  <>
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path={PATHS.HOME.route} component={Home} />
        <Route exact path={PATHS.CAUSE_LIST.route} component={CauseList} />
        <Route path={PATHS.CAUSE.route} component={CausePage}></Route>
        <Route path={PATHS.OUR_MISSION.route} component={OurMission}></Route>
        <Route path={PATHS.CREATE_CAUSE.route} component={CreateCause}></Route>
        <Route path={PATHS.CAUSE_PREVIEW.route} component={CausePreview}></Route>
      </Switch>
    </Suspense>
    <Snackbar />
  </>
);

export default routes;
