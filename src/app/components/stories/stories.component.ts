import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';
import { Story } from '../../classes/story';
import { Submission } from '../../classes/submission';
import { Reader } from '../../classes/reader';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NewStoryComponent } from './newstory/newstory.component';

@Component({
    selector: 'app-stories',
    templateUrl: './stories.component.html',
    styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit {
    constructor(
        private modalService: BsModalService,
        private shared: SharedService,
        private data: DataService
    ) { }
    selected = {};

    ngOnInit() { }

    getStories() {
        this.data.getStories()
            .subscribe(response => {
                if (response) {
                    this.loadStoryDetails();
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
    }
    newStory() {
        const story = new Story();
        story.submissions = [];
        story.readers = [];

        const initialState = { story };

        this.modalService.show(NewStoryComponent, { initialState, class: 'modal-lg' });
        this.modalService.onHide
            .subscribe(hiding => {
                if (this.shared.state.newStoryAdded) {
                    // The new storyId will always be the length of the array +1
                    story.storyId = this.data.stories.length + 1;
                    this.data.stories.push(initialState.story);
                    this.data.stats.stories++;
                    this.shared.state.newStoryAdded = false;
                }
            });
    }
}
