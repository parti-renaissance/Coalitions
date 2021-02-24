import * as React from 'react';
import { HomeContainer } from './Home.style';
import CauseList from '../CauseList';

const Home: React.FunctionComponent = () => (
  <HomeContainer>
    <CauseList />
  </HomeContainer>
);

export default Home;
