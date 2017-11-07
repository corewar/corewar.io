define(["require", "exports"], function (require, exports) {
    var Warrior = (function () {
        function Warrior() {
            this.name = "";
            this.author = "";
            this.strategy = "";
            this.instructions = [];
            this.taskIndex = 0;
            this.tasks = [];
            this.startAddress = 0;
        }
        return Warrior;
    })();
    exports.Warrior = Warrior;
});
//# sourceMappingURL=Warrior.js.map