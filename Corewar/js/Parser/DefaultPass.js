var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Interface/IParseOptions", "./Interface/IToken", "./PassBase"], function (require, exports, IParseOptions_1, IToken_1, PassBase_1) {
    var DefaultPass = (function (_super) {
        __extends(DefaultPass, _super);
        function DefaultPass() {
            _super.apply(this, arguments);
        }
        DefaultPass.prototype.processLine = function () {
            var next = this.stream.peek();
            if (next.category === IToken_1.TokenCategory.Opcode) {
                this.processInstruction();
            }
            else {
                this.context.emit(this.stream.readToEOL());
            }
        };
        DefaultPass.prototype.processInstruction = function () {
            var instruction = this.readInstruction();
            if (instruction.aOperand.address === null) {
                this.context.emit([
                    instruction.opcode,
                    instruction.modifier,
                    instruction.aOperand.mode
                ]);
                this.context.emit(this.stream.readToEOL());
                return;
            }
            this.defaultBOperand(instruction);
            this.defaultModifier(instruction);
            this.emitInstruction(instruction);
        };
        DefaultPass.prototype.readInstruction = function () {
            var instruction = {};
            instruction.opcode = this.stream.expect(IToken_1.TokenCategory.Opcode);
            instruction.modifier = this.tryRead(IToken_1.TokenCategory.Modifier);
            instruction.aOperand = {
                mode: this.readOrDefaultMode(instruction.opcode),
                address: this.tryRead(IToken_1.TokenCategory.Number)
            };
            instruction.comma = null;
            if (this.options.standard <= IParseOptions_1.Standard.ICWS88) {
                instruction.comma = this.readOrDefaultComma();
            }
            else if (this.stream.peek().category === IToken_1.TokenCategory.Comma) {
                instruction.comma = this.stream.read();
            }
            instruction.bOperand = {
                mode: this.readOrDefaultMode(instruction.opcode),
                address: this.tryRead(IToken_1.TokenCategory.Number)
            };
            return instruction;
        };
        DefaultPass.prototype.tryRead = function (category) {
            if (this.stream.peek().category === category) {
                return this.stream.read();
            }
            return null;
        };
        DefaultPass.prototype.readOrDefaultComma = function () {
            if (this.stream.peek().category === IToken_1.TokenCategory.Comma) {
                return this.stream.read();
            }
            else {
                return {
                    category: IToken_1.TokenCategory.Comma,
                    lexeme: ",",
                    position: _.clone(this.stream.peek().position)
                };
            }
        };
        DefaultPass.prototype.readOrDefaultMode = function (opcode) {
            if (this.stream.peek().category === IToken_1.TokenCategory.Mode) {
                return this.stream.read();
            }
            else {
                var mode = "$";
                if (this.options.standard < IParseOptions_1.Standard.ICWS94draft &&
                    opcode.lexeme === "DAT") {
                    mode = "#";
                }
                return {
                    category: IToken_1.TokenCategory.Mode,
                    lexeme: mode,
                    position: _.clone(this.stream.peek().position)
                };
            }
        };
        DefaultPass.prototype.defaultBOperand = function (instruction) {
            if (instruction.bOperand.address === null) {
                if (instruction.comma === null) {
                    instruction.comma = {
                        category: IToken_1.TokenCategory.Comma,
                        lexeme: ",",
                        position: _.clone(this.stream.peek().position)
                    };
                }
                instruction.bOperand.address = {
                    category: IToken_1.TokenCategory.Number,
                    lexeme: "0",
                    position: _.clone(this.stream.peek().position)
                };
                if (instruction.opcode.lexeme === "DAT") {
                    instruction.bOperand.mode.lexeme = "#";
                    var tempOperand = instruction.aOperand;
                    instruction.aOperand = instruction.bOperand;
                    instruction.bOperand = tempOperand;
                    instruction.aOperand.address.position = instruction.bOperand.address.position;
                    instruction.aOperand.mode.position = instruction.bOperand.mode.position;
                }
            }
        };
        DefaultPass.prototype.defaultModifier = function (instruction) {
            if (instruction.modifier === null) {
                var token = {
                    category: IToken_1.TokenCategory.Modifier,
                    position: _.clone(instruction.opcode.position),
                    lexeme: ""
                };
                switch (instruction.opcode.lexeme) {
                    case "DAT":
                        token.lexeme = ".F";
                        break;
                    case "MOV":
                    case "CMP":
                    case "SEQ":
                    case "SNE":
                        if (instruction.aOperand.mode.lexeme === "#") {
                            token.lexeme = ".AB";
                        }
                        else if (instruction.bOperand.mode.lexeme === "#") {
                            token.lexeme = ".B";
                        }
                        else {
                            token.lexeme = ".I";
                        }
                        break;
                    case "ADD":
                    case "SUB":
                    case "MUL":
                    case "DIV":
                    case "MOD":
                        if (instruction.aOperand.mode.lexeme === "#") {
                            token.lexeme = ".AB";
                        }
                        else if (instruction.bOperand.mode.lexeme === "#") {
                            token.lexeme = ".B";
                        }
                        else if (this.options.standard !== IParseOptions_1.Standard.ICWS86) {
                            token.lexeme = ".F";
                        }
                        else {
                            token.lexeme = ".B";
                        }
                        break;
                    case "SLT":
                        if (instruction.aOperand.mode.lexeme === "#") {
                            token.lexeme = ".AB";
                        }
                        else {
                            token.lexeme = ".B";
                        }
                        break;
                    case "JMP":
                    case "JMZ":
                    case "JMN":
                    case "DJN":
                    case "SPL":
                    case "NOP":
                        token.lexeme = ".B";
                        break;
                    default:
                        instruction.modifier = null;
                        break;
                }
                instruction.modifier = token;
            }
        };
        DefaultPass.prototype.emitInstruction = function (instruction) {
            this.context.emitSingle(instruction.opcode);
            if (instruction.modifier !== null) {
                this.context.emitSingle(instruction.modifier);
            }
            this.context.emit([instruction.aOperand.mode, instruction.aOperand.address]);
            if (instruction.comma !== null) {
                this.context.emitSingle(instruction.comma);
            }
            this.context.emit([instruction.bOperand.mode, instruction.bOperand.address]);
            this.context.emit(this.stream.readToEOL());
        };
        return DefaultPass;
    })(PassBase_1.PassBase);
    exports.DefaultPass = DefaultPass;
});
//# sourceMappingURL=DefaultPass.js.map