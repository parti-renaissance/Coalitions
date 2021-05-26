import { RootState } from 'redux/types';

export const state: RootState = {
  login: {
    accessToken: 'someAccessToken',
    refreshToken: 'someRefreshToken',
    isLogged: false,
    afterAuthAction: { followCause: null, redirectTo: null, participateToEvent: null },
  },
  cause: {
    ids: [],
    causes: {},
    numberOfCauses: null,
    inCreationCause: undefined,
    statistics: null,
    causeSupportModal: null,
  },
  coalition: {
    ids: [],
    coalitions: {},
  },
  snackbar: {
    snackbarConfig: undefined,
  },
  user: {
    currentUser: undefined,
  },
  event: {
    events: {},
    ids: [],
    eventParticipateModal: null,
  },
};
