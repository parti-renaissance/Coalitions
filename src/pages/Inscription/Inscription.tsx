import React from 'react';
import CreateAccountForm from 'components/LoginModal/components/CreateAccountForm';
import { useIntl } from 'react-intl';
import { Container } from './Inscription.style';
import { useHistory } from 'react-router';
import { PATHS } from 'routes';

export const Inscription: React.FunctionComponent = () => {
  const intl = useIntl();
  const history = useHistory();

  const doAfterAccountCreation = () => {
    return Promise.resolve(
      history.push({ pathname: PATHS.HOME.url(), search: '?didCreateAccount=true' }),
    );
  };

  return (
    <Container>
      <CreateAccountForm
        isInPage
        doAfterAccountCreation={doAfterAccountCreation}
        title={intl.formatMessage({ id: 'inscription.title' })}
        legalTextKey="inscription.legal-text"
      />
    </Container>
  );
};

export default Inscription;
