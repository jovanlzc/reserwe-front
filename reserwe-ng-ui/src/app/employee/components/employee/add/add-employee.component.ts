import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../root-store/state';
import {Observable} from 'rxjs';
import {EmployeeCategory} from '../../../model/employee-category.model';
import {selectEmployeeCategories} from '../../../store/selectors';
import {SearchEmployeeCategories} from '../../../model/search-employee-categories.model';
import * as EmployeeActions from '../../../store/actions';
import {addEmployee} from "../../../store/actions";
import {Employee} from "../../../model/employee.model";
import {User} from "../../../../auth/model/user.model";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  employeeCategories$: Observable<EmployeeCategory[]>;

  constructor(private formBuilder: FormBuilder,
              private store$: Store<AppState>) {
    const searchRequest: SearchEmployeeCategories = {};
    this.store$.dispatch(EmployeeActions.searchEmployeeCategories({searchRequest}));
  }

  ngOnInit(): void {
    this.setSelectors();
    this.initForm();
  }

  setSelectors(): void {
    this.employeeCategories$ = this.store$.select(selectEmployeeCategories);
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // dateOfBirth: ['', Validators.required],
      executorCategories: ['', Validators.required]
    });
  }

  save(): void {
    const user: User = {
      ...this.form.value,
      companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a',
      roles: []
    };
    const employee: Employee = {
      user, employeeCategoriesIds: this.form.value.executorCategories
    };
    this.store$.dispatch(addEmployee({employee}));
  }
}
