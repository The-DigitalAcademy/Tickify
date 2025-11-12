import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { loginAction } from 'src/app/store/auth/auth.actions';
import { errorSelector, isLoadingSelector } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  private destroy$ = new Subject<void>();

  constructor(private store: Store, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    
    this.isLoading$.pipe(takeUntil(this.destroy$)).subscribe(isLoading => {
      if (isLoading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };
      this.store.dispatch(loginAction({ user: credentials as User }));
    }
  }
}