import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';
import { authenticatedApiClient } from 'services/networking/client';

type MailSyncResponse = {
  label: string;
  recipient_count: number;
  status: string;
  subject: string;
  synchronized: boolean;
};

const useSyncMailsErrorHandler = () => {
  const { formatMessage } = useIntl();

  return useCallback(
    (error?: APIErrorsType) => {
      if (error instanceof Response || error === undefined || error.message === undefined) {
        return null;
      }
      if (doesErrorIncludes(error, 'Exceeded max attempts')) {
        return formatMessage({ id: 'errors.sync-mail-exceeded-max-attempts' });
      }
      if (doesErrorIncludes(error, 'No recipients')) {
        return formatMessage({ id: 'errors.sync-mail-no-recipients' });
      }
      if (doesErrorIncludes(error, 'Access Denied')) {
        return formatMessage({ id: 'errors.cannot-send-mail-for-this-cause' });
      }
      return null;
    },
    [formatMessage],
  );
};

export const useSyncMails = () => {
  const errorHandler = useSyncMailsErrorHandler();
  const [recipients, setRecipients] = useState<number | null>(null);

  const [{ error }, doSyncMails] = useTypedAsyncFn(async (mailId: string) => {
    let attempts = 0;

    const executePoll = async (
      resolve: (value: { synchronized?: boolean }) => void,
      reject: (reason?: Error) => void,
    ) => {
      const result: MailSyncResponse = await authenticatedApiClient.get(
        `v3/adherent_messages/${mailId}`,
      );
      attempts++;

      if (result.synchronized !== undefined && result.synchronized) {
        if (result.recipient_count === 0) {
          return reject(new Error('No recipients'));
        }
        return resolve(result);
      } else if (attempts === 10) {
        return reject(new Error('Exceeded max attempts'));
      } else {
        setTimeout(executePoll, 3000, resolve, reject);
      }
    };
    return new Promise(executePoll);
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const syncMails = useCallback(
    async (mailId: string) => {
      const response = await doSyncMails(mailId);
      if (response instanceof Error) return;

      setRecipients(response?.recipient_count);
    },
    [doSyncMails],
  );

  return { recipients, error, syncMails };
};
