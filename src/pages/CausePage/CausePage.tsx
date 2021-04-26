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
import SuccessModal from 'pages/Home/components/SuccessModal';

interface CausePageNavParams {
  causeIdOrSlug: string;
}

const CausePage: FunctionComponent = () => {
  const { causeIdOrSlug } = useParams<CausePageNavParams>();
  const { loading, fetchCause } = useFetchOneCause(causeIdOrSlug);
  const cause = useSelector(getCause(causeIdOrSlug));
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { loading: loadingCauseFollow, followCause } = useCauseFollow(cause?.uuid);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));

  useEffect(() => {
    fetchCause(true);
  }, [fetchCause]);

  const onSupport = () => {
    if (isUserLoggedIn) {
      followCause();
    } else {
      setIsModalOpened(true);
    }
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  if (loading && cause === undefined) {
    return <Loader />;
  }

  if (cause === undefined) {
    return null;
  }

  return (
    <>
      <CauseDetails cause={cause} onSupport={onSupport} isSupporting={loadingCauseFollow} />
      <LoginAndSupportModal
        isOpened={isModalOpened}
        onClose={closeModal}
        cause={cause}
        redirectToAfterAuth={PATHS.CAUSE.url(cause.slug)}
      />
      <SuccessModal />
    </>
  );
};

export default CausePage;
