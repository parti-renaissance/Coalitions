import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
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

  const [{ loading, error }, doPostMails] = useTypedAsyncFn(async (mails: SendMailForm) => {
    console.log('mail', mails);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'mailId';
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const postMails = useCallback(
    async (mails: SendMailForm) => {
      const response = await doPostMails(mails);
      if (response instanceof Error) return;

      return response;
    },
    [doPostMails],
  );

  return { loading, error, postMails };
};
