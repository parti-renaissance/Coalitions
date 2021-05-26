import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCauseFollow } from 'redux/Cause/hooks/useCauseFollow';
import { useEventParticipate } from 'redux/Events/hooks/useEventParticipate';
import { PATHS } from 'routes';
import {
  getAfterAuthFollowCause,
  getAfterAuthRedirectTo,
  cleanAfterAuthAction,
  getAfterAuthParticipateToEvent,
} from '..';

export const useAfterAuthAction = () => {
  const causeToFollow = useSelector(getAfterAuthFollowCause);
  const redirectTo = useSelector(getAfterAuthRedirectTo);
  const eventToParticipate = useSelector(getAfterAuthParticipateToEvent);
  const { followCause } = useCauseFollow(causeToFollow);
  const { participateToEvent } = useEventParticipate(eventToParticipate);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const performAfterAuthAction = useCallback(async () => {
    if (causeToFollow !== '') {
      await followCause();
    }
    if (eventToParticipate !== '') {
      await participateToEvent();
    }
    if (redirectTo !== '') {
      push(redirectTo, { search: '' });
    } else {
      push(PATHS.HOME.url(), { search: '' });
    }
    dispatch(cleanAfterAuthAction);
  }, [
    causeToFollow,
    dispatch,
    followCause,
    push,
    redirectTo,
    eventToParticipate,
    participateToEvent,
  ]);

  return { performAfterAuthAction };
};
