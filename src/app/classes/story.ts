import { Submission } from './submission';
import { Reader } from './reader';

export class Story {
	storyId:number;
    title:String;
    words:number;
    genre:String;
    status:String;
	finished?:boolean;
    comments:String;
	avgRating?:number;
	submissions: Array<Submission>;
	readers: Array<Reader>;
	atMarket?: boolean;
	futureMarkets?:String;
}
