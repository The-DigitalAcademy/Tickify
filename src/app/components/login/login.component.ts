import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { loginAction } from 'src/app/store/auth/auth.actions';
import { errorSelector, isLoadingSelector } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
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