import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { SharedService } from '../../../services/shared.service';
import { DataService } from '../../../services/data.service';

import { Reader } from '../../../classes/reader';

@Component({
    selector: 'modal-content',
    templateUrl: './newreader.component.html',
    styleUrls: ['./newreader.component.css']
})
export class NewReaderComponent implements OnInit {
    constructor(
        public shared: SharedService,
        public data: DataService,
        public bsModalRef: BsModalRef
    ) { }

    reader:Reader;
    ngOnInit() {
    }

    cancel() {
        this.bsModalRef.hide();
    }

    save() {
        this.data.createReader(this.shared.state.storyId, this.reader)
            .subscribe(response => {
                if(response) {
                    this.shared.state.newReaderAdded = true;
                    this.bsModalRef.hide();
                }
            });
    }
}
