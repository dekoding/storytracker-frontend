import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { SharedService } from '../../../services/shared.service';
import { DataService } from '../../../services/data.service';

import { Submission } from '../../../classes/submission';

@Component({
    selector: 'modal-content',
    templateUrl: './newsubmission.component.html',
    styleUrls: ['./newsubmission.component.css']
})
export class NewSubmissionComponent implements OnInit {
    constructor(
        private shared: SharedService,
        private data: DataService,
        public bsModalRef: BsModalRef
    ) { }

    submission:Submission;
    ngOnInit() {
    }

    cancel() {
        this.bsModalRef.hide();
    }

    save() {
        this.data.createSubmission(this.shared.state.storyId, this.submission)
            .subscribe(response => {
                if(response) {
                    this.shared.state.newSubAdded = true;
                    this.bsModalRef.hide();
                }
            });
    }
}
