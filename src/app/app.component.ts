import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SharedService } from './services/shared.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        private auth: AuthService,
        private shared: SharedService
    ) { }

    ngOnInit() {
        // Test to see if we're already logged in.
        const details = this.parseCookie();
        if (details.token) {
            // The user has an authenticated token. Proceed as if logged in until a protected route says otherwise.
            this.auth.isLoggedIn = true;
            this.shared.loggedInUser.username = details.username;
            this.shared.loggedInUser.first_name = details.first_name;
            this.shared.loggedInUser.last_name = details.last_name;
            this.shared.loggedInUser.email = details.email;
        }
    }

    parseCookie() {
        let cookies:any = {};
        const dough = decodeURIComponent(document.cookie).split(';');
        dough.forEach(rawCookie => {
            const cookie = rawCookie.split('=');
            cookies[cookie[0]] = cookie[1];
        });

        return cookies;
    }
    title = 'StoryTracker';
}
