import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../classes/user';
import { environment } from '../../environments/environment';

@Injectable()
export class SharedService {
    constructor(
        public http: HttpClient
    ) {
        this.http.get(environment.config)
            .subscribe(response => {
                this.config = response;
            });
    }

    config:any;

    loggedInUser:User = new User();

    // State object
    state = {
        selected: {},
        storyOpen: false,
        storyId: 0,
        subId: 0,
        readerId: 0,
        storyChanged: false,
        submissionChanged: false,
        readerChanged: false,
        initialized: {
            stories: false,
            submissions: false,
            readers: false
        },
        newButton: {
            stories: false,
            submissions: false,
            readers: false
        },
        searchEnabled: false,
        searchText: null,
        searchCase: false,
        newStoryAdded: false,
        newSubAdded: false,
        newReaderAdded: false
    };

    enableNewButton(type: String) {
        Object.keys(this.state.newButton).forEach(field => {
            this.state.newButton[field] = field === type ? true : false;
        });
        this.state.searchEnabled = true;
    }

    disableNewButtons() {
        Object.keys(this.state.newButton).forEach(field => {
            this.state.newButton[field] = false;
        });
        this.state.searchEnabled = false;
    }

    reset() {
        Object.entries(this.state).forEach(([key, value]) => {
            if (typeof value === 'boolean') {
                this.state[key] = false;
            }
            if (typeof value === 'number') {
                this.state[key] = 0;
            }
        });
        this.state.initialized.stories = false;
        this.state.initialized.submissions = false;
        this.state.initialized.readers = false;
    }
}
