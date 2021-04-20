import React, { useEffect, useState, FunctionComponent } from 'react';
import Loader from 'components/Loader';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { getCause } from 'redux/Cause/selectors';
import { isUserLogged } from 'redux/Login';
import LoginAndSupportModal from 'components/LoginAndSupportModal';
import { useCauseFollow } from 'redux/Cause/hooks/useCauseFollow';
import { PATHS } from 'routes';
import CauseDetails from 'components/CauseDetails';

interface CoalitionNavParams {
  coalitionId: string;
}

const Coalition: FunctionComponent = () => {
  const { coalitionId } = useParams<CoalitionNavParams>();

  console.log({ coalitionId });

  return <div />;
};

export default Coalition;
