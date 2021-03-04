import { AvatarState } from './Avatar';
import { LoginState } from './Login';
import { CauseState } from './Cause';
import { CoalitionState } from './Coalition';

export type RootState = Readonly<{
  avatar: AvatarState;
  login: LoginState;
  cause: CauseState;
  coalition: CoalitionState;
}>;
