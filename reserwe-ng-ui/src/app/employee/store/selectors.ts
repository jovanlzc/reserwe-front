import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {EmployeeState} from '../../employee/store/state';

export const getSelectedEmployeeCategory = (state: EmployeeState) => state.selectedEmployeeCategory;
export const getEmployeeCategories = (state: EmployeeState) => state.employeeCategories;
export const getEmployees = (state: EmployeeState) => state.employees;

export const selectEmployeeState: MemoizedSelector<object, EmployeeState> = createFeatureSelector<EmployeeState>('appEmployee');

export const selectSelectedEmployeeCategory: MemoizedSelector<object, any> = createSelector(selectEmployeeState, getSelectedEmployeeCategory);
export const selectEmployeeCategories: MemoizedSelector<object, any> = createSelector(selectEmployeeState, getEmployeeCategories);
export const selectEmployees: MemoizedSelector<object, any> = createSelector(selectEmployeeState, getEmployees);
