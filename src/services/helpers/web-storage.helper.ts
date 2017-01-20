import { Constants } from '../../app.constants';
import { TempStorage } from './temp-storage.helper';

export interface IWebStorage {
    getItem: (key: string) => string;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
}

export type storageType = 'session' | 'local';

export class WebStorageHelper {

    private static STORAGE_CACHE = { local: {}, session: {} };
    private static IS_STORAGE_ACTIVE = { local: void 0, session: void 0 };
    private static readonly ONE_DAY = 24 * 60 * 60 * 1000;

    private static crypto: any;
    private static _key: string;

    /**
     *
     * @param type
     * @param key
     * @param decrypt
     * @returns {any}
     */
    static get(type: storageType, key: string, decrypt?: boolean) {

        let item;

        if (this.getFromCache(type, key)) {
            item = this.getFromCache(type, key);
        } else {
            item = JSON.parse(this.getStorage(type).getItem(Constants.STORAGE_PREFIX + key));
        }

        if (!item) {
            return void 0;
        }

        if (this.isWebCryptoAvailable && decrypt) {
            // @TODO: Decrypt data here
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
     * @param encrypt
     * @returns {any}
     */
    static put = function (type, key, value, encrypt?: boolean) {

        let dataToStore = { data: value, expires: void 0 };

        if (arguments.length > 2 && parseInt(arguments[2], 10)) {
            dataToStore.expires = new Date().getTime() + (arguments[2] * this.ONE_DAY);
        }

        if (this.isWebCryptoAvailable && encrypt) {
            // @TODO: Encrypt data here
        }

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
    private static getFromCache(type: storageType, key: string) {
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
     */
    private static generateKey() {
        this.crypto.subtle.generateKey({ name: "AES-CTR", length: 128, }, false, ["encrypt", "decrypt"])
            .then(function (key) {
                this._key = key;
            })
            .catch(function (err) {
                console['error']('Error generating key:', err);
            });
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
            webStorage = type === 'session' ?  sessionStorage : localStorage;

        try {
            let key = 'swxTest_' + Math.round(Math.random() * 1e7);
            webStorage.setItem(key, 'test');
            webStorage.removeItem(key);
        }
        catch (e) {
            isStorageAvailable = false;
        }

        return this.IS_STORAGE_ACTIVE[type] = isStorageAvailable;
    }

    /**
     *
     * @returns {boolean}
     */
    private static get isWebCryptoAvailable() {
        this.crypto = window.crypto || window['msCrypto'];
        return !!this.crypto && !!this.crypto.subtle;
    }

}
