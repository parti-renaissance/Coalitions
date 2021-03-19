export const state = {
  avatar: {
    userAvatarUrl: 'http://someavatarurl.com',
    username: 'someUsername',
  },
  login: {
    accessToken: 'someAccessToken',
    refreshToken: 'someRefreshToken',
    isLogged: false,
    afterAuthAction: { followCause: null, redirectTo: null },
  },
  cause: {
    ids: [],
    causes: {},
    numberOfCauses: null,
    inCreationCause: undefined,
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
};
