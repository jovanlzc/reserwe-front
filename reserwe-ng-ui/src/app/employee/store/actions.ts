import {createAction, props, union} from '@ngrx/store';
import {EEmployeeActions} from '../constants/constants';
import {EmployeeCategory} from '../model/employee-category.model';
import {SearchEmployeeCategories} from '../model/search-employee-categories.model';
import {SearchEmployeeRequest} from '../model/search-employee-request.model';
import {Employee} from '../model/employee.model';
import {User} from '../../auth/model/user.model';
import {WorkPlannerExecutorWrapper} from "../model/work-planner.model";
import {SearchUsersRequestModel} from "../model/search-users-request.model";

export const addEmployeeCategory = createAction(EEmployeeActions.ADD_EMPLOYEE_CATEGORY, props<{ employeeCategory: EmployeeCategory }>());
export const addEmployeeCategorySuccess = createAction(EEmployeeActions.ADD_EMPLOYEE_CATEGORY_SUCCESS, props<{ employeeCategory: EmployeeCategory }>());

export const searchEmployeeCategories = createAction(EEmployeeActions.SEARCH_EMPLOYEE_CATEGORIES, props<{ searchRequest: SearchEmployeeCategories }>());
export const searchEmployeeCategoriesSuccess = createAction(EEmployeeActions.SEARCH_EMPLOYEE_CATEGORIES_SUCCESS, props<{ searchResponse: EmployeeCategory[] }>());

export const searchEmployees = createAction(EEmployeeActions.SEARCH_EMPLOYEE, props<{ searchRequest: SearchEmployeeRequest }>());
export const searchEmployeesSuccess = createAction(EEmployeeActions.SEARCH_EMPLOYEE_SUCCESS, props<{ searchResponse: User[] }>());

export const addEmployee = createAction(EEmployeeActions.ADD_EMPLOYEE, props<{ employee: Employee }>());
export const addEmployeeSuccess = createAction(EEmployeeActions.ADD_EMPLOYEE_SUCCESS, props<{ employee: Employee }>());

export const updateEmployee = createAction(EEmployeeActions.UPDATE_EMPLOYEE, props<{ employee: Employee }>());
export const updateEmployeeSuccess = createAction(EEmployeeActions.UPDATE_EMPLOYEE_SUCCESS, props<{ employee: Employee }>());

export const addWorkPlanner = createAction(EEmployeeActions.ADD_WORK_PLANNER, props<{ workPlanner: WorkPlannerExecutorWrapper }>());
export const addWorkPlannerSuccess = createAction(EEmployeeActions.ADD_WORK_PLANNER_SUCCESS, props<{ workPlanner: WorkPlannerExecutorWrapper }>());

export const searchUsers = createAction(EEmployeeActions.SEARCH_USERS, props<{ searchRequest: SearchUsersRequestModel }>());
export const searchUsersSuccess = createAction(EEmployeeActions.SEARCH_USERS_SUCCESS, props<{ searchResponse: User[] }>());

const all = union({
  addEmployeeCategory,
  addEmployeeCategorySuccess,
  searchEmployeeCategories,
  searchEmployeeCategoriesSuccess,
  searchEmployees,
  searchEmployeesSuccess,
  addEmployee,
  addEmployeeSuccess,
  updateEmployee,
  updateEmployeeSuccess,
  addWorkPlanner,
  addWorkPlannerSuccess,
  searchUsers,
  searchUsersSuccess
});

export type EmployeeActions = typeof all;
