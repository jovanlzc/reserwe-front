import {AuthState, INIT_AUTH_STATE} from '../auth/store/state';
import {EmployeeState, INIT_EMPLOYEE_STATE} from '../employee/store/state';
import {INIT_SERVICE_STATE, ServiceState} from '../service/store/state';

export interface AppState {
  auth: AuthState;
  employee: EmployeeState;
  service: ServiceState;
}

export const INIT_APP_STATE: AppState = {
  auth: INIT_AUTH_STATE,
  employee: INIT_EMPLOYEE_STATE,
  service: INIT_SERVICE_STATE
};

