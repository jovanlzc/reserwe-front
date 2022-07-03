import {AuthState, INIT_AUTH_STATE} from '../auth/store/state';

export interface AppState {
  auth: AuthState;
}

export const INIT_APP_STATE: AppState = {
  auth: INIT_AUTH_STATE
};

