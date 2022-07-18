import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthApi} from '../api/auth-api';
import {Store} from '@ngrx/store';
import {EAuthActions} from '../constants/constants';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as AuthActions from './actions';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private store$: Store,
              private authApi: AuthApi,
              private navigator: Router) {
  }

  loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(EAuthActions.LOGIN),
    switchMap((props: { username: string, password: string, companyId: string }) => this.authApi.login(props.username, props.password, props.companyId).pipe(
      switchMap((data: any) => {
          console.log('Data', data);
          this.navigator.navigate(['/']);
          return of(
            AuthActions.loginSuccess({token: data.jwt, userCredentials: data.userCredentials}),
          )
            ;
        }
      )
      ),
    )));
}
