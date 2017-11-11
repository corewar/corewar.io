import { IParseInstruction } from "./Interface/IParseInstruction";
import { IToken, TokenCategory } from "./Interface/IToken";
import * as _ from "underscore";
import { PassBase } from "./PassBase";

export class IllegalCommandCheck extends PassBase {


    protected processLine() {

        if (this.stream.peek().category === TokenCategory.Opcode) {
            this.checkLine();
        } else {
            this.context.emit(
                this.stream.readToEOL()
            );
        }
    }

    private static LegalCommands: string[] = [
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

    private checkLine() {

        var instruction: IParseInstruction = {
            opcode: this.stream.expect(TokenCategory.Opcode),
            modifier: this.stream.expect(TokenCategory.Modifier),
            aOperand: {
                mode: this.stream.expect(TokenCategory.Mode),
                address: this.stream.expect(TokenCategory.Number)
            },
            comma: this.stream.expect(TokenCategory.Comma),
            bOperand: {
                mode: this.stream.expect(TokenCategory.Mode),
                address: this.stream.expect(TokenCategory.Number)
            }
        };

        var hash = instruction.opcode.lexeme +
            instruction.aOperand.mode.lexeme +
            instruction.bOperand.mode.lexeme;

        if (!_(IllegalCommandCheck.LegalCommands).contains(hash)) {

            this.stream.error(
                instruction.opcode,
                "Illegal addressing mode under selected Corewar standard");
        }

        this.context.emitInstruction(instruction);
        this.context.emit(this.stream.readToEOL());
    }
}
