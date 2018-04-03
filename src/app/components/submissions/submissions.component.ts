import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Submission } from '../../classes/submission';

import { NewSubmissionComponent } from './newsubmission/newsubmission.component';

@Component({
    selector: 'app-submissions',
    templateUrl: './submissions.component.html',
    styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {
    constructor(
        private modalService: BsModalService,
        private shared: SharedService,
        private data: DataService
    ) { }

    ngOnInit() { }

    newSub() {
        const submission = new Submission()

        const initialState = { submission }

        this.modalService.show(NewSubmissionComponent, { initialState, class: 'modal-lg' });
        this.modalService.onHide
            .subscribe(hiding => {
                if (this.shared.state.newSubAdded) {
                    // The new storyId will always be the length of the array +1
                    submission.subId = this.data.selectedStory.submissions.length + 1;
                    this.data.selectedStory.submissions.push(submission);
                    this.data.stats.submissions++;
                    this.data.stats.waiting++;
                    this.shared.state.newSubAdded = false;
                }
            });
    }
    saveFutureMarkets() {
        this.data.updateStory(this.data.selectedStory)
            .subscribe(response => {
                if (response) {
                    console.log(response);
                }
            });
    }
}
