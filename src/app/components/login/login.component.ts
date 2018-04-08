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
        public shared: SharedService,
        public router: Router,
        public auth: AuthService
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
                        alert('There was an error.');
                    }
                },
                error => {
                    alert(error);
                }
            );
    }
}
