import Formik from 'components/Formik';
import InputField from 'components/InputField';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import React, { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SendMailsDescription, SendMailsTitle } from './SendMails.style';

type SendMailsProps = {
  causeId: string;
};

type SendMailForm = {
  object: string;
  body: string;
};

export const SendMails: FunctionComponent<SendMailsProps> = () => {
  const { formatMessage } = useIntl();
  const onSubmit = (values: SendMailForm) => {
    console.log('values', values);
  };
  return (
    <>
      <SendMailsTitle>
        <FormattedMessage id="send_mails.title" />
      </SendMailsTitle>
      <SendMailsDescription>
        <FormattedMessage id="send_mails.description" />
      </SendMailsDescription>
      <Formik<SendMailForm> initialValues={{} as SendMailForm} onSubmit={onSubmit}>
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
              />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputField
                placeholder={formatMessage({
                  id: 'send_mails.body',
                })}
                required
                type="text"
                name="description"
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
          </form>
        )}
      </Formik>
    </>
  );
};
