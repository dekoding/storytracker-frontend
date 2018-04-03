import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    constructor(
        private shared: SharedService,
        private router: Router,
        private auth: AuthService
    ) { }

    ngOnInit() {}

    username: string;
    password: string;

    login() {
        this.auth.login(this.username, this.password)
            .subscribe(
                success => {
                    if (success) {
                        this.auth.isLoggedIn = true;
                        this.router.navigate(['/stories']);
                    } else {
                        console.log('There was an error.');
                    }
                },
                error => {
                    console.log(error);
                }
            );
    }
}
