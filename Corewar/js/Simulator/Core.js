define(["require", "exports", "../modules/LiteEvent", "./Interface/ICore"], function (require, exports, LiteEvent_1, ICore_1) {
    var Core = (function () {
        function Core() {
            this.instructions = null;
            this._coreAccess = new LiteEvent_1.LiteEvent();
        }
        Object.defineProperty(Core.prototype, "coreAccess", {
            get: function () {
                return this._coreAccess;
            },
            enumerable: true,
            configurable: true
        });
        Core.prototype.initialise = function (options) {
            this.options = options;
            this.cs = this.options.coresize;
            this.allocateMemory();
        };
        Core.prototype.getSize = function () {
            return this.cs;
        };
        Core.prototype.wrap = function (address) {
            address = address % this.cs;
            address = address >= 0 ? address : address + this.cs;
            return address;
        };
        Core.prototype.triggerEvent = function (task, address, accessType) {
            this._coreAccess.trigger({
                task: task,
                accessType: accessType,
                address: address
            });
        };
        Core.prototype.executeAt = function (task, address) {
            address = this.wrap(address);
            this.triggerEvent(task, address, ICore_1.CoreAccessType.execute);
            return this.instructions[address];
        };
        Core.prototype.readAt = function (task, address) {
            address = this.wrap(address);
            this.triggerEvent(task, address, ICore_1.CoreAccessType.read);
            return this.instructions[address];
        };
        Core.prototype.getAt = function (address) {
            address = this.wrap(address);
            return this.instructions[address];
        };
        Core.prototype.setAt = function (task, address, instruction) {
            address = this.wrap(address);
            this.triggerEvent(task, address, ICore_1.CoreAccessType.write);
            this.instructions[address] = instruction;
        };
        Core.prototype.allocateMemory = function () {
            this.instructions = [];
            for (var i = 0; i < this.cs; i++) {
                this.instructions.push(this.buildDefaultInstruction(i));
            }
        };
        Core.prototype.buildDefaultInstruction = function (index) {
            var instruction = _.clone(this.options.initialInstruction);
            instruction.aOperand = _.clone(instruction.aOperand);
            instruction.bOperand = _.clone(instruction.bOperand);
            instruction.address = index;
            return instruction;
        };
        return Core;
    })();
    exports.Core = Core;
});
//# sourceMappingURL=Core.js.map