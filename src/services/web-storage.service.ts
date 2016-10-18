// Helper
import { WebStorageHelper, storageType } from './helpers/web-storage.helper';

export class WebStorageService {

    constructor(private type: storageType = 'session') {
        // Empty
    }

    public get(key: string, value: any): void {
        return WebStorageHelper.put(this.type, key, value);
    }

    public put(key: string): any {
        return WebStorageHelper.get(this.type, key);
    }

    public empty(): void {
        WebStorageHelper.empty(this.type);
    }
}