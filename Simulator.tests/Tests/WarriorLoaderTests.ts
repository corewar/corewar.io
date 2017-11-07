/// <reference path="../references.ts" />

"use strict";

describe("WarriorLoader",() => {

    var instruction = DataHelper.instruction;

    var testTokens = instruction("DAT", ".A", "$", 0, "$", 1)
        .concat(instruction("MOV", ".B", "#", 2, "#", 3))
        .concat(instruction("ADD", ".AB", "*", 4, "*", 5))
        .concat(instruction("SUB", ".BA", "@", 6, "@", 7))
        .concat(instruction("MUL", ".F", "{", 8, "{", 9))
        .concat(instruction("DIV", ".I", "<", 10, "<", 11))
        .concat(instruction("MOD", ".X", "}", 12, "}", 13))
        .concat(instruction("JMP", ".A", ">", 14, ">", 15))
        .concat(instruction("JMZ", ".B", "$", -1, "#", -2))
        .concat(instruction("JMN", ".AB", "#", -3, "*", -4))
        .concat(instruction("DJN", ".BA", "*", -5, "@", -6))
        .concat(instruction("CMP", ".F", "@", -7, "{", -8))
        .concat(instruction("SEQ", ".I", "{", -9, "<", -10))
        .concat(instruction("SNE", ".F", "<", -11, "}", -12))
        .concat(instruction("SLT", ".X", "}", -13, ">", -14))
        .concat(instruction("SPL", ".A", "$", -15, "#", -16))
        .concat(instruction("NOP", ".B", "#", 0, "#", 0));

    function buildCore(size: number): ICore {
        var core = {
            getSize: () => { return 0; },
            coreAccess: new LiteEvent<ICoreAccessEventArgs>(),
            instructions: [],
            initialise: (options: IOptions) => {
                //
            },
            wrap: (index: number): number => {
                return index;
            },
            executeAt: (task: ITask, index: number): IInstruction => {
                return core.instructions[index];
            },
            readAt: (task: ITask, index: number): IInstruction => {
                return core.instructions[index];
            },
            getAt: (index: number): IInstruction => {
                return core.instructions[index];
            },
            setAt: (task: ITask, index: number, instruction: IInstruction) => {
                core.instructions[index] = instruction;
            }
        };
        for (var i = 0; i < size; i++) {
            core.instructions.push({
                address: i,
                opcode: OpcodeType.DAT,
                modifier: ModifierType.F,
                aOperand: {
                    mode: ModeType.Immediate,
                    address: 0
                },
                bOperand: {
                    mode: ModeType.Immediate,
                    address: 0
                }
            });
        }
        return core;
    }

    it("Applies metadata to the warrior",() => {

        var parseResult: IParseResult = {
            tokens: [],
            messages: [],
            metaData: {
                name: "johnSmith",
                author: "Joe Bloggs",
                strategy: "This is a strategy\nit has two lines"
            }
        };

        var core = buildCore(0);

        var loader = new WarriorLoader(core);
        var actual = loader.load(0, parseResult);

        expect(actual.name).toBe("johnSmith");
        expect(actual.author).toBe("Joe Bloggs");
        expect(actual.strategy).toBe("This is a strategy\nit has two lines");
    });

    it("Creates a single process for the warrior",() => {

        var parseResult: IParseResult = DataHelper.buildParseResult([]);
        var core = buildCore(0);

        var loader = new WarriorLoader(core);
        var actual = loader.load(0, parseResult);

        expect(actual.taskIndex).toBe(0);
        expect(actual.tasks.length).toBe(1);
        expect(actual.tasks[0].warrior).toBe(actual);
    });

    it("Sets the starting instruction pointer to the load address offset by the value indicated by the ORG instruction",() => {

        var tokens: IToken[] = [
            {
                category: TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: DataHelper.position
            }, {
                category: TokenCategory.Number,
                lexeme: "4",
                position: DataHelper.position
            }, {
                category: TokenCategory.EOL,
                lexeme: "\n",
                position: DataHelper.position
            }
        ];
        var parseResult: IParseResult = DataHelper.buildParseResult(tokens);

        var core = buildCore(10);

        var loader = new WarriorLoader(core);
        var actual = loader.load(3, parseResult);

        expect(actual.tasks[0].instructionPointer).toBe(7);
    });

    it("Loads the warrior into the core at the specified address",() => {

        var tokens = DataHelper.buildParseResult(instruction("MOV", ".I", "$", 0, "$", 1));
        var core = buildCore(30);

        var loader = new WarriorLoader(core);
        loader.load(21, tokens);

        for (var i = 0; i < 30; i++) {

            if (i === 21) {
                expect(core.readAt(null, i).opcode).toBe(OpcodeType.MOV);
            } else {
                expect(core.readAt(null, i).opcode).toBe(OpcodeType.DAT);
            }
        }
    });

    it("Correctly interprets token opcodes into simulator instructions",() => {

        var core = buildCore(20);

        var loader = new WarriorLoader(core);
        loader.load(0, DataHelper.buildParseResult(testTokens));

        expect(core.readAt(null, 0).opcode).toBe(OpcodeType.DAT);
        expect(core.readAt(null, 1).opcode).toBe(OpcodeType.MOV);
        expect(core.readAt(null, 2).opcode).toBe(OpcodeType.ADD);
        expect(core.readAt(null, 3).opcode).toBe(OpcodeType.SUB);
        expect(core.readAt(null, 4).opcode).toBe(OpcodeType.MUL);
        expect(core.readAt(null, 5).opcode).toBe(OpcodeType.DIV);
        expect(core.readAt(null, 6).opcode).toBe(OpcodeType.MOD);
        expect(core.readAt(null, 7).opcode).toBe(OpcodeType.JMP);
        expect(core.readAt(null, 8).opcode).toBe(OpcodeType.JMZ);
        expect(core.readAt(null, 9).opcode).toBe(OpcodeType.JMN);
        expect(core.readAt(null, 10).opcode).toBe(OpcodeType.DJN);
        expect(core.readAt(null, 11).opcode).toBe(OpcodeType.CMP);
        expect(core.readAt(null, 12).opcode).toBe(OpcodeType.SEQ);
        expect(core.readAt(null, 13).opcode).toBe(OpcodeType.SNE);
        expect(core.readAt(null, 14).opcode).toBe(OpcodeType.SLT);
        expect(core.readAt(null, 15).opcode).toBe(OpcodeType.SPL);
        expect(core.readAt(null, 16).opcode).toBe(OpcodeType.NOP);
    });

    it("Correctly interprets token modifiers into simulator instructions",() => {

        var core = buildCore(20);

        var loader = new WarriorLoader(core);
        loader.load(0, DataHelper.buildParseResult(testTokens));

        expect(core.readAt(null, 0).modifier).toBe(ModifierType.A);
        expect(core.readAt(null, 1).modifier).toBe(ModifierType.B);
        expect(core.readAt(null, 2).modifier).toBe(ModifierType.AB);
        expect(core.readAt(null, 3).modifier).toBe(ModifierType.BA);
        expect(core.readAt(null, 4).modifier).toBe(ModifierType.F);
        expect(core.readAt(null, 5).modifier).toBe(ModifierType.I);
        expect(core.readAt(null, 6).modifier).toBe(ModifierType.X);
        expect(core.readAt(null, 7).modifier).toBe(ModifierType.A);
        expect(core.readAt(null, 8).modifier).toBe(ModifierType.B);
        expect(core.readAt(null, 9).modifier).toBe(ModifierType.AB);
        expect(core.readAt(null, 10).modifier).toBe(ModifierType.BA);
        expect(core.readAt(null, 11).modifier).toBe(ModifierType.F);
        expect(core.readAt(null, 12).modifier).toBe(ModifierType.I);
        expect(core.readAt(null, 13).modifier).toBe(ModifierType.F);
        expect(core.readAt(null, 14).modifier).toBe(ModifierType.X);
        expect(core.readAt(null, 15).modifier).toBe(ModifierType.A);
        expect(core.readAt(null, 16).modifier).toBe(ModifierType.B);
    });

    it("Correctly interprets token a mode into simulator instructions",() => {

        var core = buildCore(20);

        var loader = new WarriorLoader(core);
        loader.load(0, DataHelper.buildParseResult(testTokens));

        expect(core.readAt(null, 0).aOperand.mode).toBe(ModeType.Direct);
        expect(core.readAt(null, 1).aOperand.mode).toBe(ModeType.Immediate);
        expect(core.readAt(null, 2).aOperand.mode).toBe(ModeType.AIndirect);
        expect(core.readAt(null, 3).aOperand.mode).toBe(ModeType.BIndirect);
        expect(core.readAt(null, 4).aOperand.mode).toBe(ModeType.APreDecrement);
        expect(core.readAt(null, 5).aOperand.mode).toBe(ModeType.BPreDecrement);
        expect(core.readAt(null, 6).aOperand.mode).toBe(ModeType.APostIncrement);
        expect(core.readAt(null, 7).aOperand.mode).toBe(ModeType.BPostIncrement);
        expect(core.readAt(null, 8).aOperand.mode).toBe(ModeType.Direct);
        expect(core.readAt(null, 9).aOperand.mode).toBe(ModeType.Immediate);
        expect(core.readAt(null, 10).aOperand.mode).toBe(ModeType.AIndirect);
        expect(core.readAt(null, 11).aOperand.mode).toBe(ModeType.BIndirect);
        expect(core.readAt(null, 12).aOperand.mode).toBe(ModeType.APreDecrement);
        expect(core.readAt(null, 13).aOperand.mode).toBe(ModeType.BPreDecrement);
        expect(core.readAt(null, 14).aOperand.mode).toBe(ModeType.APostIncrement);
        expect(core.readAt(null, 15).aOperand.mode).toBe(ModeType.Direct);
        expect(core.readAt(null, 16).aOperand.mode).toBe(ModeType.Immediate);
    });

    it("Correctly interprets token a number into simulator instructions",() => {

        var core = buildCore(20);

        var loader = new WarriorLoader(core);
        loader.load(0, DataHelper.buildParseResult(testTokens));

        expect(core.readAt(null, 0).aOperand.address).toBe(0);
        expect(core.readAt(null, 1).aOperand.address).toBe(2);
        expect(core.readAt(null, 2).aOperand.address).toBe(4);
        expect(core.readAt(null, 3).aOperand.address).toBe(6);
        expect(core.readAt(null, 4).aOperand.address).toBe(8);
        expect(core.readAt(null, 5).aOperand.address).toBe(10);
        expect(core.readAt(null, 6).aOperand.address).toBe(12);
        expect(core.readAt(null, 7).aOperand.address).toBe(14);
        expect(core.readAt(null, 8).aOperand.address).toBe(-1);
        expect(core.readAt(null, 9).aOperand.address).toBe(-3);
        expect(core.readAt(null, 10).aOperand.address).toBe(-5);
        expect(core.readAt(null, 11).aOperand.address).toBe(-7);
        expect(core.readAt(null, 12).aOperand.address).toBe(-9);
        expect(core.readAt(null, 13).aOperand.address).toBe(-11);
        expect(core.readAt(null, 14).aOperand.address).toBe(-13);
        expect(core.readAt(null, 15).aOperand.address).toBe(-15);
        expect(core.readAt(null, 16).aOperand.address).toBe(0);
    });

    it("Correctly interprets token b mode into simulator instructions",() => {

        var core = buildCore(20);

        var loader = new WarriorLoader(core);
        loader.load(0, DataHelper.buildParseResult(testTokens));

        expect(core.readAt(null, 0).bOperand.mode).toBe(ModeType.Direct);
        expect(core.readAt(null, 1).bOperand.mode).toBe(ModeType.Immediate);
        expect(core.readAt(null, 2).bOperand.mode).toBe(ModeType.AIndirect);
        expect(core.readAt(null, 3).bOperand.mode).toBe(ModeType.BIndirect);
        expect(core.readAt(null, 4).bOperand.mode).toBe(ModeType.APreDecrement);
        expect(core.readAt(null, 5).bOperand.mode).toBe(ModeType.BPreDecrement);
        expect(core.readAt(null, 6).bOperand.mode).toBe(ModeType.APostIncrement);
        expect(core.readAt(null, 7).bOperand.mode).toBe(ModeType.BPostIncrement);
        expect(core.readAt(null, 8).bOperand.mode).toBe(ModeType.Immediate);
        expect(core.readAt(null, 9).bOperand.mode).toBe(ModeType.AIndirect);
        expect(core.readAt(null, 10).bOperand.mode).toBe(ModeType.BIndirect);
        expect(core.readAt(null, 11).bOperand.mode).toBe(ModeType.APreDecrement);
        expect(core.readAt(null, 12).bOperand.mode).toBe(ModeType.BPreDecrement);
        expect(core.readAt(null, 13).bOperand.mode).toBe(ModeType.APostIncrement);
        expect(core.readAt(null, 14).bOperand.mode).toBe(ModeType.BPostIncrement);
        expect(core.readAt(null, 15).bOperand.mode).toBe(ModeType.Immediate);
        expect(core.readAt(null, 16).bOperand.mode).toBe(ModeType.Immediate);
    });

    it("Correctly interprets token b number into simulator instructions",() => {

        var core = buildCore(20);

        var loader = new WarriorLoader(core);
        loader.load(0, DataHelper.buildParseResult(testTokens));

        expect(core.readAt(null, 0).bOperand.address).toBe(1);
        expect(core.readAt(null, 1).bOperand.address).toBe(3);
        expect(core.readAt(null, 2).bOperand.address).toBe(5);
        expect(core.readAt(null, 3).bOperand.address).toBe(7);
        expect(core.readAt(null, 4).bOperand.address).toBe(9);
        expect(core.readAt(null, 5).bOperand.address).toBe(11);
        expect(core.readAt(null, 6).bOperand.address).toBe(13);
        expect(core.readAt(null, 7).bOperand.address).toBe(15);
        expect(core.readAt(null, 8).bOperand.address).toBe(-2);
        expect(core.readAt(null, 9).bOperand.address).toBe(-4);
        expect(core.readAt(null, 10).bOperand.address).toBe(-6);
        expect(core.readAt(null, 11).bOperand.address).toBe(-8);
        expect(core.readAt(null, 12).bOperand.address).toBe(-10);
        expect(core.readAt(null, 13).bOperand.address).toBe(-12);
        expect(core.readAt(null, 14).bOperand.address).toBe(-14);
        expect(core.readAt(null, 15).bOperand.address).toBe(-16);
        expect(core.readAt(null, 16).bOperand.address).toBe(0);
    });

    it("Correctly sets the startAddress property of the warrior",() => {

        var tokens = DataHelper.buildParseResult(instruction("MOV", ".I", "$", 0, "$", 1));

        var core = buildCore(5);

        var loader = new WarriorLoader(core);
        var actual = loader.load(3, tokens);

        expect(actual.startAddress).toBe(3);
    });
}); 