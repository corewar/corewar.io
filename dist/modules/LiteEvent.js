"use strict";
//http://stackoverflow.com/questions/12881212/does-typescript-support-events-on-classes
Object.defineProperty(exports, "__esModule", { value: true });
class LiteEvent {
    constructor() {
        this.handlers = [];
    }
    subscribe(handler) {
        this.handlers.push(handler);
    }
    unsubscribe(handler) {
        this.handlers = this.handlers.filter(h => h !== handler);
    }
    trigger(data) {
        if (this.handlers) {
            this.handlers.slice(0).forEach(h => h(data));
        }
    }
}
exports.LiteEvent = LiteEvent;
