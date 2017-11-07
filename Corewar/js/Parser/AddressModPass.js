var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IToken", "./PassBase"], function (require, exports, IToken_1, PassBase_1) {
    var AddressModPass = (function (_super) {
        __extends(AddressModPass, _super);
        function AddressModPass() {
            _super.apply(this, arguments);
        }
        AddressModPass.prototype.processLine = function () {
            while (!this.stream.eof()) {
                if (this.stream.peek().category === IToken_1.TokenCategory.Opcode) {
                    this.processInstruction();
                }
                else {
                    this.context.emit(this.stream.readToEOL());
                }
            }
        };
        AddressModPass.prototype.processInstruction = function () {
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
        };
        AddressModPass.prototype.limitAddress = function (operand) {
            var address = parseInt(operand.address.lexeme, 10);
            address %= this.options.coresize;
            if (address > this.options.coresize / 2) {
                address -= this.options.coresize;
            }
            else if (address < (-this.options.coresize / 2) + 1) {
                address += this.options.coresize;
            }
            operand.address.lexeme = address.toString();
        };
        return AddressModPass;
    })(PassBase_1.PassBase);
    exports.AddressModPass = AddressModPass;
});
//# sourceMappingURL=AddressModPass.js.map