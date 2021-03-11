import React, { FunctionComponent } from 'react';
import { Cause as CauseType } from 'redux/Cause/types';
import { Container, AuthorContainer } from './AuthorAndSupports.style';
import { FormattedMessage } from 'react-intl';
import IconAndLabel from 'components/IconAndLabel';

interface AuthorAndSupportsProps {
  cause: CauseType;
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
        Label={() => (
          <FormattedMessage
            id="cause.supports"
            values={{
              supportsNumber: 17038,
            }}
          />
        )}
      />
    </AuthorContainer>
  </Container>
);

export default AuthorAndSupports;
