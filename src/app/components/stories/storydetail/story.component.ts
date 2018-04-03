import { Component, OnInit, DoCheck, IterableDiffers, KeyValueDiffers, KeyValueDiffer } from '@angular/core';

import { SharedService } from '../../../services/shared.service';
import { DataService } from '../../../services/data.service';

import { Story } from '../../../classes/story';

@Component({
    selector: 'app-story',
    templateUrl: './story.component.html',
    styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit, DoCheck {

    constructor(
        private iterableDiffers: IterableDiffers,
        private keyValueDiffers: KeyValueDiffers,
        private shared: SharedService,
        private data: DataService
    ) {
        this.arrayDiffer = this.iterableDiffers.find([]).create(null);
    }

    differ:KeyValueDiffer<any, any>;
    arrayDiffer: any;

    storySet:boolean = false;

    ngOnInit() {
        if (this.data.stories.length > 0) {
            this.setStory();
        }
    }

    ngDoCheck() {
        const arraychanges = this.arrayDiffer.diff(this.data.stories);
        if (arraychanges && !this.storySet) {
            this.setStory();
        }
        if (this.story.storyId) {
            const diff = this.differ.diff(this.story);
            if (diff !== null) {
                let changes = 0;
                diff.forEachChangedItem(item => {
                    changes ++;
                });
                if (changes > 0) {
                    this.shared.state.storyChanged = true;
                }
            }
        }
    }

    story:Story = new Story();

    alerts:any[] = [];

    setStory() {
        this.story = this.data.stories.find(story => story.storyId === this.shared.state.storyId);
        this.differ = this.keyValueDiffers.find(this.story).create();
        this.storySet = true;
    }

    save() {
        this.data.updateStory(this.story)
            .subscribe(response => {
                if (response) {
                    this.alerts.push({
                        type: 'success',
                        msg: `"${this.story.title}" saved`,
                        timeout: 3000
                    });
                    this.shared.state.storyChanged = false;
                }
            });
    }
}
