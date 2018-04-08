import { Injectable, APP_INITIALIZER } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../classes/user';
import { environment } from '../../environments/environment';

@Injectable()
export class SharedService {
    constructor(
        public http: HttpClient
    ) { }

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
        searchEnabled: false,
        searchText: null,
        searchCase: false,
        newStoryAdded: false,
        newSubAdded: false,
        newReaderAdded: false
    };

    loadConfig() {
        return new Promise((resolve, reject) => {
            this.http.get(environment.config)
                .map(response => response)
                .subscribe(data => {
                    this.config = data;
                    resolve(true);
                },
                (error: any) => {
                    console.error(error);
                    return Observable.throw(error.json().error || 'Server error');
                });
        });
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

export function SharedFactory(shared: SharedService) {
    return () => shared.loadConfig();
}

export function init() {
    return {
        provide: APP_INITIALIZER,
        useFactory: SharedFactory,
        deps: [ SharedService ],
        multi: true
    }
}

const SharedModule = {
    init: init
}

export { SharedModule };
