"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const _ = require("underscore");
const PassBase_1 = require("./PassBase");
class IllegalCommandCheck extends PassBase_1.PassBase {
    processLine() {
        if (this.stream.peek().category === IToken_1.TokenCategory.Opcode) {
            this.checkLine();
        }
        else {
            this.context.emit(this.stream.readToEOL());
        }
    }
    checkLine() {
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
    }
}
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
exports.IllegalCommandCheck = IllegalCommandCheck;
