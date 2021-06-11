import { Cause, InCreationCause } from '../redux/Cause/types';

const getAuthorName = (cause: InCreationCause | Cause, intl: any, isUserLoggedIn = false) => {
  return cause.author === undefined || cause.author === null
    ? intl.formatMessage({ id: 'cause.anonymous-author' })
    : intl.formatMessage(
        { id: 'cause.author' },
        {
          firstName: cause.author.first_name,
          lastName:
            isUserLoggedIn && cause.author.last_name !== undefined
              ? cause.author.last_name
              : cause.author.last_name_initial,
        },
      );
};

export default getAuthorName;
