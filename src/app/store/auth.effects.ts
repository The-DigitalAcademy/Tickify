import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service'; 
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerAction),
      mergeMap((action) =>
        this.authService.registerUser(action.user).pipe(
          map((user) => AuthActions.registerSuccess({ user: user, successMessage: 'Registration successful!' })), 
          catchError((error) => of(AuthActions.registerFailure({ errorMessage: error.message })))
        )
      )
    ),
    { dispatch: false }
  );


  constructor(private actions$: Actions, private authService: AuthService) {}
}
