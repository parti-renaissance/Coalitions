import React from 'react';
import { oauthUrl } from 'services/networking/auth';
import { Title } from 'components/Modal/Modal.style';
import CreateAccountForm from 'components/LoginModal/components/CreateAccountForm';
import { FormattedMessage } from 'react-intl';
import { InscriptionContainer, InscriptionFormWrapper } from './Inscription.style';
import { Connect, ConnectLink } from 'components/LoginModal/LoginModal.style';

export const Inscription: React.FunctionComponent = () => {
  return (
    <InscriptionContainer>
      <InscriptionFormWrapper>
        <Title>
          <FormattedMessage id="inscription.title" />
        </Title>
        <Connect>
          <p>
            <FormattedMessage id="login_modal.signed-up" />
          </p>
          <ConnectLink href={oauthUrl}>
            <FormattedMessage id="login_modal.connect" />
          </ConnectLink>
        </Connect>
        <CreateAccountForm />
      </InscriptionFormWrapper>
    </InscriptionContainer>
  );
};

export default Inscription;
