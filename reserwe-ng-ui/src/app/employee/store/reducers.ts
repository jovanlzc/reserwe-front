import {createReducer, on} from '@ngrx/store';
import {EmployeeState, INIT_EMPLOYEE_STATE} from '../../employee/store/state';
import {
  addEmployeeCategorySuccess,
  EmployeeActions,
  searchEmployeeCategoriesSuccess, searchEmployeesSuccess, searchUsersSuccess
} from '../../employee/store/actions';

const reducer = createReducer(
  INIT_EMPLOYEE_STATE,
  on(addEmployeeCategorySuccess, (state, {employeeCategory}) => ({
    ...state,
    selectedEmployeeCategory: employeeCategory,
  })),
  on(searchEmployeeCategoriesSuccess, (state, {searchResponse}) => ({
    ...state,
    employeeCategories: searchResponse,
  })),
  on(searchEmployeesSuccess, (state, {searchResponse}) => ({
    ...state,
    employees: searchResponse,
  })),
  on(searchUsersSuccess, (state, {searchResponse}) => ({
    ...state,
    users: searchResponse,
  })),
);

export function employeeReducers(state: EmployeeState | undefined, action: EmployeeActions): EmployeeState {
  return reducer(state, action);
}
