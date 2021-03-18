import React, { FunctionComponent } from 'react';
import { Cause, InCreationCause } from 'redux/Cause/types';
import { Container, AuthorContainer } from './AuthorAndSupports.style';
import { FormattedMessage } from 'react-intl';
import IconAndLabel from 'components/IconAndLabel';

interface AuthorAndSupportsProps {
  cause: InCreationCause | Cause;
  showAuthor?: boolean;
}

const AuthorAndSupports: FunctionComponent<AuthorAndSupportsProps> = ({ cause, showAuthor }) => (
  <Container>
    {showAuthor === true ? (
      <AuthorContainer>
        <IconAndLabel
          iconSrc="/images/user.svg"
          Label={() => (
            <FormattedMessage
              id="cause.author"
              values={{
                firstName: cause.author.first_name,
                lastNameInitial: cause.author.last_name_initial,
              }}
            />
          )}
        />
      </AuthorContainer>
    ) : null}
    <AuthorContainer>
      <IconAndLabel
        iconSrc="/images/supports.svg"
        Label={() =>
          cause.followers_count > 1 ? (
            <FormattedMessage
              id="cause.supports"
              values={{
                supportsNumber: cause.followers_count,
              }}
            />
          ) : (
            <FormattedMessage
              id="cause.support"
              values={{
                supportsNumber: cause.followers_count,
              }}
            />
          )
        }
      />
    </AuthorContainer>
  </Container>
);

export default AuthorAndSupports;
