export class TempStorage {

    private static TMP_STORAGE_CACHE = { local: {}, session: {} };

    static getStorage (type) {
        return {
            getItem(key) {
                return this.TMP_STORAGE_CACHE[type][key] || void 0
            },
            setItem(key, data) {
                return this.TMP_STORAGE_CACHE[type][key] = data;
            },
            removeItem(key) {
                this.TMP_STORAGE_CACHE[type][key] = void 0;
                delete this.TMP_STORAGE_CACHE[type][key];
            },
            clear() {
                this.TMP_STORAGE_CACHE[type] = {};
            }
        };
    }
}