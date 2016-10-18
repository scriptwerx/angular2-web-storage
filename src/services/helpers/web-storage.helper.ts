import { Constants } from '../../app.constants';
import { TempStorage } from './temp-storage.helper';

export interface IWebStorage {
    getItem: (key: string) => string;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
}

export type storageType = 'session' | 'local';

export class WebStorageHelper {

    static STORAGE_CACHE = { local: {}, session: {} };
    static STORAGE_ACTIVE = { local: void 0, session: void 0 };
    static ONE_DAY = 24 * 60 * 60 * 1000;

    static get(type: storageType, key: string) {

        let item;

        if (this.getFromCache(type, key)) {
            item = this.getFromCache(type, key);
        } else {
            item = JSON.parse(this.getStorage(type).getItem(Constants.STORAGE_PREFIX + key));
        }

        if (!item) {
            return void 0;
        }

        if (item.expires && item.expires < new Date().getTime()) {
            this.remove(type, key);
            return void 0;
        }

        this.STORAGE_CACHE[type][key] = item;

        return item.data;
    }

    static put = function (type, key, value) {

        let dataToStore = { data: value, expires: void 0 };

        if (arguments.length > 2 && parseInt(arguments[2], 10)) {
            dataToStore.expires = new Date().getTime() + (arguments[2] * this.ONE_DAY);
        }

        this.STORAGE_CACHE[type][key] = dataToStore;

        this.getStorage(type).setItem(Constants.STORAGE_PREFIX + key, JSON.stringify(dataToStore));

        return value;
    };

    static remove(type: storageType, key: string) {
        this.put(type, key, void 0);
        this.getStorage(type).removeItem(Constants.STORAGE_PREFIX + key);

        this.STORAGE_CACHE[type][key] = void 0;
        delete this.STORAGE_CACHE[type][key];
    }

    static empty = function (type: storageType) {
        this.getStorage(type).clear();
        this.STORAGE_CACHE[type] = {};
    };

    static getFromCache(type: storageType, key: string) {
        return this.STORAGE_CACHE[type][key] || void 0;
    }

    static getStorage(type: storageType): IWebStorage {
        return this.isStorageAvailable(type) ? this.getWebStorage(type) : TempStorage.getStorage(type);
    }

    static getWebStorage(type: storageType): IWebStorage {
        return type === 'session' ? sessionStorage : localStorage;
    }

    static isStorageAvailable(type: storageType) {

        if (typeof this.STORAGE_ACTIVE[type] === 'boolean') {
            return this.STORAGE_ACTIVE[type];
        }

        let isStorageAvailable = true,
            webStorage = type === 'local' ? localStorage : sessionStorage;

        try {
            let key = 'swxTest_' + Math.round(Math.random() * 1e7);
            webStorage.setItem(key, 'test');
            webStorage.removeItem(key);
        }
        catch (e) {
            isStorageAvailable = false;
        }

        return this.STORAGE_ACTIVE[type] = isStorageAvailable;
    }

}
