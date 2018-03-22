import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';
import { Story } from '../../classes/story';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {

    constructor(
        private shared: SharedService,
        private data: DataService
    ) { }

    stories:Array<Story> = [];
    genres:Array<String> = [];

    statuses:Array<String> = [];

    ngOnInit() {
        this.data.getStories()
            .subscribe(data => {
                this.stories = data.items;
                let genresRaw = [];
                let statusesRaw =[];

                this.stories.forEach(story => {
                    genresRaw.push(story.genre);
                    statusesRaw.push(story.status);
                });
                genresRaw.filter((elem, pos, arr) => arr.indexOf(elem) === pos).sort();
                statusesRaw.filter((elem, pos, arr) => arr.indexOf(elem) === pos).sort();
                this.genres = genresRaw;
                this.statuses = statusesRaw;
            });
    }

}
