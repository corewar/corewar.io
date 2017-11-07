define(["require", "exports"], function (require, exports) {
    var LiteEvent = (function () {
        function LiteEvent() {
            this.handlers = [];
        }
        LiteEvent.prototype.subscribe = function (handler) {
            this.handlers.push(handler);
        };
        LiteEvent.prototype.unsubscribe = function (handler) {
            this.handlers = this.handlers.filter(function (h) { return h !== handler; });
        };
        LiteEvent.prototype.trigger = function (data) {
            if (this.handlers) {
                this.handlers.slice(0).forEach(function (h) { return h(data); });
            }
        };
        return LiteEvent;
    })();
    exports.LiteEvent = LiteEvent;
});
//# sourceMappingURL=LiteEvent.js.map