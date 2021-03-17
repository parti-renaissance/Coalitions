export const state = {
  avatar: {
    userAvatarUrl: 'http://someavatarurl.com',
    username: 'someUsername',
  },
  login: {
    token: 'someToken',
    afterAuthAction: { followCause: null, redirectTo: null },
  },
  cause: {
    ids: [],
    causes: {},
    numberOfCauses: null,
  },
  coalition: {
    ids: [],
    coalitions: {},
  },
  snackbar: {
    snackbarConfig: undefined,
  },
};
