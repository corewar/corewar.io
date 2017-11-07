define(["require", "exports"], function (require, exports) {
    var Fetcher = (function () {
        function Fetcher() {
        }
        Fetcher.prototype.fetch = function (state) {
            var wi = state.warriorIndex;
            var warrior = state.warriors[wi];
            var ti = warrior.taskIndex;
            var task = warrior.tasks[ti];
            state.warriorIndex = (wi + 1) % state.warriors.length;
            warrior.taskIndex = (ti + 1) % warrior.tasks.length;
            var ip = task.instructionPointer;
            var instruction = state.core.executeAt(task, ip);
            task.instructionPointer = (ip + 1) % state.options.coresize;
            return {
                core: state.core,
                instructionPointer: ip,
                instruction: instruction,
                taskIndex: ti,
                task: task,
                warriorIndex: wi,
                warrior: warrior
            };
        };
        return Fetcher;
    })();
    exports.Fetcher = Fetcher;
});
//# sourceMappingURL=Fetcher.js.map