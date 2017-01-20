// Helper
import { WebStorageHelper, storageType } from './helpers/web-storage.helper';

export class WebStorageService {

    private _crypto = true;

    constructor(private type: storageType = 'session') {
        // Empty
    }

    set crypto(enabled: boolean) {
        this._crypto = enabled;
    }

    public put(key: string, value: any): void {
        return WebStorageHelper.put(this.type, key, value, this._crypto);
    }

    public get(key: string): any {
        return WebStorageHelper.get(this.type, key, this._crypto);
    }

    public empty(): void {
        WebStorageHelper.empty(this.type);
    }
}