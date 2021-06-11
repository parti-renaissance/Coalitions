import React, { FunctionComponent, Suspense, useEffect, useRef } from 'react';
import Loader from 'components/Loader';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
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
import { createResourceFactory } from 'react-lazy-data';
import getAuthorName from '../../services/getAuthorName';

interface CausePageNavParams {
  causeIdOrSlug: string;
}

const CauseResource = createResourceFactory(async (fetchFnc: any) => fetchFnc());

const CausePage: FunctionComponent<any> = ({ resource }) => {
  const { causeIdOrSlug } = useParams<CausePageNavParams>();
  const intl = useIntl();

  const causeRedux = useSelector(getCause(causeIdOrSlug));
  const causeFetched = resource.read();
  const cause = causeRedux || causeFetched;

  const dispatch = useDispatch();
  const { loading: loadingCauseFollow, followCause } = useCauseFollow(cause?.uuid);
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const { areEventsEnable } = useFeatureToggling();

  const onSupport = () => {
    if (isUserLoggedIn) {
      followCause();
    } else {
      openModalSupport();
    }
  };

  useEffect(() => {
    // Auto open the modal to support this cause if there is a specific hash in the url
    if (typeof window !== 'undefined' && window.location.hash === '#soutenir') openModalSupport();
  }, [cause]);

  const openModalSupport = () =>
    dispatch(openCauseSupportModal(cause !== undefined ? cause : null));

  if (cause === undefined) {
    return null;
  }

  const url = `https://pourunecause.fr/cause/${cause.slug}`;
  const authorName = getAuthorName(cause, intl);

  const description = `Rejoingnez le combat de ${authorName} ! ${
    cause.followers_count
  } soutiens l'ont déjà fait • ${cause.description.substr(0, 254)}...`;

  return (
    <>
      <Helmet>
        <title>Pourunecause.fr - {cause.name}</title>

        <meta property="og:site_name" content="Pour une cause" />
        <meta property="og:title" content={cause.name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={cause.image_url.replace('https', 'http')} />
        <meta property="og:image:secure_url" content={cause.image_url} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content={'1200'} />
        <meta property="og:image:height" content={'675'} />
        <meta property="og:url" content={url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@enmarchefr" />
        <meta name="twitter:title" content={cause.name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={cause.image_url} />
        <meta name="twitter:url" content={url} />
      </Helmet>
      <CauseDetails cause={cause} onSupport={onSupport} isSupporting={loadingCauseFollow} />
      <SuccessModal />
      {areEventsEnable ? <EventDetailsModal /> : null}
    </>
  );
};

const CausePageWrapper = () => {
  const { causeIdOrSlug } = useParams<CausePageNavParams>();
  const { fetchCause } = useFetchOneCause(causeIdOrSlug);
  const resourceRef = useRef();
  const resource = resourceRef.current || createResource();

  function createResource() {
    const resource = CauseResource.create(async () => {
      await fetchCause(true);
    });
    resourceRef.current = resource;
    return resource;
  }

  return (
    <Suspense fallback={<Loader fullScreen />}>
      <CausePage resource={resource} />
    </Suspense>
  );
};

export default CausePageWrapper;
