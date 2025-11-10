import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.state';

export const initialState: AuthState = {
  isLoading: false,
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.registerAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(AuthActions.registerSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.registerFailure, (state, { errorMessage }) => ({
    ...state,
    isLoading: false,
    user: null,
    error: errorMessage,
  }))
);

export { AuthState };

