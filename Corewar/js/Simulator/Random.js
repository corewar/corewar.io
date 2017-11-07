define(["require", "exports"], function (require, exports) {
    var Random = (function () {
        function Random() {
        }
        Random.prototype.get = function (max) {
            return Math.floor(Math.random() * max);
        };
        return Random;
    })();
    exports.Random = Random;
});
//# sourceMappingURL=Random.js.map