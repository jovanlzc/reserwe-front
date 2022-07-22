import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {addServiceCategory} from '../../../store/actions';

@Component({
  selector: 'app-add-service-category',
  templateUrl: './add-service-category.component.html',
  styleUrls: ['./add-service-category.component.scss']
})
export class AddServiceCategoryComponent implements OnInit {
  form: FormGroup;

  constructor(private store$: Store,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  save(): void {
    this.store$.dispatch(addServiceCategory({serviceCategory: this.form.value}));
  }

}
