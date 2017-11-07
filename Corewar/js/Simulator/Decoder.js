define(["require", "exports", "./Interface/IInstruction"], function (require, exports, IInstruction_1) {
    var Decoder = (function () {
        function Decoder(executive) {
            this.modeTable = [
                this.immediate,
                this.direct,
                this.aIndirect,
                this.bIndirect,
                this.aPreDecrement,
                this.bPreDecrement,
                this.aPostIncrement,
                this.bPostIncrement
            ];
            this.executive = executive;
        }
        Decoder.prototype.decode = function (context) {
            var aAccessor = this.modeTable[context.instruction.aOperand.mode];
            var bAccessor = this.modeTable[context.instruction.bOperand.mode];
            context.aPointer = aAccessor(context.task, context.instructionPointer, context.instruction.aOperand, context.core);
            context.bPointer = bAccessor(context.task, context.instructionPointer, context.instruction.bOperand, context.core);
            context.command = this.executive.commandTable[context.instruction.opcode * IInstruction_1.ModifierType.Count + context.instruction.modifier];
            return context;
        };
        Decoder.prototype.immediate = function (task, ip, operand, core) {
            return ip;
        };
        Decoder.prototype.direct = function (task, ip, operand, core) {
            return ip + operand.address;
        };
        Decoder.prototype.aIndirect = function (task, ip, operand, core) {
            var ipa = ip + operand.address;
            return ipa + core.readAt(task, ipa).aOperand.address;
        };
        Decoder.prototype.bIndirect = function (task, ip, operand, core) {
            var ipa = ip + operand.address;
            return ipa + core.readAt(task, ipa).bOperand.address;
        };
        Decoder.prototype.aPreDecrement = function (task, ip, operand, core) {
            var ipa = ip + operand.address;
            var instruction = core.readAt(task, ipa);
            var value = instruction.aOperand.address;
            var result = ipa + --value;
            instruction.aOperand.address = value;
            core.setAt(task, ipa, instruction);
            return result;
        };
        Decoder.prototype.bPreDecrement = function (task, ip, operand, core) {
            var ipa = ip + operand.address;
            var instruction = core.readAt(task, ipa);
            var value = instruction.bOperand.address;
            var result = ipa + --value;
            instruction.bOperand.address = value;
            core.setAt(task, ipa, instruction);
            return result;
        };
        Decoder.prototype.aPostIncrement = function (task, ip, operand, core) {
            var ipa = ip + operand.address;
            var instruction = core.readAt(task, ipa);
            var value = instruction.aOperand.address;
            var result = ipa + value++;
            instruction.aOperand.address = value;
            core.setAt(task, ipa, instruction);
            return result;
        };
        Decoder.prototype.bPostIncrement = function (task, ip, operand, core) {
            var ipa = ip + operand.address;
            var instruction = core.readAt(task, ipa);
            var value = instruction.bOperand.address;
            var result = ipa + value++;
            instruction.bOperand.address = value;
            core.setAt(task, ipa, instruction);
            return result;
        };
        return Decoder;
    })();
    exports.Decoder = Decoder;
});
//# sourceMappingURL=Decoder.js.map