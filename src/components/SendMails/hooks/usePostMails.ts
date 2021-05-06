import { convertToHTML } from 'draft-convert';
import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { authenticatedApiClient } from 'services/networking/client';
import { mailFormatting } from './format';
import { SendMailForm } from './useValidateSendMailsForm';

const usePostMailsErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, 'Access Denied')) {
        return formatMessage({ id: 'errors.cannot-send-mail-for-this-cause' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const usePostMails = (causeId: string) => {
  const errorHandler = usePostMailsErrorHandler();

  const [{ loading, error }, doPostMails] = useTypedAsyncFn(async (mail: SendMailForm) => {
    const postedMail = await authenticatedApiClient.post('v3/adherent_messages', {
      type: 'coalitions',
      label: `Pourunecause: ${mail.object}`,
      subject: mail.object,
      content: convertToHTML(mailFormatting)(mail.body.getCurrentContent()),
    });
    await authenticatedApiClient.put(`v3/adherent_messages/${postedMail.uuid}/filter`, {
      cause: causeId,
    });
    return postedMail.uuid;
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const postMails = useCallback(
    async (mail: SendMailForm) => {
      const response = await doPostMails(mail);
      if (response instanceof Error) return;

      return response;
    },
    [doPostMails],
  );

  return { loading, error, postMails };
};
