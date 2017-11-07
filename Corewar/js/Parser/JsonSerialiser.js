define(["require", "exports"], function (require, exports) {
    var JsonSerialiser = (function () {
        function JsonSerialiser() {
        }
        JsonSerialiser.prototype.serialise = function (tokens) {
            return JSON.stringify(tokens);
        };
        return JsonSerialiser;
    })();
    exports.JsonSerialiser = JsonSerialiser;
});
//# sourceMappingURL=JsonSerialiser.js.map