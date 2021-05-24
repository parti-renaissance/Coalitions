import { LoginState } from './Login';
import { CauseState } from './Cause';
import { CoalitionState } from './Coalition';
import { SnackbarState } from './Snackbar';
import { UserState } from './User';
import { EventState } from './Events';

export type RootState = Readonly<{
  login: LoginState;
  cause: CauseState;
  coalition: CoalitionState;
  snackbar: SnackbarState;
  user: UserState;
  event: EventState;
}>;
