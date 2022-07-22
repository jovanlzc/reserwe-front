import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as ServiceActions from '../../../store/actions';
import * as ServiceSelectors from '../../../store/selectors';
import {SearchServiceCategories} from '../../../model/search-service-categories.model';
import {Observable} from 'rxjs';
import {ServiceCategory} from '../../../model/service-category.model';
import {AppState} from '../../../../root-store/state';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {
  serviceCategories$: Observable<ServiceCategory[]>;

  form: FormGroup;

  constructor(private store$: Store<AppState>,
              private formBuilder: FormBuilder) {
    const searchRequest: SearchServiceCategories = {};
    this.store$.dispatch(ServiceActions.searchServiceCategories({searchRequest}));
  }

  ngOnInit(): void {
    this.initForm();
    this.initSelectors();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      basicPrice: ['', Validators.required],
      description: ['', Validators.required],
      basicServiceCategoryId: ['', Validators.required]
    });
  }

  initSelectors(): void {
    this.serviceCategories$ = this.store$.select(ServiceSelectors.selectServiceCategories);
    this.store$.select(ServiceSelectors.selectServiceCategories).subscribe(categories => {
      console.log('Kategorije', categories);
    });
  }

  save(): void {
    console.log('Forma Service', this.form.value);
    this.store$.dispatch(ServiceActions.addService({service: this.form.value}));
  }

}
