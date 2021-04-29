import React, { FunctionComponent } from 'react';
import { LoaderContainer } from './Loader.style';
import { CircularProgress } from '@material-ui/core';

interface LoaderProps {
  fullScreen?: boolean;
}

const Loader: FunctionComponent<LoaderProps> = ({ fullScreen }) => (
  <LoaderContainer fullScreen={fullScreen}>
    <CircularProgress color="primary" size={32} />
  </LoaderContainer>
);

export default Loader;
