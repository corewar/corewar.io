define(["require", "exports"], function (require, exports) {
    var EndCondition = (function () {
        function EndCondition() {
        }
        EndCondition.prototype.check = function (state) {
            if (state.cycle === state.options.cyclesBeforeTie) {
                return true;
            }
            var liveWarriors = _(state.warriors).filter(function (warrior) { return warrior.tasks.length > 0; });
            if (state.warriors.length > 1) {
                return liveWarriors.length === 1;
            }
            else {
                return liveWarriors.length === 0;
            }
        };
        return EndCondition;
    })();
    exports.EndCondition = EndCondition;
});
//# sourceMappingURL=EndCondition.js.map