import { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useTypedAsyncFn } from 'redux/useTypedAsyncFn';
import HandleErrorService, { APIErrorsType, doesErrorIncludes } from 'services/HandleErrorService';

const useSyncMailsErrorHandler = () => {
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

export const useSyncMails = () => {
  const errorHandler = useSyncMailsErrorHandler();
  const [recipients, setRecipients] = useState<number | null>(null);

  const [{ error }, doSyncMails] = useTypedAsyncFn(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return 12;
  }, []);

  useEffect(() => {
    if (error !== undefined) {
      HandleErrorService.showErrorSnackbar(error, errorHandler);
    }
  }, [error, errorHandler]);

  const syncMails = useCallback(
    async (mailId: string) => {
      console.log('mailId', mailId);
      const response = await doSyncMails();
      if (response instanceof Error) return;

      setRecipients(response);
    },
    [doSyncMails],
  );

  return { recipients, error, syncMails };
};
