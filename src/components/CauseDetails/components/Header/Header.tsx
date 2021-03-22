import React, { FunctionComponent } from 'react';
import {
  Container,
  CoalitionName,
  AuthorAndSupportsWrapper,
  CauseName,
  ButtonsContainer,
  Button,
} from './Header.style';
import { useIntl } from 'react-intl';
import AuthorAndSupports from 'components/AuthorAndSupports';
import { InCreationCause, Cause } from 'redux/Cause/types';
import { useHistory } from 'react-router';

interface HeaderProps {
  cause: Cause | InCreationCause;
  onSupport?: () => void;
  isSupporting?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ cause, onSupport, isSupporting }) => {
  const isPreview = Boolean(!onSupport);
  const isSupported = Boolean(cause.supported);
  const intl = useIntl();
  const history = useHistory();

  const onUpdateInCreationCause = () => {
    history.goBack();
  };

  const onPublishInCreationCause = () => {
    // TODO
  };

  return (
    <>
      <Container>
        <div>
          <CoalitionName>{cause.coalition.name}</CoalitionName>
          <CauseName>{cause.name}</CauseName>
          <AuthorAndSupportsWrapper>
            <AuthorAndSupports cause={cause} showAuthor />
          </AuthorAndSupportsWrapper>
        </div>
        {isPreview || !isSupported ? (
          <ButtonsContainer>
            {isPreview ? (
              <>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={onUpdateInCreationCause}
                >
                  {intl.formatMessage({ id: 'cause_preview.update' })}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={onPublishInCreationCause}
                >
                  {intl.formatMessage({ id: 'cause_preview.publish' })}
                </Button>
              </>
            ) : (
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={onSupport}
                isLoading={isSupporting}
              >
                {intl.formatMessage({ id: 'cause.support-button' })}
              </Button>
            )}
          </ButtonsContainer>
        ) : null}
      </Container>
    </>
  );
};

export default Header;
