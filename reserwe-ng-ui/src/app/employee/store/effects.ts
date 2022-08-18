import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {EEmployeeActions} from '../constants/constants';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as EmployeeActions from './actions';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeApi} from '../api/employee-api';
import {ToastrService} from 'ngx-toastr';
import {SearchEmployeeCategories} from "../model/search-employee-categories.model";
import {SearchEmployeeRequest} from "../model/search-employee-request.model";
import {WorkPlannerExecutorWrapper} from "../model/work-planner.model";
import {SearchUsersRequestModel} from "../model/search-users-request.model";

@Injectable()
export class EmployeeEffects {
  constructor(private actions$: Actions,
              private store$: Store,
              private employeeApi: EmployeeApi,
              private navigator: Router,
              private notificationMessages: ToastrService) {
  }

  addEmployeeCategoryEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EEmployeeActions.ADD_EMPLOYEE_CATEGORY),
    switchMap((props: { employeeCategory }) => this.employeeApi.addCategory(props.employeeCategory).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          this.navigator.navigate(['/employee/category/list']);
          this.notificationMessages.success('Successfully added employee category!');
          return of(
            EmployeeActions.addEmployeeCategorySuccess({employeeCategory: data}),
          );
        }
      )
      ),
    )));

  searchEmployeeCategoryEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EEmployeeActions.SEARCH_EMPLOYEE_CATEGORIES),
    switchMap((props: { searchRequest: SearchEmployeeCategories }) => this.employeeApi.searchEmployeeCategories(props.searchRequest).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          return of(
            EmployeeActions.searchEmployeeCategoriesSuccess({searchResponse: data}),
          );
        }
      )
      ),
    )));

  addEmployeeEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EEmployeeActions.ADD_EMPLOYEE),
    switchMap((props: { employee }) => this.employeeApi.addEmployee(props.employee).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          this.navigator.navigate(['/employee/list']);
          this.notificationMessages.success('Successfully added employee!');
          return of(
            EmployeeActions.addEmployeeSuccess({employee: data}),
          );
        }
      )
      ),
    )));

  updateEmployeeEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EEmployeeActions.UPDATE_EMPLOYEE),
    switchMap((props: { employee }) => this.employeeApi.updateEmployee(props.employee).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          this.navigator.navigate(['/employee/list']);
          this.notificationMessages.success('Successfully updated employee!');
          return of(
            EmployeeActions.updateEmployeeSuccess({employee: data}),
          );
        }
      )
      ),
    )));

  searchEmployeesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EEmployeeActions.SEARCH_EMPLOYEE),
    switchMap((props: { searchRequest: SearchEmployeeRequest }) => this.employeeApi.searchEmployee(props.searchRequest).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          return of(
            EmployeeActions.searchEmployeesSuccess({searchResponse: data}),
          );
        }
      )
      ),
    )));

  addWorkPlannerEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EEmployeeActions.ADD_WORK_PLANNER),
    switchMap((props: { workPlanner: WorkPlannerExecutorWrapper }) => this.employeeApi.addWorkPlanner(props.workPlanner).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          this.navigator.navigate(['/employee/list']);
          this.notificationMessages.success('Successfully added work plan!');
          return of(
            EmployeeActions.addWorkPlannerSuccess({workPlanner: data}),
          );
        }
      )
      ),
    )));

  searchUsersEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EEmployeeActions.SEARCH_USERS),
    switchMap((props: { searchRequest: SearchUsersRequestModel }) => this.employeeApi.searchUsers(props.searchRequest).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          return of(
            EmployeeActions.searchUsersSuccess({searchResponse: data}),
          );
        }
      )
      ),
    )));

}
