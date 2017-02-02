export class Constants {

    private static PREFIX = 'swx-';

    public static get STORAGE_PREFIX(): string {
        return this.PREFIX;
    }

    public static set STORAGE_PREFIX(prefix: string) {
        this.PREFIX = prefix;
    }

}
