// Angular2
import { NgModule } from '@angular/core';

// Services
import { LocalStorageService, SessionStorageService } from './services';

@NgModule({
    providers: [LocalStorageService, SessionStorageService]
})

export class WebStorage {
    // Empty
}
