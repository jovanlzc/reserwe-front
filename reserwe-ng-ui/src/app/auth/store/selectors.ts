import {AuthState} from './state';
import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

export const getLoggedUser = (state: AuthState) => state.loggedUser;
export const getUserToken = (state: AuthState) => state.token;

export const selectAuthState: MemoizedSelector<object, AuthState> = createFeatureSelector<AuthState>('appAuth');

export const selectLoggedUser: MemoizedSelector<object, any> = createSelector(selectAuthState, getLoggedUser);
export const selectUserToken: MemoizedSelector<object, any> = createSelector(selectAuthState, getUserToken);
