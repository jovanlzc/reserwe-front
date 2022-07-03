import {createAction, props, union} from '@ngrx/store';
import {EAuthActions} from '../constants/constants';
import {User} from '../model/user';

export const login = createAction(EAuthActions.LOGIN, props<{ username: string, password: string }>());
export const loginSuccess = createAction(EAuthActions.LOGIN_SUCCESS, props<{ token: string }>());

export const getLoggedUser = createAction(EAuthActions.GET_LOGGED_USER, props<{ userId: string }>());
export const getLoggedUserSuccess = createAction(EAuthActions.GET_LOGGED_USER_SUCCESS, props<{ user: User }>());

export const logout = createAction(EAuthActions.LOGOUT, props<{ onlyNavigate: boolean, callback?: () => void }>());
export const logoutSuccess = createAction(EAuthActions.LOGOUT_SUCCESS);

const all = union({
  login,
  loginSuccess,
  getLoggedUser,
  getLoggedUserSuccess,
  logout,
  logoutSuccess
});

export type AuthActions = typeof all;
