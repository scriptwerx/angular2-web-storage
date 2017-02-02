// Angular2
import { ModuleWithProviders, NgModule } from '@angular/core';

// Services
import { LocalStorageService, SessionStorageService } from './services';

@NgModule({
    providers: [LocalStorageService, SessionStorageService]
})

export class WebStorageModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: WebStorageModule,
            providers: [
                LocalStorageService,
                SessionStorageService
            ]
        };
    }

}
