import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {EmployeeCategory} from '../../../model/employee-category.model';
import {AppState} from '../../../../root-store/state';
import {Store} from '@ngrx/store';
import * as EmployeeSelectors from '../../../store/selectors';
import * as EmployeeActions from '../../../store/actions';
import {SearchEmployeeCategories} from '../../../model/search-employee-categories.model';

@Component({
  selector: 'app-employee-categories-list',
  templateUrl: './list-employee-category.component.html',
  styleUrls: ['./list-employee-category.component.scss']
})
export class ListEmployeeCategoryComponent implements OnInit {

  dataSource = new MatTableDataSource<EmployeeCategory>([]);
  title = 'employee.category.list.title';
  displayedColumns: string[] = ['details', 'name'];

  constructor(private store$: Store<AppState>) {
    const searchRequest: SearchEmployeeCategories = {};
    this.store$.dispatch(EmployeeActions.searchEmployeeCategories({searchRequest}));
  }

  ngOnInit(): void {
    this.store$.select(EmployeeSelectors.selectEmployeeCategories).pipe().subscribe(response => {
      if (response) {
        this.dataSource.connect().next(response);
      }
    });
  }


}
