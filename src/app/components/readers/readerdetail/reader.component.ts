import { Component, OnInit, DoCheck, IterableDiffers, KeyValueDiffers, KeyValueDiffer } from '@angular/core';

import { SharedService } from '../../../services/shared.service';
import { DataService } from '../../../services/data.service';

import { Reader } from '../../../classes/reader';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit, DoCheck {

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

    reader:Reader = new Reader();

    alerts:any[] = [];

    readerSet:boolean = false;

    ngOnInit() {
        if (this.data.selectedStory.readers.length > 0) {
            this.setReader();
        }
    }

    ngDoCheck() {
        const arraychanges = this.arrayDiffer.diff(this.data.selectedStory.readers);
        if (arraychanges && !this.readerSet) {
            this.setReader();
        }
        if (this.reader.readerId) {
            const diff = this.differ.diff(this.reader);
            if (diff !== null) {
                let changes = 0;
                diff.forEachChangedItem(item => {
                    changes ++;
                });
                if (changes > 0) {
                    this.shared.state.readerChanged = true;
                }
            }
        }
    }

    setReader() {
        this.reader = this.data.selectedStory.readers.find(reader => reader.readerId === this.shared.state.readerId);
        this.differ = this.keyValueDiffers.find(this.reader).create();
        this.readerSet = true;
    }

    save() {
        this.data.updateReader(this.shared.state.storyId, this.reader)
            .subscribe(response => {
                if (response) {
                    this.alerts.push({
                        type: 'success',
                        msg: `Reading record for "${this.reader.name}" saved`,
                        timeout: 3000
                    });
                    this.shared.state.readerChanged = false;
                }
            });
    }

}
