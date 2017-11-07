define(["require", "exports"], function (require, exports) {
    (function (CoreAccessType) {
        CoreAccessType[CoreAccessType["read"] = 0] = "read";
        CoreAccessType[CoreAccessType["write"] = 1] = "write";
        CoreAccessType[CoreAccessType["execute"] = 2] = "execute";
    })(exports.CoreAccessType || (exports.CoreAccessType = {}));
    var CoreAccessType = exports.CoreAccessType;
});
//# sourceMappingURL=ICore.js.map