define(["require", "exports"], function (require, exports) {
    (function (MessageType) {
        MessageType[MessageType["Error"] = 0] = "Error";
        MessageType[MessageType["Warning"] = 1] = "Warning";
        MessageType[MessageType["Info"] = 2] = "Info";
    })(exports.MessageType || (exports.MessageType = {}));
    var MessageType = exports.MessageType;
});
//# sourceMappingURL=IMessage.js.map