import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(
        private auth: AuthService
    ) { }

    ngOnInit() {
    }
    user = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    }
    invalid = {
        username: true,
        first_name: true,
        last_name: true,
        email: true,
        password: true
    }
    message = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    }

    userIsValid:boolean = false;

    testLength(field) {
        if (field.length === 0) {
            return false;
        }
        return true;
    }

    validate(field: string) {
        if (this.user[field].length === 0) {
            this.invalid[field] = true;
            this.message[field] = 'This field cannot be empty.';
        } else if (field === 'password') {
            if (this.user.password === this.user.password_confirmation) {
                this.invalid.password = false;
                this.message.password = '';
            } else {
                this.invalid.password = true;
                this.message.password = 'Passwords must match.'
            }
        } else if (field === 'username' || field === 'email') {
            this.signupTest();
        } else {
            this.invalid[field] = false;
            this.message[field] = '';
        }
        this.validityTest();
    }

    validityTest() {
        const keys = Object.keys(this.invalid);

        let isValid = true;
        keys.forEach(key => {
            if (this.invalid[key]) {
                isValid = false;
            }
        });
        console.log(isValid);
        this.userIsValid = isValid;
    }

    signupTest() {
        this.auth.signupTest(this.user.username, this.user.email)
            .subscribe(
                success => {
                    if (success) {
                        this.invalid.username = false;
                        this.invalid.email = false;
                        this.message.username = '';
                        this.message.email = '';
                    } else {
                        if (this.auth.signupDuplicate.username) {
                            this.invalid.username = true;
                            this.message.username = 'This username is already taken.'
                        }

                        if (this.auth.signupDuplicate.email) {
                            this.invalid.email = true;
                            this.message.email = 'This email is already associated with an account.';
                        }
                    }
                },
                error => {
                    console.log(error);
                }
            );
    }
}
