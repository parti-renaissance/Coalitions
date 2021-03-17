import request from 'superagent';

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

const oauthBaseUrl = process.env.REACT_APP_OAUTH_URL;
const oauthClientId = process.env.REACT_APP_OAUTH_CLIENT_ID;
export const oauthUrl = `${oauthBaseUrl}?response_type=code&client_id=${oauthClientId}`;

type oauthPayload = {
  client_id?: string;
  code?: string;
  refresh_token?: string;
  grant_type: string;
};

const authCall = async (payload: oauthPayload) => {
  const result = await request
    .agent()
    .post(`${process.env.REACT_APP_API_BASE_URL}oauth/v2/token`)
    .set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
    .send(payload);
  const access_token: string | undefined = result.body.access_token;
  if (access_token !== undefined) localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
  const refresh_token: string | undefined = result.body.refresh_token;
  if (refresh_token !== undefined) localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
  return access_token;
};

export const login = async (code: string) => {
  const payload = {
    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
    code,
    grant_type: 'authorization_code',
  };
  return authCall(payload);
};

export const refresh = async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (refreshToken === null) return;
  const payload = {
    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };
  return authCall(payload);
};
