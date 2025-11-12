import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Registering a user
  registerUser(user: Omit<User, 'id'>): Observable<User> {
    console.log('Registering user:', user);
    // Check if user with the same email already exists using the getUsers method
    return this.getUsers().pipe(
      map(users => users.find(u => u.email === user.email)),
      switchMap(existing => {
        if (existing) {
          console.error('Registration failed: Email already in use.');
          return throwError(() => new Error('Email already in use'));
        }
        return this.http.post<User>(this.url, user);
      })
    );
  }

  // Retrieving all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  // Login a user
loginUser(credentials: { email: string; password: string }): Observable<User> {
  console.log('Logging in user:', credentials.email);
  return this.getUsers().pipe(
    map(users => users.find(u => u.email === credentials.email && u.password === credentials.password)),
    switchMap(user => {
      if (!user) {
        console.error('Login failed: Invalid email or password.');
        return throwError(() => new Error('Invalid email or password'));
      }
      // Set user as logged in
      localStorage.setItem('user', JSON.stringify(user));
      return this.http.get<User>(`${this.url}/${user.id}`);
    })
  );
}

  // Logout a user
  logout() {
    localStorage.removeItem('user');
  }

}
