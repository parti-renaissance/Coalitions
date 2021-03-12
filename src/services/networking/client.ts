import jwt_decode from 'jwt-decode';
import request from 'superagent';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const backendBaseUrl = `${process.env.REACT_APP_API_BASE_URL}api/` ?? '';

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
  const refreshToken = localStorage.get(REFRESH_TOKEN_KEY);
  const payload = {
    client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  };
  return authCall(payload);
};

interface AccessToken {
  exp: number;
}

function tokenHasExpired(token: AccessToken): boolean {
  if (!token.exp) return true;

  // Less than 10 seconds remaining => token has expired
  const now = new Date().getTime() / 1000;
  return token.exp - now < 10;
}

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

class Client {
  baseUrl: string;
  withCredentials: boolean;
  agent: request.SuperAgentStatic & request.Request;
  tokenKey = ACCESS_TOKEN_KEY;

  constructor(baseUrl: string, withCredentials = true) {
    this.baseUrl = baseUrl;
    this.withCredentials = withCredentials;
    this.agent = request.agent();
    this.agent.accept('application/json');
    if (withCredentials) {
      this.agent.withCredentials();
    }
  }

  async request(method: Method, endpoint: string, data: object | null = null, checkToken = true) {
    if (this.withCredentials) {
      // Checking token validity, refreshing it if necessary.
      if (checkToken) await this.checkToken();
    }

    const url = /^https?:\/\//.test(endpoint) ? endpoint : `${this.baseUrl}${endpoint}`;
    let promise = this.agent[method](url);

    const token = this.getToken();
    if (token && this.withCredentials) {
      promise = promise.set('Authorization', `Bearer ${token}`);
    }

    if (['post', 'put', 'patch'].includes(method) && data) {
      promise = promise.send(data);
    }

    const { body } = await promise;
    return body;
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  updateToken(token: string) {
    return localStorage.setItem(this.tokenKey, token);
  }

  /**
   * This function assess the access token is still valid, if not it refreshes it.
   * In case of error during the refresh process it disconnects the user and redirects to the login page.
   */
  async checkToken() {
    const token = this.getToken();

    // There was no token to begin with, nothing to check.
    if (!token) return;

    const parsedToken = jwt_decode<AccessToken>(token);
    if (tokenHasExpired(parsedToken)) {
      try {
        await refresh();
      } catch (e) {
        // Token was invalid, logging out the user.
        this.updateToken('');
        // LOGOUT
      }
    }
  }

  get(endpoint: string) {
    return this.request('get', endpoint);
  }

  post(endpoint: string, data: object | null) {
    return this.request('post', endpoint, data);
  }

  put(endpoint: string, data: object | null) {
    return this.request('put', endpoint, data);
  }
}

const client = new Client(backendBaseUrl);
export const githubApiClient = new Client('https://api.github.com', false);
export const coalitionApiClient = new Client(backendBaseUrl, false);
export const authenticatedApiClient = new Client(backendBaseUrl, true);

export default client;
