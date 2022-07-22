import {Component, Inject, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Service} from '../../../model/service.model';
import {SearchEmployeeCategories} from '../../../../employee/model/search-employee-categories.model';
import * as EmployeeActions from '../../../../employee/store/actions';
import * as EmployeeSelectors from '../../../../employee/store/selectors';
import {Observable} from "rxjs";
import {EmployeeCategory} from "../../../../employee/model/employee-category.model";
import {PriceList} from "../../../model/price-list.model";
import {addPriceList} from "../../../store/actions";

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.scss']
})
export class AddPriceModalComponent implements OnInit {
  form: FormGroup;

  employeeCategories$: Observable<EmployeeCategory[]>;

  constructor(private store$: Store,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA)
              public data: { service: Service },
              private dialogRef: MatDialogRef<AddPriceModalComponent>) {
    const searchRequest: SearchEmployeeCategories = {};
    this.store$.dispatch(EmployeeActions.searchEmployeeCategories({searchRequest}));
  }

  ngOnInit(): void {
    this.initForm();
    this.initSelectors();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      amount: ['', Validators.required],
      executorTypesIds: ['', Validators.required]
    });
  }

  initSelectors(): void {
    this.employeeCategories$ = this.store$.select(EmployeeSelectors.selectEmployeeCategories);
  }

  save(): void {
    const priceList: PriceList = {
      ...this.form.value,
      basicServiceId: this.data.service.id
    };
    this.store$.dispatch(addPriceList({priceList}));
    this.dialogRef.close();
  }
}
