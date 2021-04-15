import React from 'react';
import { Modal } from 'components/Modal/Modal';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'components/Formik/Formik';
import { FullWidthButton } from 'components/Button/Button';
import { Label, Asterisk } from 'components/IconAndLabel/IconAndLabel.style';
import { ModalCheckbox } from 'components/Modal/ModalCheckbox';
import { Title } from 'components/Modal/Modal.style';
import {
  LegalText,
  ValidateButtonContainer,
} from 'components/LoginModal/components/CreateAccountForm/CreateAccountForm.style';
import { Container } from './CGUModal.style';
import { useValidateForm } from './useValidateCGUForm';
import { useSubmitCGU } from './useSubmitCGU';

export interface CGUFormValues {
  cguAgreement?: boolean;
  causeMailAgreement?: boolean;
  coalitionMailAgreement?: boolean;
}

interface CGUModalProps {
  isOpened: boolean;
  onClose: () => void;
}

export const CGUModal: React.FunctionComponent<CGUModalProps> = ({ isOpened, onClose }) => {
  const { validateForm } = useValidateForm();
  const { submitCGU, loading } = useSubmitCGU();

  const onSubmit = (values: CGUFormValues) => {
    submitCGU(values);
    onClose();
  };

  return (
    <Modal isOpened={isOpened} onClose={onClose} shouldDisplayCloseIcon={false}>
      <Container>
        <Title>
          <FormattedMessage id="cgu_modal.title" />
        </Title>
        <Formik<CGUFormValues>
          initialValues={{} as CGUFormValues}
          validate={validateForm}
          onSubmit={onSubmit}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <ModalCheckbox
                handleChange={handleChange}
                value={values.causeMailAgreement}
                name="causeMailAgreement"
                label={
                  <Label>
                    <FormattedMessage id="cgu_modal.accept-cause" />
                  </Label>
                }
              />
              <ModalCheckbox
                handleChange={handleChange}
                value={values.coalitionMailAgreement}
                name="coalitionMailAgreement"
                label={
                  <Label>
                    <FormattedMessage id="cgu_modal.accept-coalition" />
                  </Label>
                }
              />
              <ModalCheckbox
                handleChange={handleChange}
                value={values.cguAgreement}
                name="cguAgreement"
                label={
                  <Label>
                    <FormattedMessage id="cgu_modal.accept-cgu" />
                    <Asterisk>*</Asterisk>
                  </Label>
                }
              />
              <LegalText>
                <FormattedMessage id="cgu_modal.legal-text" />
              </LegalText>
              <ValidateButtonContainer isInPage={false}>
                <FullWidthButton
                  disabled={
                    isSubmitting || Object.keys(errors).length > 0 || values.cguAgreement !== true
                  }
                  type="submit"
                  size="small"
                  variant="contained"
                  color="primary"
                  isLoading={loading}
                >
                  <FormattedMessage id="cgu_modal.confirm" />
                </FullWidthButton>
              </ValidateButtonContainer>
            </form>
          )}
        </Formik>
      </Container>
    </Modal>
  );
};

export default CGUModal;
