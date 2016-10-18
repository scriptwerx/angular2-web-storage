// Angular 2
import { Injectable } from '@angular/core';

// Service
import { WebStorageService } from './web-storage.service';

@Injectable()
export class LocalStorageService extends WebStorageService {

    constructor() {
        super('local');
    }

}