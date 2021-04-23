import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { SendMailForm } from './useValidateSendMailsForm';

const useSendMailsErrorHandler = () => {
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

export const useSendMails = (causeId: string) => {
  const { push } = useHistory();
  const errorHandler = useSendMailsErrorHandler();

  const [{ loading, error }, doSendMails] = useTypedAsyncFn(async (mails: SendMailForm) => {
    console.log('mail', mails);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const sendMails = useCallback(
    async (mails: SendMailForm) => {
      const response = await doSendMails(mails);
      if (response instanceof Error) return;

      push({ pathname: PATHS.CAUSE.url(causeId), search: '?sendMail=true' });
    },
    [causeId, doSendMails, push],
  );

  return { loading, error, sendMails };
};
