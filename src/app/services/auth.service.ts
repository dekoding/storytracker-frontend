import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { SharedService } from './shared.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export interface LoginResponse {
    success: boolean;
    message: string;
}

export interface SignupTest {
    success: boolean;
    username: boolean;
    email: boolean;
}

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private shared: SharedService
    ) { }

    isLoggedIn:boolean = false;

    signupValid:boolean = true;
    signupDuplicate = {
        username: false,
        email: false
    };

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    login(username: string, password: string):Observable<boolean> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

        return this.http.post(`${this.shared.config.api}/api/login`,JSON.stringify({ username, password }), { headers })
            .map((response: LoginResponse) => {
                this.isLoggedIn = response.success;
                return response.success;
            });
    }

    signupTest(username: string, email: string):Observable<boolean> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json'});

        return this.http.post(`${this.shared.config.api}/api/signupTest`,JSON.stringify({ username, email }), { headers })
            .map((response: SignupTest) => {
                this.signupValid = response.success;
                this.signupDuplicate.username = response.username;
                this.signupDuplicate.email = response.email;

                return response.success;
            });
    }
}
