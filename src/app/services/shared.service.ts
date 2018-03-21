import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    constructor() { }

    config = {
        api: 'http://localhost:3000'
    }
}
