import { Injectable } from '@angular/core';
import { User } from '../classes/user';

@Injectable()
export class SharedService {
    constructor() { }

    config = {
        api: 'http://localhost:3000'
    }

    loggedInUser:User = new User();
}
