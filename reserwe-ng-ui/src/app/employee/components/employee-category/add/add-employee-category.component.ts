import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as EmployeeActions from '../../../store/actions';
import {EmployeeCategory} from "../../../model/employee-category.model";

@Component({
  selector: 'app-employee-category-add',
  templateUrl: './add-employee-category.component.html',
  styleUrls: ['./add-employee-category.component.scss']
})
export class AddEmployeeCategoryComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store$: Store) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  save(): void {
    console.log('Forma', this.form.value);
    this.store$.dispatch(EmployeeActions.addEmployeeCategory({employeeCategory: this.form.value as EmployeeCategory}));
  }

}
