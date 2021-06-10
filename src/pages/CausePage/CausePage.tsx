import { Cached } from '@material-ui/icons';
import React, { useEffect, FunctionComponent, Suspense, useRef } from 'react';
import Loader from 'components/Loader';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFetchOneCause } from 'redux/Cause/hooks/useFetchCauses';
import { getCause } from 'redux/Cause/selectors';
import { isUserLogged } from 'redux/Login';
import { useCauseFollow } from 'redux/Cause/hooks/useCauseFollow';
import CauseDetails from 'components/CauseDetails';
import SuccessModal from 'pages/Home/components/SuccessModal';
import { openCauseSupportModal } from 'redux/Cause';
import EventDetailsModal from 'components/EventDetailsModal';
import { useFeatureToggling } from 'services/useFeatureToggling';
// @ts-ignore
import { createResourceFactory } from 'react-lazy-data';

interface CausePageNavParams {
  causeIdOrSlug: string;
}

const CauseResource = createResourceFactory(async (fetchFnc: any) => fetchFnc());

const CausePage: FunctionComponent<any> = ({ resource }) => {
  console.log('cause page');
  const { causeIdOrSlug } = useParams<CausePageNavParams>();

  const causeRedux = useSelector(getCause(causeIdOrSlug));
  console.log('causeRedux:', causeRedux);
  const causeFetched = resource.read();
  console.log('causeFetched:', causeFetched);
  const cause = causeRedux || causeFetched;

  const dispatch = useDispatch();
  const { loading: loadingCauseFollow, followCause } = useCauseFollow(cause?.uuid);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const { areEventsEnable } = useFeatureToggling();

  const onSupport = () => {
    if (isUserLoggedIn) {
      followCause();
    } else {
      dispatch(openCauseSupportModal(cause !== undefined ? cause : null));
    }
  };

  if (cause === undefined) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Pourunecause.fr - {cause.name}</title>

        <meta property="og:site_name" content="Pour une cause" />
        <meta property="og:title" content={cause.name} />
        <meta property="og:description" content={cause.description} />
        <meta property="og:image" content="https://pourunecause.fr/images/puc.jpg" />
        <meta property="og:url" content="https://pourunecause.fr/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="Pour une cause" />
        <meta
          name="twitter:title"
          content="Faire de nos combats personnels des actions collectives"
        />
        <meta
          name="twitter:description"
          content="Citoyens, collectifs, associations, nous avons tous à coeur d’agir pour construire un monde meilleur. Nous avons tous des idées, des combats, des causes qui nous sont chers."
        />
        <meta name="twitter:image" content="https://pourunecause.fr/images/puc.jpg" />
        <meta name="twitter:url" content="https://pourunecause.fr/" />
      </Helmet>
      <CauseDetails cause={cause} onSupport={onSupport} isSupporting={loadingCauseFollow} />
      <SuccessModal />
      {areEventsEnable ? <EventDetailsModal /> : null}
    </>
  );
};

const CausePageWrapper = () => {
  const { causeIdOrSlug } = useParams<CausePageNavParams>();
  const { loading, fetchCause } = useFetchOneCause(causeIdOrSlug);
  const resourceRef = useRef();
  const resource = resourceRef.current || createResource();

  function createResource() {
    const resource = CauseResource.create(async () => {
      console.log('Before fetch');
      await fetchCause(true);
      console.log('after fetch');
    });
    resourceRef.current = resource;
    return resource;
  }

  console.log('resource:', resource);

  return (
    <Suspense fallback={<Loader fullScreen />}>
      <CausePage resource={resource} />
    </Suspense>
  );
};

export default CausePageWrapper;
