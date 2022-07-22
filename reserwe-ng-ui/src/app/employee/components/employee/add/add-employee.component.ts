import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../../../root-store/state';
import {Observable} from 'rxjs';
import {EmployeeCategory} from '../../../model/employee-category.model';
import {selectEmployeeCategories, selectEmployees} from '../../../store/selectors';
import {SearchEmployeeCategories} from '../../../model/search-employee-categories.model';
import * as EmployeeActions from '../../../store/actions';
import {addEmployee, updateEmployee} from '../../../store/actions';
import {Employee} from '../../../model/employee.model';
import {User} from '../../../../auth/model/user.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  employeeCategories$: Observable<EmployeeCategory[]>;
  employee: Employee;

  constructor(private formBuilder: FormBuilder,
              private store$: Store<AppState>,
              private route: ActivatedRoute) {
    const searchRequest: SearchEmployeeCategories = {};
    this.store$.dispatch(EmployeeActions.searchEmployeeCategories({searchRequest}));
  }

  ngOnInit(): void {
    this.initForm();
    this.setSelectors();
  }

  setSelectors(): void {
    this.employeeCategories$ = this.store$.select(selectEmployeeCategories);
    this.route.params.subscribe(params => {
        if (params.employeeId) {
          console.log(params.employeeId);
          this.store$.select(selectEmployees).subscribe(employees => {
            console.log('Employees', employees);
            this.employee = employees.find(employee => employee.uuid === params.employeeId);
            console.log('NadjenEmployee', this.employee);
            this.patchForm(this.employee);
          });
        }
      }
    );
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

  patchForm(employee: Employee): void {
    console.log('Patchuje se forma');
    this.form.patchValue({
      username: employee.user.username,
      password: employee.user.password,
      email: employee.user.email,
      firstName: employee.user.firstName,
      lastName: employee.user.lastName,
      executorCategories: employee.employeeCategories.map(category => category.id)
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
    if (!this.employee) {
      this.store$.dispatch(addEmployee({employee}));
    } else {
      this.store$.dispatch(updateEmployee({employee}));
    }
  }
}
