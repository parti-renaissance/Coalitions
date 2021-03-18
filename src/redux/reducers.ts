/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.ts, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';

import { reducer as avatar } from './Avatar';
import { reducer as login } from './Login';
import { reducer as cause } from './Cause';
import { reducer as coalition } from './Coalition';
import { reducer as snackbar } from './Snackbar';
import { reducer as user } from './User';
import { RootState } from './types';

export default combineReducers<RootState>({
  login,
  avatar,
  cause,
  coalition,
  snackbar,
  user,
});
