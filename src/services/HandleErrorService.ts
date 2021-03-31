import { store } from 'redux/store';
import { updateSnackbar } from 'redux/Snackbar';
import { Severity } from 'redux/Snackbar/types';
import debounce from 'lodash/debounce';

export type APIErrorsType = Response | Error;
type DefaultHandlerType = (error?: APIErrorsType) => string | null;

const ERROR_MESSAGES = {
  default: "Une erreur s'est produite. Merci de réessayer plus tard.",
  noNetwork: 'Votre connexion réseau est insuffisante.',
  unableToJoinServer: 'Le serveur ne répond pas. Merci de réessayer plus tard.',
  error500: "Une erreur serveur s'est produite. Merci de réessayer plus tard.",
};

export default class HandleErrorService {
  static isNoNetworkError(error: Error): boolean {
    return error.message.includes('the network is offline');
  }

  static isNoBackConnectionError(error: Response): boolean {
    return !error.status;
  }

  static sendDefault(error?: APIErrorsType, defaultHandler?: DefaultHandlerType) {
    const defaultMessage = ERROR_MESSAGES.default;
    if (!defaultHandler) {
      return defaultMessage;
    }
    const errorMessage = defaultHandler(error);
    return errorMessage !== null ? errorMessage : defaultMessage;
  }

  static getErrorMessage(error?: APIErrorsType, defaultHandler?: DefaultHandlerType) {
    if (!error) {
      return HandleErrorService.sendDefault(error, defaultHandler);
    }

    if (error instanceof Error && HandleErrorService.isNoNetworkError(error)) {
      return ERROR_MESSAGES.noNetwork;
    } else if (error instanceof Response && HandleErrorService.isNoBackConnectionError(error)) {
      return ERROR_MESSAGES.unableToJoinServer;
    } else if (error instanceof Response && error.status >= 500) {
      return ERROR_MESSAGES.error500;
    }

    return HandleErrorService.sendDefault(error, defaultHandler);
  }

  static showErrorSnackbarBounced(error?: APIErrorsType, defaultHandler?: DefaultHandlerType) {
    store.dispatch(
      updateSnackbar({
        message: HandleErrorService.getErrorMessage(error, defaultHandler),
        severity: Severity.error,
      }),
    );
  }

  static showErrorSnackbar = debounce(HandleErrorService.showErrorSnackbarBounced, 2000);
}
