import {createAction, props, union} from '@ngrx/store';
import {EEmployeeActions} from '../constants/constants';
import {EmployeeCategory} from '../model/employee-category.model';
import {SearchEmployeeCategories} from '../model/search-employee-categories.model';
import {SearchEmployeeRequest} from '../model/search-employee-request.model';
import {Employee} from '../model/employee.model';
import {User} from '../../auth/model/user.model';

export const addEmployeeCategory = createAction(EEmployeeActions.ADD_EMPLOYEE_CATEGORY, props<{ employeeCategory: EmployeeCategory }>());
export const addEmployeeCategorySuccess = createAction(EEmployeeActions.ADD_EMPLOYEE_CATEGORY_SUCCESS, props<{ employeeCategory: EmployeeCategory }>());

export const searchEmployeeCategories = createAction(EEmployeeActions.SEARCH_EMPLOYEE_CATEGORIES, props<{ searchRequest: SearchEmployeeCategories }>());
export const searchEmployeeCategoriesSuccess = createAction(EEmployeeActions. SEARCH_EMPLOYEE_CATEGORIES_SUCCESS, props<{ searchResponse: EmployeeCategory[] }>());

export const searchEmployees = createAction(EEmployeeActions.SEARCH_EMPLOYEE, props<{ searchRequest: SearchEmployeeRequest }>());
export const searchEmployeesSuccess = createAction(EEmployeeActions.SEARCH_EMPLOYEE_SUCCESS, props<{ searchResponse: User[] }>());

export const addEmployee = createAction(EEmployeeActions.ADD_EMPLOYEE, props<{ employee: Employee }>());
export const addEmployeeSuccess = createAction(EEmployeeActions.ADD_EMPLOYEE_SUCCESS, props<{ employee: Employee }>());

const all = union({
  addEmployeeCategory,
  addEmployeeCategorySuccess,
  searchEmployeeCategories,
  searchEmployeeCategoriesSuccess,
  searchEmployees,
  searchEmployeesSuccess,
  addEmployee,
  addEmployeeSuccess
});

export type EmployeeActions = typeof all;
