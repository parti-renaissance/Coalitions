import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router';
import Loader from './components/Loader/Loader';
import Snackbar from 'components/Snackbar';

const Home = lazy(() => import('./pages/Home'));
const CausePage = lazy(() => import('./pages/CausePage'));
const OurMission = lazy(() => import('./pages/OurMission'));
const CreateCause = lazy(() => import('./pages/CreateCause'));

export const PATHS = {
  HOME: {
    route: '/',
    url: () => '/',
  },
  CAUSE: {
    route: '/cause/:causeId',
    url: (causeId: string) => `/cause/${causeId}`,
  },
  OUR_MISSION: {
    route: '/our-mission',
    url: () => '/our-mission',
  },
  CREATE_CAUSE: {
    route: '/create-cause',
    url: () => '/create-cause',
  },
};

const routes: FunctionComponent<{}> = () => (
  <>
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route exact path={PATHS.HOME.route} component={Home} />
        <Route path={PATHS.CAUSE.route} component={CausePage}></Route>
        <Route path={PATHS.OUR_MISSION.route} component={OurMission}></Route>
        <Route path={PATHS.CREATE_CAUSE.route} component={CreateCause}></Route>
      </Switch>
    </Suspense>
    <Snackbar />
  </>
);

export default routes;
