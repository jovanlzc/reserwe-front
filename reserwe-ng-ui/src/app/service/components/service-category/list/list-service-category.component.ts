import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {MatTableDataSource} from '@angular/material/table';
import {EmployeeCategory} from '../../../../employee/model/employee-category.model';
import * as ServiceSelectors from '../../../store/selectors';
import {SearchServiceCategories} from '../../../model/search-service-categories.model';
import * as ServiceActions from '../../../store/actions';

@Component({
  selector: 'app-list-service-category',
  templateUrl: './list-service-category.component.html',
  styleUrls: ['./list-service-category.component.scss']
})
export class ListServiceCategoryComponent implements OnInit {

  dataSource = new MatTableDataSource<EmployeeCategory>([]);
  title = 'service.category.list.title';
  displayedColumns: string[] = ['details', 'name'];

  constructor(private store$: Store) {
    const searchRequest: SearchServiceCategories = {};
    this.store$.dispatch(ServiceActions.searchServiceCategories({searchRequest}));
  }

  ngOnInit() {
    this.initSelectors();
  }

  initSelectors(): void {
    this.store$.select(ServiceSelectors.selectServiceCategories).pipe().subscribe(response => {
      if (response) {
        this.dataSource.connect().next(response);
      }
    });
  }
}
