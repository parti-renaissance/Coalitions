import { AvatarState } from './Avatar';
import { LoginState } from './Login';
import { CauseState } from './Cause';

export type RootState = Readonly<{
  avatar: AvatarState;
  login: LoginState;
  cause: CauseState;
}>;
