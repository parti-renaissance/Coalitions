import jwt_decode from 'jwt-decode';
import { getAccessToken } from 'redux/Login';
import { store } from 'redux/store';
import request from 'superagent';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, refresh } from './auth';

const backendBaseUrl = `${process.env.REACT_APP_API_BASE_URL}api/` ?? '';

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
  accessTokenKey = ACCESS_TOKEN_KEY;
  refreshTokenKey = REFRESH_TOKEN_KEY;

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
    return getAccessToken(store.getState());
  }

  /**
   * This function assess the access token is still valid, if not it refreshes it.
   * In case of error during the refresh process it disconnects the user and redirects to the login page.
   */
  async checkToken() {
    const token = this.getToken();

    // There was no token to begin with, nothing to check.
    if (!token) {
      await refresh();
    } else {
      const parsedToken = jwt_decode<AccessToken>(token);
      if (tokenHasExpired(parsedToken)) {
        await refresh();
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
