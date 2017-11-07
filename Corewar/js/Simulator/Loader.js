define(["require", "exports"], function (require, exports) {
    var Loader = (function () {
        function Loader(random, core, warriorLoader) {
            this.random = random;
            this.warriorLoader = warriorLoader;
            this.core = core;
        }
        Loader.prototype.load = function (warriors, options) {
            var _this = this;
            var result = [];
            _(warriors).forEach(function (w) {
                var address = _this.getValidAddress(result, options);
                result.push(_this.warriorLoader.load(address, w));
            });
            return result;
        };
        Loader.prototype.getValidAddress = function (warriors, options) {
            while (true) {
                var address = this.random.get(options.coresize);
                if (this.isValidAddress(address, warriors, options)) {
                    return address;
                }
            }
        };
        Loader.prototype.isValidAddress = function (address, warriors, options) {
            var valid = true;
            var core = this.core;
            var instructionLimitLess1 = options.instructionLimit - 1;
            var minSeparationLess1 = options.minSeparation - 1;
            _(warriors).forEach(function (w) {
                var s0 = address;
                var f0 = address + instructionLimitLess1;
                var s1 = w.startAddress - minSeparationLess1;
                var f1 = w.startAddress + minSeparationLess1 + instructionLimitLess1;
                s0 = core.wrap(s0);
                f0 = core.wrap(f0);
                s1 = core.wrap(s1);
                f1 = core.wrap(f1);
                if (s0 <= f0) {
                    if (s1 <= f1) {
                        if (s0 <= f1 && s1 <= f0) {
                            valid = false;
                            return;
                        }
                    }
                    else if (s0 <= f1 || s1 <= f0) {
                        valid = false;
                        return;
                    }
                }
                else if (s0 <= f1 || s1 <= f0) {
                    valid = false;
                    return;
                }
            });
            return valid;
        };
        return Loader;
    })();
    exports.Loader = Loader;
});
//# sourceMappingURL=Loader.js.map