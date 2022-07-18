import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../root-store/state';
import {MatTableDataSource} from '@angular/material/table';
import * as EmployeeActions from '../../../store/actions';
import {SearchEmployeeRequest} from '../../../model/search-employee-request.model';
import * as EmployeeSelectors from '../../../store/selectors';
import {User} from "../../../../auth/model/user.model";

@Component({
  selector: 'app-employee-list',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  dataSource = new MatTableDataSource<User>([]);
  title = 'employee.list.title';
  displayedColumns: string[] = ['details', 'firstName', 'lastName', 'email', 'username'];

  constructor(private store$: Store<AppState>) {
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
}
