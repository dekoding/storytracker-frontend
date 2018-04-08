import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { SharedService } from './shared.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Story } from '../classes/story';
import { Submission } from '../classes/submission';
import { Reader } from '../classes/reader';

import { GetStoriesResponse,
    GetSubmissionsResponse,
    GetReadersResponse,
    SuccessResponse
} from '../interfaces/data';

@Injectable()
export class DataService {
    constructor(
        public http: HttpClient,
        public shared: SharedService
    ) { }

    headers = new HttpHeaders({ 'Content-Type': 'application/json'});

    // Main data objects
    stories:Array<Story> = [];
    submissions:Array<Submission> = [];
    readers:Array<Reader> = [];

    selectedStory:Story = new Story();
    selectedSubmission:Submission = new Submission();
    selectedReader:Reader = new Reader();

    genres:Array<String> = [];
    statuses:Array<String> = [];
    markets:Array<String> = [];
    names:Array<String> = [];

    stats = {
        stories: 0,
        submissions: 0,
        waiting: 0,
        rewrites: 0,
        sales: 0,
        rejections: 0,
    };

    // CRUD functions
    createStory(story: Story):Observable<boolean> {
        return this.http.post(`${this.shared.config.api}/api/stories`, story, { headers: this.headers })
            .map((response:SuccessResponse) => {
                return response.success;
            });
    }

    getStories():Observable<boolean> {
        return this.http.get(`${this.shared.config.api}/api/stories`)
            .map((response: GetStoriesResponse) => {
                if (response.success) {
                    this.stories = response.items;
                    this.storyCleanup();
                    this.updateDropdowns();
                    this.updateMarkets();
                    this.updateNames();
                }
                return response.success;
            });
    }

    updateStory(story: Story):Observable<boolean> {
        return this.http.put(`${this.shared.config.api}/api/stories/${story.storyId}`, story, { headers: this.headers })
            .map((response:SuccessResponse) => {
                return response.success;
            });
    }

    deleteStory(storyId: number):Observable<boolean> {
        return this.http.delete(`${this.shared.config.api}/api/stories/${storyId}`)
            .map((response:SuccessResponse) => {
                return response.success;
            });
    }

    createSubmission(storyId: number, submission: Submission):Observable<boolean> {
        return this.http.post(`${this.shared.config.api}/api/stories/${storyId}/submissions`, submission, { headers: this.headers })
            .map((response:SuccessResponse) => {
                return response.success;
            });
    }

    getSubmissions(storyId: number):Observable<GetSubmissionsResponse> {
        return this.http.get(`${this.shared.config.api}/api/stories/${storyId}/submissions`)
            .map((response: GetSubmissionsResponse) => {
                if (response.success) {
                    return response;
                } else {
                    response.items = [];
                    return response;
                }
            });
    }

    updateSubmission(storyId: number, submission: Submission):Observable<boolean> {
        return this.http.put(`${this.shared.config.api}/api/stories/${storyId}/submissions/${submission.subId}`,
            submission,
            { headers: this.headers })
            .map((response:SuccessResponse) => {
                return response.success;
            });
    }

    deleteSubmission(storyId: number, subId: number):Observable<boolean> {
        return this.http.delete(`${this.shared.config.api}/api/stories/${storyId}/submissions/${subId}`)
            .map((response:SuccessResponse) => {
                return response.success;
            });
    }

    createReader(storyId: number, reader: Reader):Observable<boolean> {
        return this.http.post(`${this.shared.config.api}/api/stories/${storyId}/readers`, reader, { headers: this.headers })
            .map((response:SuccessResponse) => {
                return response.success;
            });
    }

    getReaders(storyId: number):Observable<GetReadersResponse> {
        return this.http.get(`${this.shared.config.api}/api/stories/${storyId}/readers`)
            .map((response: GetReadersResponse) => {
                if (response.success) {
                    return response;
                } else {
                    response.items = [];
                    return response;
                }
            });
    }

    updateReader(storyId: number, reader: Reader):Observable<boolean> {
        return this.http.put(`${this.shared.config.api}/api/stories/${storyId}/readers/${reader.readerId}`,
            reader,
            { headers: this.headers })
            .map((response:SuccessResponse) => {
                return response.success;
            });
    }

    deleteReader(storyId: number, readerId: number):Observable<boolean> {
        return this.http.delete(`${this.shared.config.api}/api/stories/${storyId}/readers/${readerId}`)
            .map((response:SuccessResponse) => {
                return response.success;
            });
    }

    // Utility functions
    updateDropdowns() {
        this.genres = [];
        this.statuses = [];

        this.stories.forEach(story => {
            let rating:number = 0;
            if (this.genres.indexOf(story.genre) === -1) {
                this.genres.push(story.genre);
            }
            if (this.statuses.indexOf(story.status) === -1) {
                this.statuses.push(story.status);
            }
            story.readers.forEach(reader => {
                rating += reader.rating;
            });
            story.avgRating = rating / story.readers.length;
        });
        this.genres.sort();
        this.statuses.sort();
    }

    updateMarkets() {
        this.markets = [];
        this.stories.forEach(story => {
            story.submissions.forEach(submission => {
                if (this.markets.indexOf(submission.market) === -1) {
                    this.markets.push(submission.market);
                }
            });
        });
        this.markets.sort();
    }

    updateNames() {
        this.names = [];
        this.stories.forEach(story => {
            story.readers.forEach(reader => {
                if (this.names.indexOf(reader.name) === -1) {
                    this.names.push(reader.name);
                }
            });
        });
        this.names.sort();
    }

    storyCleanup() {
        this.stories.forEach(story => {
            story.submissions.forEach(submission => {
                submission.subDate = new Date(submission.subDate);
                if (submission.replyDate) {
                    submission.replyDate = new Date(submission.replyDate);
                }
            });
            story.readers.forEach(reader => {
                reader.readDate = new Date(reader.readDate);
            });
        });
    }

    reset() {
        this.stories.length = 0;
        this.submissions.length = 0;
        this.readers.length = 0;

        this.selectedStory = new Story();
        this.selectedSubmission = new Submission();
        this.selectedReader = new Reader();

        this.genres = [];
        this.statuses = [];
        this.markets = [];
        this.names = [];

        this.stats = {
            stories: 0,
            submissions: 0,
            waiting: 0,
            rewrites: 0,
            sales: 0,
            rejections: 0,
        };
    }
}
