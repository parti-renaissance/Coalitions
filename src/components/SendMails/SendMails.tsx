import React, { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Formik from 'components/Formik';
import InputField from 'components/InputField';
import { InputFieldWrapper } from 'components/InputField/InputField.style';
import { SyncModal } from './components/SyncModal/SyncModal';
import { usePostMails } from './hooks/usePostMails';
import { useValidateSendMailsForm, SendMailForm } from './hooks/useValidateSendMailsForm';
import {
  SendMailsDescription,
  SendMailsTitle,
  ValidateButton,
  EditorContainer,
} from './SendMails.style';
import { fontFamily, lineHeight, fontSize } from 'stylesheet';

type SendMailsProps = {
  causeId: string;
};

export const SendMails: FunctionComponent<SendMailsProps> = ({ causeId }) => {
  const { formatMessage } = useIntl();
  const { validateForm } = useValidateSendMailsForm();
  const { loading, error, postMails } = usePostMails(causeId);
  const [openSyncModal, setOpenSyncModal] = useState(false);
  const [mailId, setMailId] = useState<string | undefined>(undefined);

  const onSubmit = async (values: SendMailForm) => {
    const response = await postMails(values);
    setMailId(response);
    setOpenSyncModal(true);
  };
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

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
        onSubmit={onSubmit}
        validate={validateForm}
        validateOnMount
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          errors,
          setFieldTouched,
          setFieldValue,
        }) => (
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

            <EditorContainer>
              <Editor
                editorState={editorState}
                onEditorStateChange={(state: EditorState) => {
                  setEditorState(state);
                  setFieldTouched('body');
                  setFieldValue('body', state);
                }}
                editorStyle={{
                  fontFamily: fontFamily.primary,
                  lineHeight: lineHeight.primary,
                  fontSize: fontSize.input.desktop,
                  padding: '13.5px 14px 18.5px',
                  ...(touched.body === true && errors.body !== undefined
                    ? { border: '1px solid red', borderRadius: '4px' }
                    : {}),
                }}
                toolbar={{
                  options: ['inline', 'textAlign', 'list', 'link', 'image'],
                  inline: { options: ['bold', 'italic', 'underline'] },
                }}
                placeholder={formatMessage({
                  id: 'send_mails.body',
                })}
              />
              {touched.body === true && errors.body && <p className={'errors'}>{errors.body}</p>}
            </EditorContainer>

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
      <SyncModal
        isOpened={openSyncModal && error === undefined}
        onClose={() => setOpenSyncModal(false)}
        mailId={mailId}
        causeId={causeId}
      />
    </>
  );
};
