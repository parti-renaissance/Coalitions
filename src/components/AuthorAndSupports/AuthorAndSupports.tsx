import React, { FunctionComponent } from 'react';
import { Cause, InCreationCause } from 'redux/Cause/types';
import { Container, AuthorContainer } from './AuthorAndSupports.style';
import { useIntl } from 'react-intl';
import IconAndLabel from 'components/IconAndLabel';

interface AuthorAndSupportsProps {
  cause: InCreationCause | Cause;
  showAuthor?: boolean;
  scale?: boolean;
}

const AuthorAndSupports: FunctionComponent<AuthorAndSupportsProps> = ({
  cause,
  showAuthor,
  scale,
}) => {
  const intl = useIntl();
  return (
    <Container>
      {showAuthor === true ? (
        <AuthorContainer>
          <IconAndLabel
            scale={scale}
            iconSrc="/images/user.svg"
            label={intl.formatMessage(
              { id: 'cause.author' },
              {
                firstName: cause.author.first_name,
                lastNameInitial: cause.author.last_name_initial,
              },
            )}
          />
        </AuthorContainer>
      ) : null}
      <AuthorContainer>
        <IconAndLabel
          scale={scale}
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
