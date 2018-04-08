import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { DataService } from '../../../services/data.service';


@Component({
    selector: 'app-storynav',
    templateUrl: './storynav.component.html',
    styleUrls: ['./storynav.component.css']
})
export class StorynavComponent implements OnInit {

    constructor(
        public router: Router,
        public shared: SharedService,
        public data: DataService
    ) {
        router.events.subscribe( (event: Event) => {
            if (event instanceof NavigationEnd) {
                this.routeParts = event.url.substr(1).split('/');
            }
        });
    }

    routeParts = [];

    ngOnInit() {
    }
}
