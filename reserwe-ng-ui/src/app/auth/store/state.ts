import {User} from '../model/user';

export interface AuthState {
    token: string;
    loggedUser: User;
}

export const INIT_AUTH_STATE: AuthState = {
    token: null,
    loggedUser: null
};
