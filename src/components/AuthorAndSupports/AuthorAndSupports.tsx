import React, { FunctionComponent } from 'react';
import { Cause, InCreationCause } from 'redux/Cause/types';
import { Container, AuthorContainer } from './AuthorAndSupports.style';
import { useIntl } from 'react-intl';
import IconAndLabel from 'components/IconAndLabel';
import useSelector from 'redux/useSelector';
import { isUserLogged } from 'redux/Login';

interface AuthorAndSupportsProps {
  cause: InCreationCause | Cause;
  showAuthor?: boolean;
}

const AuthorAndSupports: FunctionComponent<AuthorAndSupportsProps> = ({ cause, showAuthor }) => {
  const isUserLoggedIn = Boolean(useSelector(isUserLogged));
  const intl = useIntl();

  if (cause.author === undefined || cause.author === null) {
    return null;
  }

  return (
    <Container>
      {showAuthor === true ? (
        <AuthorContainer>
          <IconAndLabel
            iconSrc="/images/user.svg"
            label={intl.formatMessage(
              { id: 'cause.author' },
              {
                firstName: cause.author.first_name,
                lastName:
                  isUserLoggedIn && cause.author.last_name !== undefined
                    ? cause.author.last_name
                    : cause.author.last_name_initial,
              },
            )}
          />
        </AuthorContainer>
      ) : null}
      <AuthorContainer>
        <IconAndLabel
          iconSrc="/images/supports.svg"
          label={
            cause.followers_count > 1
              ? intl.formatMessage(
                  { id: 'cause.supports' },
                  {
                    supportsNumber: cause.followers_count,
                  },
                )
              : intl.formatMessage(
                  { id: 'cause.support' },
                  {
                    supportsNumber: cause.followers_count,
                  },
                )
          }
        />
      </AuthorContainer>
    </Container>
  );
};
export default AuthorAndSupports;
