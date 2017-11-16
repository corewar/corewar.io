"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const PassBase_1 = require("./PassBase");
class AddressModPass extends PassBase_1.PassBase {
    processLine() {
        // Apply mod maths to address to ensure that they fall
        // between +/- (CORESIZE / 2)
        while (!this.stream.eof()) {
            if (this.stream.peek().category === IToken_1.TokenCategory.Opcode) {
                this.processInstruction();
            }
            else {
                this.context.emit(this.stream.readToEOL());
            }
        }
    }
    processInstruction() {
        // TODO reuse read instruction?
        var instruction = {
            opcode: this.stream.read(),
            modifier: this.stream.read(),
            aOperand: {
                mode: this.stream.read(),
                address: this.stream.read()
            },
            comma: this.stream.read(),
            bOperand: {
                mode: this.stream.read(),
                address: this.stream.read()
            }
        };
        if (this.stream.peek().category === IToken_1.TokenCategory.Comment) {
            instruction.comment = this.stream.read();
        }
        instruction.eol = this.stream.read();
        this.limitAddress(instruction.aOperand);
        this.limitAddress(instruction.bOperand);
        this.context.emitInstruction(instruction);
    }
    limitAddress(operand) {
        var address = parseInt(operand.address.lexeme, 10);
        address %= this.options.coresize;
        if (address > this.options.coresize / 2) {
            address -= this.options.coresize;
        }
        else if (address < (-this.options.coresize / 2) + 1) {
            address += this.options.coresize;
        }
        operand.address.lexeme = address.toString();
    }
}
exports.AddressModPass = AddressModPass;
