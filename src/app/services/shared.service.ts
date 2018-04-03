import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable()
export class SharedService {
    constructor() { }

    config = {
        api: 'http://localhost:3000'
    }

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
}
