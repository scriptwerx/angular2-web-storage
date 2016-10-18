export class TempStorage {

    static STORAGE_CACHE = { local: {}, session: {} };

    static getStorage (type) {
        return {
            getItem(key) {
                return this.STORAGE_CACHE[type][key] || void 0
            },
            setItem(key, data) {
                return this.STORAGE_CACHE[type][key] = data;
            },
            removeItem(key) {
                this.STORAGE_CACHE[type][key] = void 0;
                delete this.STORAGE_CACHE[type][key];
            },
            clear() {
                this.STORAGE_CACHE[type] = {};
            }
        };
    }
}