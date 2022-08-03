import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../root-store/state';
import {MatTableDataSource} from '@angular/material/table';
import * as EmployeeActions from '../../../store/actions';
import {SearchEmployeeRequest} from '../../../model/search-employee-request.model';
import * as EmployeeSelectors from '../../../store/selectors';
import {Employee} from '../../../model/employee.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {WorkPlannerModalComponent} from '../../../modal/work-planner/work-planner.modal.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  dataSource = new MatTableDataSource<Employee>([]);
  title = 'employee.list.title';
  displayedColumns: string[] = ['details', 'firstName', 'lastName', 'email', 'username', 'categories', 'actions'];

  constructor(private store$: Store<AppState>,
              private navigator: Router,
              private dialog: MatDialog) {
    console.log('Poziva se store');
    const searchRequest: SearchEmployeeRequest = {};
    this.store$.dispatch(EmployeeActions.searchEmployees({searchRequest}));
  }

  ngOnInit(): void {
    this.store$.select(EmployeeSelectors.selectEmployees).pipe().subscribe(response => {
      if (response) {
        console.log('Response', response);
        this.dataSource.connect().next(response);
      }
    });
  }

  editEmployee(employee: Employee) {
    console.log('Edit employee');
    this.navigator.navigate(['/employee/add', {employeeId: employee.uuid}]);
  }

  addWorkPlanner(employee: Employee){
    this.dialog.open(WorkPlannerModalComponent, {
      width: '70%',
      height: '65%',
      data: {
        employee
      }
    }).afterClosed().subscribe(x => {
      console.log(x);
    });
  }
}
