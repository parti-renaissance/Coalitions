import useSelector from 'redux/useSelector';
import { getCurrentUser } from 'redux/User/selectors';
import { Cause, InCreationCause } from 'redux/Cause/types';

export const useCauseOwner = (cause: Cause | InCreationCause) => {
  const currentUser = useSelector(getCurrentUser);

  if (currentUser === undefined || cause.author === undefined || cause.author === null) {
    return false;
  }

  return currentUser.uuid === cause.author.uuid;
};
