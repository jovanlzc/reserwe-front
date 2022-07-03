import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AuthState} from '../../store/state';
import * as AuthActions from '../../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = false;

  constructor(private formBuidler: FormBuilder,
              private store$: Store<AuthState>) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuidler.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    console.log('FormValue', this.form);
    this.store$.dispatch(AuthActions.login({
      username: 'jovanlzc',
      password: 'jovankv123',
      companyId: 'b75232d9-afd1-43ab-b716-fa3dd69a8d1a'
    }));
  }
}
