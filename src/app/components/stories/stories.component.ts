import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { DataService } from '../../services/data.service';

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

  blah:Object = {};

  ngOnInit() {
      this.data.getStories()
        .subscribe(data => this.blah = data);
  }

}
