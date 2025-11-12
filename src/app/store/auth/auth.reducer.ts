import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

export const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

export const authReducer = createReducer(
  initialState,
  
  on(AuthActions.registerAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    successMessage: null,
  })),
  on(AuthActions.registerSuccess, (state, { user, successMessage }) => ({
    ...state,
    user,
    isLoading: false,
    successMessage,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    error: errorMessage,
    successMessage: null,
  })),
  
  on(AuthActions.loginAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
    successMessage: null,
  })),
  on(AuthActions.loginSuccess, (state, { user, successMessage }) => ({
    ...state,
    user,
    isLoading: false,
    successMessage,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    error: errorMessage,
    successMessage: null,
  }))
);