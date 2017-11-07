define(["require", "exports", "./Interface/IInstruction", "./Interface/IOperand", "../Parser/Interface/IToken", "../Parser/TokenStream", "./Warrior"], function (require, exports, IInstruction_1, IOperand_1, IToken_1, TokenStream_1, Warrior_1) {
    var WarriorLoader = (function () {
        function WarriorLoader(core) {
            this.core = core;
        }
        WarriorLoader.prototype.load = function (address, result) {
            this.stream = new TokenStream_1.TokenStream(result.tokens, result.messages);
            this.address = address;
            this.warrior = new Warrior_1.Warrior();
            this.warrior.startAddress = address;
            this.readInstructions();
            this.loadProcess();
            this.warrior.name = result.metaData.name;
            this.warrior.author = result.metaData.author;
            this.warrior.strategy = result.metaData.strategy;
            return this.warrior;
        };
        WarriorLoader.prototype.readInstructions = function () {
            while (!this.stream.eof()) {
                var next = this.stream.peek();
                if (next.category === IToken_1.TokenCategory.Opcode) {
                    this.core.setAt(this.warrior.tasks[0], this.address++, this.readInstruction());
                }
                else if (next.category === IToken_1.TokenCategory.Preprocessor) {
                    this.startAddress = this.readOrg();
                }
                else {
                    this.stream.readToEOL();
                }
            }
        };
        WarriorLoader.prototype.readInstruction = function () {
            var parseInstruction = this.readParseInstruction();
            var instruction = {
                address: this.address,
                opcode: this.getOpcode(parseInstruction),
                modifier: this.getModifier(parseInstruction),
                aOperand: this.getOperand(parseInstruction.aOperand),
                bOperand: this.getOperand(parseInstruction.bOperand)
            };
            return instruction;
        };
        WarriorLoader.prototype.readOrg = function () {
            this.stream.read();
            var token = this.stream.read();
            this.stream.readToEOL();
            return this.address + parseInt(token.lexeme, 10);
        };
        WarriorLoader.prototype.readParseInstruction = function () {
            var result = {
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
            this.stream.readToEOL();
            return result;
        };
        WarriorLoader.prototype.getOpcode = function (instruction) {
            switch (instruction.opcode.lexeme) {
                case "DAT":
                    return IInstruction_1.OpcodeType.DAT;
                case "MOV":
                    return IInstruction_1.OpcodeType.MOV;
                case "ADD":
                    return IInstruction_1.OpcodeType.ADD;
                case "SUB":
                    return IInstruction_1.OpcodeType.SUB;
                case "MUL":
                    return IInstruction_1.OpcodeType.MUL;
                case "DIV":
                    return IInstruction_1.OpcodeType.DIV;
                case "MOD":
                    return IInstruction_1.OpcodeType.MOD;
                case "JMP":
                    return IInstruction_1.OpcodeType.JMP;
                case "JMZ":
                    return IInstruction_1.OpcodeType.JMZ;
                case "JMN":
                    return IInstruction_1.OpcodeType.JMN;
                case "DJN":
                    return IInstruction_1.OpcodeType.DJN;
                case "CMP":
                    return IInstruction_1.OpcodeType.CMP;
                case "SEQ":
                    return IInstruction_1.OpcodeType.SEQ;
                case "SNE":
                    return IInstruction_1.OpcodeType.SNE;
                case "SLT":
                    return IInstruction_1.OpcodeType.SLT;
                case "SPL":
                    return IInstruction_1.OpcodeType.SPL;
                default:
                    return IInstruction_1.OpcodeType.NOP;
            }
        };
        WarriorLoader.prototype.getModifier = function (instruction) {
            switch (instruction.modifier.lexeme) {
                case ".A":
                    return IInstruction_1.ModifierType.A;
                case ".B":
                    return IInstruction_1.ModifierType.B;
                case ".BA":
                    return IInstruction_1.ModifierType.BA;
                case ".F":
                    return IInstruction_1.ModifierType.F;
                case ".I":
                    return IInstruction_1.ModifierType.I;
                case ".X":
                    return IInstruction_1.ModifierType.X;
                default:
                    return IInstruction_1.ModifierType.AB;
            }
        };
        WarriorLoader.prototype.getOperand = function (operand) {
            var result = {
                mode: 0,
                address: parseInt(operand.address.lexeme, 10)
            };
            switch (operand.mode.lexeme) {
                case "#":
                    result.mode = IOperand_1.ModeType.Immediate;
                    break;
                case "*":
                    result.mode = IOperand_1.ModeType.AIndirect;
                    break;
                case "@":
                    result.mode = IOperand_1.ModeType.BIndirect;
                    break;
                case "{":
                    result.mode = IOperand_1.ModeType.APreDecrement;
                    break;
                case "<":
                    result.mode = IOperand_1.ModeType.BPreDecrement;
                    break;
                case "}":
                    result.mode = IOperand_1.ModeType.APostIncrement;
                    break;
                case ">":
                    result.mode = IOperand_1.ModeType.BPostIncrement;
                    break;
                default:
                    result.mode = IOperand_1.ModeType.Direct;
                    break;
            }
            return result;
        };
        WarriorLoader.prototype.loadProcess = function () {
            this.warrior.tasks.push({
                instructionPointer: this.startAddress,
                warrior: this.warrior
            });
            this.warrior.taskIndex = 0;
        };
        return WarriorLoader;
    })();
    exports.WarriorLoader = WarriorLoader;
});
//# sourceMappingURL=WarriorLoader.js.map