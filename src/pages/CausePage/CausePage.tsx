import Loader from 'components/Loader';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { getCause } from 'redux/Cause/selectors';
import { isUserLogged } from 'redux/Login';
import LoginAndSupportModal from 'components/LoginAndSupportModal';
import { useCauseFollow } from 'redux/Cause/hooks/useCauseFollow';
import { PATHS } from 'routes';
import CauseDetails from 'components/CauseDetails';

interface CausePageNavParams {
  causeId: string;
}

const CausePage: React.FunctionComponent = () => {
  const { causeId } = useParams<CausePageNavParams>();
  const { loading, fetchCause } = useFetchOneCause(causeId);
  const cause = useSelector(getCause(causeId));
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const { loading: loadingCauseFollow, followCause } = useCauseFollow(causeId);
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
        redirectToAfterAuth={PATHS.CAUSE.url(cause.uuid)}
      />
    </>
  );
};

export default CausePage;
