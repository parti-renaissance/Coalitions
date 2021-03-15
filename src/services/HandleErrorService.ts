type APIErrorsType = Response | Error;
type DefaultHandlerType = (error?: APIErrorsType) => string;

const ERROR_MESSAGES = {
  default: "Une erreur s'est produite",
  noNetwork: 'Connexion réseau insuffisante',
  unableToJoinServer: 'Le serveur ne répond pas',
  error500: "Une erreur serveur s'est produite",
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
    return defaultHandler(error) || defaultMessage;
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
}
