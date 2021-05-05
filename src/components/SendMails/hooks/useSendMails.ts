import { useCallback, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import { PATHS } from 'routes';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { authenticatedApiClient } from 'services/networking/client';

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
  const errorHandler = useSendMailsErrorHandler();
  const { push } = useHistory();

  const [{ loading, error }, doSendMails] = useTypedAsyncFn(async (mailId: string) => {
    await authenticatedApiClient.post(`v3/adherent_messages/${mailId}/send`, {});
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const sendMails = useCallback(
    async (mailId: string) => {
      const response = await doSendMails(mailId);
      if (response instanceof Error) return;

      push({ pathname: PATHS.CAUSE.url(causeId), search: '?sendMail=true' });
    },
    [causeId, doSendMails, push],
  );

  return { loading, error, sendMails };
};
