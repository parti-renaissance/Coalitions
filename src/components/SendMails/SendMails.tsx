import Formik from 'components/Formik';
import InputField from 'components/InputField';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSendMails } from './hooks/useSendMails';
import { useValidateSendMailsForm, SendMailForm } from './hooks/useValidateSendMailsForm';
import { SendMailsDescription, SendMailsTitle, ValidateButton } from './SendMails.style';

type SendMailsProps = {
  causeId: string;
};

export const SendMails: FunctionComponent<SendMailsProps> = ({ causeId }) => {
  const { formatMessage } = useIntl();
  const { validateForm } = useValidateSendMailsForm();
  const { loading, sendMails } = useSendMails(causeId);
  return (
    <>
      <SendMailsTitle>
        <FormattedMessage id="send_mails.title" />
      </SendMailsTitle>
      <SendMailsDescription>
        <FormattedMessage id="send_mails.description" />
      </SendMailsDescription>
      <Formik<SendMailForm>
        initialValues={{} as SendMailForm}
        onSubmit={sendMails}
        validate={validateForm}
        validateOnMount
      >
        {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <InputFieldWrapper>
              <InputField
                placeholder={formatMessage({
                  id: 'send_mails.object',
                })}
                required
                type="text"
                name="object"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.object}
                error={touched.object === true && errors.object !== undefined}
                helperText={touched.object === true ? errors.object : undefined}
                inputProps={{ maxLength: 255 }}
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                placeholder={formatMessage({
                  id: 'send_mails.body',
                })}
                required
                type="text"
                name="body"
                multiline
                rows={10}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.body}
                error={touched.body === true && errors.body !== undefined}
                helperText={touched.body === true ? errors.body : undefined}
                inputProps={{ maxLength: 6000 }}
              />
            </InputFieldWrapper>
            <ValidateButton
              disabled={loading || Object.keys(errors).length > 0}
              type="submit"
              size="small"
              variant="contained"
              color="primary"
              isLoading={loading}
            >
              <FormattedMessage id="send_mails.validate" />
            </ValidateButton>
          </form>
        )}
      </Formik>
    </>
  );
};
