// Helper
import { WebStorageHelper, storageType } from './helpers/web-storage.helper';

export class WebStorageService {

    constructor(private type: storageType = 'session') {
        // Empty
    }

    public put(key: string, value: any): void {
        return WebStorageHelper.put(this.type, key, value);
    }

    public get(key: string): any {
        return WebStorageHelper.get(this.type, key);
    }

    public empty(): void {
        WebStorageHelper.empty(this.type);
    }
}