import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { logoutAction } from 'src/app/store/auth/auth.actions';
import {  userSelector } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  user$!: Observable<User | null>;

  constructor(private store: Store) {}

  ngOnInit() {
    //this.isAuthenticated$ = this.store.select(isAuthenticatedSelector);
    this.user$ = this.store.select(userSelector);
  }

  onLogout() {
    if (confirm('Are you sure you want to logout?')) {
      this.store.dispatch(logoutAction());
    }
  }
}