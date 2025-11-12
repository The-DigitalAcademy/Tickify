import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerAction),
      mergeMap((action) =>
        this.authService.registerUser(action.user).pipe(
          map((user) =>
            AuthActions.registerSuccess({
              user: user,
              successMessage: 'Registration successful!',
            })
          ),
          tap(() => this.router.navigate(['/login'])),
          catchError((error) =>
            of(AuthActions.registerFailure({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginAction),
      mergeMap((action) =>
        this.authService.loginUser(action.user).pipe(
          map((user) =>
            AuthActions.loginSuccess({
              user: user,
              successMessage: 'Login successful!',
            })
          ),
          tap(() => this.router.navigate(['/tasks'])),
          catchError((error) =>
            of(AuthActions.loginFailure({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logoutAction),
    tap(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
    })
  ),
  { dispatch: false }
);

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
