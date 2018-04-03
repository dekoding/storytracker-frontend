import { Story } from '../classes/story';
import { Submission } from '../classes/submission';
import { Reader } from '../classes/reader';

export interface GetStoriesResponse {
    success:boolean;
    items:Array<Story>;
}

export interface GetSubmissionsResponse {
    success:boolean;
    items:Array<Submission>;
}

export interface GetReadersResponse {
    success:boolean;
    items:Array<Reader>;
}

export interface SuccessResponse {
    success:boolean;
}
