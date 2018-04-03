import { Component, OnInit, DoCheck, IterableDiffers, KeyValueDiffers, KeyValueDiffer } from '@angular/core';

import { SharedService } from '../../../services/shared.service';
import { DataService } from '../../../services/data.service';

import { Submission } from '../../../classes/submission';

@Component({
    selector: 'app-submission',
    templateUrl: './submission.component.html',
    styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit, DoCheck {

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

    submission:Submission = new Submission();

    alerts:any[] = [];

    submissionSet:boolean = false;

    ngOnInit() {
        if (this.data.selectedStory.submissions.length > 0) {
            this.setSubmission();
        }
    }

    ngDoCheck() {
        const arraychanges = this.arrayDiffer.diff(this.data.selectedStory.submissions);
        if (arraychanges && !this.submissionSet) {
            this.setSubmission();
        }
        if (this.submission.subId) {
            const diff = this.differ.diff(this.submission);
            if (diff !== null) {
                let changes = 0;
                diff.forEachChangedItem(item => {
                    changes ++;
                });
                if (changes > 0) {
                    this.shared.state.submissionChanged = true;
                }
            }
        }
    }

    setSubmission() {
        this.submission = this.data.selectedStory.submissions.find(sub => sub.subId === this.shared.state.subId);
        this.differ = this.keyValueDiffers.find(this.submission).create();
        this.submissionSet = true;
    }

    save() {
        this.data.updateSubmission(this.shared.state.storyId, this.submission)
            .subscribe(response => {
                if (response) {
                    this.alerts.push({
                        type: 'success',
                        msg: `Submission to "${this.submission.market}" saved`,
                        timeout: 3000
                    });
                    this.shared.state.submissionChanged = false;
                }
            });
    }
}
