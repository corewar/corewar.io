var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IToken", "./PassBase"], function (require, exports, IToken_1, PassBase_1) {
    var IllegalCommandCheck = (function (_super) {
        __extends(IllegalCommandCheck, _super);
        function IllegalCommandCheck() {
            _super.apply(this, arguments);
        }
        IllegalCommandCheck.prototype.processLine = function () {
            if (this.stream.peek().category === IToken_1.TokenCategory.Opcode) {
                this.checkLine();
            }
            else {
                this.context.emit(this.stream.readToEOL());
            }
        };
        IllegalCommandCheck.prototype.checkLine = function () {
            var instruction = {
                opcode: this.stream.expect(IToken_1.TokenCategory.Opcode),
                modifier: this.stream.expect(IToken_1.TokenCategory.Modifier),
                aOperand: {
                    mode: this.stream.expect(IToken_1.TokenCategory.Mode),
                    address: this.stream.expect(IToken_1.TokenCategory.Number)
                },
                comma: this.stream.expect(IToken_1.TokenCategory.Comma),
                bOperand: {
                    mode: this.stream.expect(IToken_1.TokenCategory.Mode),
                    address: this.stream.expect(IToken_1.TokenCategory.Number)
                }
            };
            var hash = instruction.opcode.lexeme +
                instruction.aOperand.mode.lexeme +
                instruction.bOperand.mode.lexeme;
            if (!_(IllegalCommandCheck.LegalCommands).contains(hash)) {
                this.stream.error(instruction.opcode, "Illegal addressing mode under selected Corewar standard");
            }
            this.context.emitInstruction(instruction);
            this.context.emit(this.stream.readToEOL());
        };
        IllegalCommandCheck.LegalCommands = [
            "ADD#$", "ADD#@", "ADD#<", "ADD$$", "ADD$@",
            "ADD$<", "ADD@$", "ADD@@", "ADD@<", "ADD<$",
            "ADD<@", "ADD<<", "CMP#$", "CMP#@", "CMP#<",
            "CMP$$", "CMP$@", "CMP$<", "CMP@$", "CMP@@",
            "CMP@<", "CMP<$", "CMP<@", "CMP<<", "DAT##",
            "DAT#<", "DAT<#", "DAT<<", "DJN$#", "DJN$$",
            "DJN$@", "DJN$<", "DJN@#", "DJN@$", "DJN@@",
            "DJN@<", "DJN<#", "DJN<$", "DJN<@", "DJN<<",
            "JMN$#", "JMN$$", "JMN$@", "JMN$<", "JMN@#",
            "JMN@$", "JMN@@", "JMN@<", "JMN<#", "JMN<$",
            "JMN<@", "JMN<<", "JMP$#", "JMP$$", "JMP$@",
            "JMP$<", "JMP@#", "JMP@$", "JMP@@", "JMP@<",
            "JMP<#", "JMP<$", "JMP<@", "JMP<<", "JMZ$#",
            "JMZ$$", "JMZ$@", "JMZ$<", "JMZ@#", "JMZ@$",
            "JMZ@@", "JMZ@<", "JMZ<#", "JMZ<$", "JMZ<@",
            "JMZ<<", "MOV#$", "MOV#@", "MOV#<", "MOV$$",
            "MOV$@", "MOV$<", "MOV@$", "MOV@@", "MOV@<",
            "MOV<$", "MOV<@", "MOV<<", "SLT#$", "SLT#@",
            "SLT#<", "SLT$$", "SLT$@", "SLT$<", "SLT@$",
            "SLT@@", "SLT@<", "SLT<$", "SLT<@", "SLT<<",
            "SPL$#", "SPL$$", "SPL$@", "SPL$<", "SPL@#",
            "SPL@$", "SPL@@", "SPL@<", "SPL<#", "SPL<$",
            "SPL<@", "SPL<<", "SUB#$", "SUB#@", "SUB#<",
            "SUB$$", "SUB$@", "SUB$<", "SUB@$", "SUB@@",
            "SUB@<", "SUB<$", "SUB<@", "SUB<<"
        ];
        return IllegalCommandCheck;
    })(PassBase_1.PassBase);
    exports.IllegalCommandCheck = IllegalCommandCheck;
});
//# sourceMappingURL=IllegalCommandCheck.js.map