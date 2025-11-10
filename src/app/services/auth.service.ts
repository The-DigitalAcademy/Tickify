import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";


@Injectable({
    providedIn: "root"
})
export class AuthService {
    private url = "http://localhost:3000/users";

    constructor(private http: HttpClient) {}

    registerUser(user: Omit<User, "id">): Observable<User> {
        console.log('Registering user:', user);
        return this.http.post<User>(this.url, user);
    }
}

