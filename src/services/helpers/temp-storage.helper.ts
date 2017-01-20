export class TempStorage {

    private static TMP_STORAGE_CACHE = { local: {}, session: {} };

    static getStorage (type) {
        return {
            checkErrors() {
              if (!this.TMP_STORAGE_CACHE) {
                  this.TMP_STORAGE_CACHE = { local: {}, session: {} };
              }
              return type ? type : 'session';
            },
            getItem(key) {
                const _type = this.checkErrors();
                return this.TMP_STORAGE_CACHE[_type][key] || void 0
            },
            setItem(key, data) {
                const _type = this.checkErrors();
                return this.TMP_STORAGE_CACHE[_type][key] = data;
            },
            removeItem(key) {
                const _type = this.checkErrors();
                this.TMP_STORAGE_CACHE[_type][key] = void 0;
                delete this.TMP_STORAGE_CACHE[_type][key];
            },
            clear() {
                const _type = this.checkErrors();
                this.TMP_STORAGE_CACHE[_type] = {};
            }
        };
    }
}