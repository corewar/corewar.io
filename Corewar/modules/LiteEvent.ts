//http://stackoverflow.com/questions/12881212/does-typescript-support-events-on-classes

export interface ILiteEvent<T> {
    subscribe(handler: { (data?: T): void }): void;
    unsubscribe(handler: { (data?: T): void }): void;
}

export class LiteEvent<T> implements ILiteEvent<T> {
    private handlers: { (data?: T): void; }[] = [];

    public subscribe(handler: { (data?: T): void }) {
        this.handlers.push(handler);
    }

    public unsubscribe(handler: { (data?: T): void }) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }

    public trigger(data?: T) {
        if (this.handlers) {
            this.handlers.slice(0).forEach(h => h(data));
        }
    }
}
