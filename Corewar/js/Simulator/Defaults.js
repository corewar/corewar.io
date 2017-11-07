define(["require", "exports", "./Interface/IInstruction", "./Interface/IOperand"], function (require, exports, IInstruction_1, IOperand_1) {
    var Defaults = (function () {
        function Defaults() {
        }
        Defaults.coresize = 8000;
        Defaults.cyclesBeforeTie = 80000;
        Defaults.initialInstruction = {
            address: 0,
            opcode: IInstruction_1.OpcodeType.DAT,
            modifier: IInstruction_1.ModifierType.F,
            aOperand: {
                mode: IOperand_1.ModeType.Direct,
                address: 0
            },
            bOperand: {
                mode: IOperand_1.ModeType.Direct,
                address: 0
            }
        };
        Defaults.instructionLimit = 100;
        Defaults.maxTasks = 8000;
        Defaults.minSeparation = 100;
        return Defaults;
    })();
    exports.Defaults = Defaults;
});
//# sourceMappingURL=Defaults.js.map