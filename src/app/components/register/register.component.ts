import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { registerAction,  } from 'src/app/store/auth.actions';
import { errorSelector, isLoadingSelector } from 'src/app/store/auth.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  
  }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onRegister() {
    if (this.registerForm.valid) {
      const user: Partial<User> = {
        name: this.registerForm.value.name!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
      };
      this.store.dispatch(registerAction({ user: user as Omit<User, 'id'> }) );
    }
  }

  showSpinner() {
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 2000);
      }
}


