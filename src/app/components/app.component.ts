import { Component, TemplateRef, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';
import { DataService } from '../services/data.service';

import { Story } from '../classes/story';
import { Submission } from '../classes/submission';
import { Reader } from '../classes/reader';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(
        public router: Router,
        public auth: AuthService,
        public shared: SharedService,
        public data: DataService,
        public modalService: BsModalService
    ) {
        router.events.subscribe( (event: Event) => {
            if (event instanceof NavigationEnd) {

                this.routeParts = event.url.substr(1).split('/');

                if (this.auth.isLoggedIn && this.routeParts[0] === 'stories') {
                    if (!this.shared.state.initialized.stories) {
                        this.getStories();
                    } else {
                        this.initializeApp();
                    }
                }
            }
        });
    }

    modalRef: BsModalRef;
    loggingOut:boolean = false;

    initializeApp() {
        let count = this.routeParts.length;

        switch(count) {
            case 1: this.setState('stories');break;
            case 2: this.setState('story');break;
            case 3: this.setState(this.routeParts[2]);break;
            case 4: this.setState(this.routeParts[2].slice(0, -1));break;
        }
    }

    setState(mode: string) {
        if (this.routeParts.length > 1) {
            this.shared.state.storyId = +this.routeParts[1];
            this.data.selectedStory = this.data.stories
                .find(story => story.storyId === this.shared.state.storyId);
        }

        if (mode === 'stories') {
            this.shared.enableNewButton('stories');
            this.shared.state.storyId = 0;
            this.shared.state.subId = 0;
            this.shared.state.readerId = 0;
        }

        if (mode === 'story') {
            this.shared.disableNewButtons();
            this.shared.state.subId = 0;
            this.shared.state.readerId = 0;
        }

        if (mode === 'submissions') {
            this.shared.enableNewButton('submissions');
            this.shared.state.subId = 0;
            this.shared.state.readerId = 0;
        }

        if (mode === 'submission') {
            this.shared.state.subId = +this.routeParts[3];
            this.shared.disableNewButtons();
            this.data.selectedSubmission = this.data.selectedStory.submissions
                .find(submission => submission.subId === this.shared.state.subId);
        }

        if (mode === 'readers') {
            this.shared.enableNewButton('readers');
            this.shared.state.subId = 0;
            this.shared.state.readerId = 0;
        }

        if (mode === 'reader') {
            this.shared.state.readerId = +this.routeParts[3];
            this.shared.disableNewButtons();
            this.data.selectedReader = this.data.selectedStory.readers
                .find(reader => reader.readerId === this.shared.state.readerId);
        }
    }

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

            if (!this.shared.state.initialized.stories) {
                this.getStories();
            }
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
    routeParts = [];

    getStories() {
        this.data.getStories()
            .subscribe(response => {
                if (response) {
                    this.loadStoryDetails();
                    this.initializeApp();
                }
            });
    }

    loadStoryDetails() {
        let stories = 0, submissions = 0, waiting = 0, rewrites = 0, sales = 0, rejections = 0;
        stories = this.data.stories.length;
        this.data.stories.forEach(story => {
            submissions += story.submissions.length;
            story.submissions.forEach(submission => {
                waiting += !submission.replyDate ? 1 : 0;
                rewrites += submission.response === 'Rewrite' ? 1 : 0;
                sales += submission.response === 'Sold' ? 1 : 0;
                rejections += submission.response === 'Rejected' ? 1 : 0;
            });
        });
        this.data.stats = { stories, submissions, waiting, rewrites, sales, rejections };
        this.shared.state.initialized.stories = true;
    }

    logoutConfirm(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
        this.modalService.onHidden.subscribe(hiding => {
            if (this.loggingOut) {
                this.auth.logout()
                    .subscribe(result => {
                        if (result) {
                            this.auth.isLoggedIn = false;
                            this.shared.reset();
                            this.data.reset();
                            this.loggingOut = false;
                            this.router.navigate(['/home']);
                        }
                    });
            }
        });
    }
}
