import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Reader } from '../../classes/reader';

import { NewReaderComponent } from './newreader/newreader.component';

@Component({
    selector: 'modal-content',
    templateUrl: './readers.component.html',
    styleUrls: ['./readers.component.css']
})
export class ReadersComponent implements OnInit {
    constructor(
        private modalService: BsModalService,
        private shared: SharedService,
        private data: DataService
    ) { }

    ngOnInit() {
    }

    newReader() {
        const reader = new Reader()

        const initialState = { reader }

        this.modalService.show(NewReaderComponent, { initialState, class: 'modal-lg' });
        this.modalService.onHide
            .subscribe(hiding => {
                if (this.shared.state.newReaderAdded) {
                    // The new storyId will always be the length of the array +1
                    reader.readerId = this.data.selectedStory.readers.length + 1;
                    this.data.selectedStory.readers.push(reader);
                    this.shared.state.newReaderAdded = false;
                }
            });
    }
}
