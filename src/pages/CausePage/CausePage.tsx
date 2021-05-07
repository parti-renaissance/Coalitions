import React, { useEffect, FunctionComponent } from 'react';
import Loader from 'components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { getCause } from 'redux/Cause/selectors';
import { isUserLogged } from 'redux/Login';
import { useCauseFollow } from 'redux/Cause/hooks/useCauseFollow';
import CauseDetails from 'components/CauseDetails';
import SuccessModal from 'pages/Home/components/SuccessModal';
import { openCauseSupportModal } from 'redux/Cause';

interface CausePageNavParams {
  causeIdOrSlug: string;
}

const CausePage: FunctionComponent = () => {
  const { causeIdOrSlug } = useParams<CausePageNavParams>();
  const { loading, fetchCause } = useFetchOneCause(causeIdOrSlug);
  const cause = useSelector(getCause(causeIdOrSlug));
  const dispatch = useDispatch();
  const { loading: loadingCauseFollow, followCause } = useCauseFollow(cause?.uuid);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));

  useEffect(() => {
    fetchCause(true);
  }, [fetchCause]);

  const onSupport = () => {
    if (isUserLoggedIn) {
      followCause();
    } else {
      dispatch(openCauseSupportModal(cause !== undefined ? cause : null));
    }
  };

  if (loading && cause === undefined) {
    return <Loader fullScreen />;
  }

  if (cause === undefined) {
    return null;
  }

  return (
    <>
      <CauseDetails cause={cause} onSupport={onSupport} isSupporting={loadingCauseFollow} />
      <SuccessModal />
    </>
  );
};

export default CausePage;
