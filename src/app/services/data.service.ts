import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SharedService } from './shared.service';

import { Story } from '../classes/story';
import { Submission } from '../classes/submission';
import { Reader } from '../classes/reader';

@Injectable()
export class DataService {
    constructor(
        private http: HttpClient,
        private shared: SharedService
    ) { }

    // Main data arrays
    stories:Array<Story> = [];
    submissions:Array<Submission> = [];
    readers:Array<Reader> = [];

    getStories() {
        return this.http.get(`${this.shared.config.api}/api/stories`);
    }
}
