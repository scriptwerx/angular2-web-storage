import { Constants } from '../../app.constants';
import { TempStorage } from './temp-storage.helper';

/**
 *
 */
export interface IWebStorage {
    getItem: (key: string) => string;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
}

/**
 *
 */
export type storageType = 'session' | 'local';

/**
 *
 */
export class WebStorageHelper {

    /**
     *
     */
    private static STORAGE_CACHE = { local: {}, session: {} };
    private static IS_STORAGE_ACTIVE = { local: void 0, session: void 0 };
    private static readonly ONE_DAY = 24 * 60 * 60 * 1000;

    /**
     *
     * @param type
     * @param key
     * @param decrypt
     * @returns {any}
     */
    static get(type: storageType, key: string): any {

        let item;
        type = type ? type : 'session'; // @FIXME: iOS fix - why?

        if (this.getFromCache(type, key)) {
            item = this.getFromCache(type, key);
        } else {
            const tmpData = this.getStorage(type).getItem(Constants.STORAGE_PREFIX + key); // @FIXME: iOS fix - why?
            item = tmpData ? JSON.parse(tmpData) : void 0;
        }

        if (!item) {
            return void 0;
        }

        if (item.expires && item.expires < new Date().getTime()) {
            this.remove(type, key);
            return void 0;
        }

        return item.data;
    }

    /**
     *
     * @param type
     * @param key
     * @param value
     * @returns {any}
     */
    static put = function (type, key, value): any {

        const dataToStore = {
            data: value,
            expires: arguments.length > 2 && parseInt(arguments[2], 10) ? new Date().getTime() + (arguments[2] * this.ONE_DAY) : void 0
        };

        this.STORAGE_CACHE[type][key] = dataToStore;
        this.getStorage(type).setItem(Constants.STORAGE_PREFIX + key, JSON.stringify(dataToStore));

        return value;
    };

    /**
     *
     * @param type
     * @param key
     */
    static remove(type: storageType, key: string) {
        this.put(type, key, void 0);
        this.getStorage(type).removeItem(Constants.STORAGE_PREFIX + key);

        this.STORAGE_CACHE[type][key] = void 0;
        delete this.STORAGE_CACHE[type][key];
    }

    /**
     *
     * @param type
     */
    static empty = function (type: storageType) {
        this.getStorage(type).clear();
        this.STORAGE_CACHE[type] = {};
    };

    /**
     *
     * @param type
     * @param key
     * @returns {any}
     */
    private static getFromCache(type: storageType, key: string): any {
        return this.STORAGE_CACHE[type][key] || void 0;
    }

    /**
     *
     * @param type
     * @returns {IWebStorage}
     */
    private static getStorage(type: storageType): IWebStorage {
        type = type || 'session';
        return this.isStorageAvailable(type) ? this.getWebStorage(type) : TempStorage.getStorage(type);
    }

    /**
     *
     * @param type
     * @returns {Storage}
     */
    private static getWebStorage(type: storageType): IWebStorage {
        return type === 'session' ? sessionStorage : localStorage;
    }

    /**
     *
     * @param type
     * @returns {boolean}
     */
    private static isStorageAvailable(type: storageType): boolean {

        if (typeof this.IS_STORAGE_ACTIVE[type] === 'boolean') {
            return this.IS_STORAGE_ACTIVE[type];
        }

        let isStorageAvailable = true,
            webStorage = type === 'session' ? sessionStorage : localStorage;

        try {
            let key = 'swxTest_' + Math.round(Math.random() * 1e7);
            webStorage.setItem(key, 'test');
            webStorage.removeItem(key);
        } catch (e) {
            isStorageAvailable = false;
        }

        return this.IS_STORAGE_ACTIVE[type] = isStorageAvailable;
    }

}
