import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useCauseFollow } from "redux/Cause/hooks/useCauseFollow";
import { PATHS } from "routes";
import { getAfterAuthFollowCause, getAfterAuthRedirectTo, cleanAfterAuthAction } from "..";

export const useAfterAuthAction = () => {
  const causeToFollow = useSelector(getAfterAuthFollowCause);
  const redirectTo = useSelector(getAfterAuthRedirectTo);
  const { followCause } = useCauseFollow(causeToFollow);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const performAfterAuthAction = useCallback(async () => {
    if (redirectTo !== '') {
      push(redirectTo, { search: '' });
    } else {
      push(PATHS.HOME.url(), { search: '' });
    }
    if (causeToFollow !== '') {
      await followCause();
    }
    dispatch(cleanAfterAuthAction);
  }, [causeToFollow, dispatch, followCause, push, redirectTo]);

  return { performAfterAuthAction };
};
