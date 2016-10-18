// Angular 2
import { Injectable } from '@angular/core';

// Service
import { WebStorageService } from './web-storage.service';

@Injectable()
export class SessionStorageService extends WebStorageService {

    constructor() {
        super('session');
    }

}