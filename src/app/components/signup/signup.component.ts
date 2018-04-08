import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../classes/user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    constructor(
        public router: Router,
        public modalService: BsModalService,
        public shared: SharedService,
        public auth: AuthService
    ) { }

    ngOnInit() { }

    modalRef: BsModalRef;

    tlds:string;
    regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    regexText = /^[0-9a-zA-Z]+$/;

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    closeModal() {
        this.modalRef.hide();
        if (this.auth.isLoggedIn) {
            this.router.navigate(['/stories']);
        }
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
        } else if (field === 'email') {
            if (this.validateEmail(this.user.email)) {
                this.signupTest();
            } else {
                this.invalid.email = true;
                this.message.email = 'You must use a valid email address.';
            }
        } else if (field === 'username' || field === 'first_name' || field === 'last_name') {
            if (this.validateText(this.user[field])) {
                this.invalid[field] = false;
                this.message[field] = '';
                if (field === 'username') {
                    this.signupTest();
                }
            } else {
                this.invalid[field] = true;
                this.message[field] = 'Only alphanumeric characters are allowed.';
            }
        } else {
            this.invalid[field] = false;
            this.message[field] = '';
        }
        this.validityTest();
    }

    validateEmail(email: string) {
        email = email.toUpperCase();
        return this.regexEmail.test(email);
    }

    validateText(text: string) {
        return this.regexText.test(text);
    }

    validityTest() {
        let valid = true;
        Object.values(this.invalid).forEach(value => {
            if (value) {
                valid = false;
            }
        });
        this.userIsValid = valid;
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

    signup(notice: TemplateRef<any>) {
        const newUser = new User();
        newUser.username = this.user.username;
        newUser.first_name = this.user.first_name;
        newUser.last_name = this.user.last_name;
        newUser.email = this.user.email;
        newUser.password = this.user.password;

        this.auth.signup(newUser)
            .subscribe(
                success => {
                    if (success) {
                        this.auth.isLoggedIn = true;
                        this.openModal(notice);
                    } else {
                        console.log('Failed! Check server.')
                    }
                },
                error => {
                    console.log(error);
                }
            );
    }
}
