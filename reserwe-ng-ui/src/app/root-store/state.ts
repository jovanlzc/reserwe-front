import {AuthState, INIT_AUTH_STATE} from '../auth/store/state';
import {EmployeeState, INIT_EMPLOYEE_STATE} from '../employee/store/state';

export interface AppState {
  auth: AuthState;
  employee: EmployeeState
}

export const INIT_APP_STATE: AppState = {
  auth: INIT_AUTH_STATE,
  employee: INIT_EMPLOYEE_STATE
};

