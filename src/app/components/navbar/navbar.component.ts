import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { logoutAction } from 'src/app/store/auth/auth.actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;
  user$!: Observable<User | null>;

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit() {
    this.isAuthenticated$ = of(this.authService.isLoggedIn());

    const currentUser = this.authService.getCurrentUser();
    this.user$ = of(currentUser);
  }

  onLogout() {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout(); 
      this.store.dispatch(logoutAction());
      this.isAuthenticated$ = of(false); 
    }
  }
}
