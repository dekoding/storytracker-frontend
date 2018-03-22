import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { SharedService } from './shared.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Story } from '../classes/story';
import { Submission } from '../classes/submission';
import { Reader } from '../classes/reader';

export interface StoriesResponse {
    success:boolean;
    items:Array<Story>;
}

@Injectable()
export class DataService {
    constructor(
        private http: HttpClient,
        private shared: SharedService
    ) { }

    headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    // Main data arrays
    stories:Array<Story> = [];
    submissions:Array<Submission> = [];
    readers:Array<Reader> = [];

    getStories():Observable<StoriesResponse> {
        return this.http.get(`${this.shared.config.api}/api/stories`)
            .map((response: StoriesResponse) => {
                if (response.success) {
                    return response;
                } else {
                    response.items = [];
                    return response;
                }
            });
    }
}
