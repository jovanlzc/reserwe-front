import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthApi} from '../api/auth-api';
import {Store} from '@ngrx/store';
import {EAuthActions} from '../constants/constants';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as AuthActions from './actions';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private store$: Store,
              private authApi: AuthApi) {
  }

  login$ = createEffect(() => this.actions$.pipe(
    ofType(EAuthActions.LOGIN),
    switchMap((props: { username: string, password: string }) => this.authApi.login(props.username, props.password).pipe(
      switchMap((data: any) => of(
        AuthActions.loginSuccess({ticket: data.entry.id}),
        AuthActions.getLoggedUser({userId: data.entry.userId}),
        )
      )
      ),
    )));
}
