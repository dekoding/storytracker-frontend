import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { SharedService } from '../../../services/shared.service';
import { DataService } from '../../../services/data.service';

import { Story } from '../../../classes/story';

@Component({
    selector: 'modal-content',
    templateUrl: './newstory.component.html',
    styleUrls: ['./newstory.component.css']
})
export class NewStoryComponent implements OnInit {
    constructor(
        public shared: SharedService,
        public data: DataService,
        public bsModalRef: BsModalRef
    ) { }

    more:boolean = false;
    story:Story;
    ngOnInit() {
    }

    cancel() {
        this.bsModalRef.hide();
    }

    save() {
        this.data.createStory(this.story)
            .subscribe(response => {
                if(response) {
                    this.shared.state.newStoryAdded = true;
                    if(!this.more) {
                        this.bsModalRef.hide();
                    }
                }
            });
    }
}
