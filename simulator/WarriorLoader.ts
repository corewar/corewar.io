import { IWarriorLoader } from "./interface/IWarriorLoader";
import { IWarrior } from "./interface/IWarrior";
import { ICore } from "./interface/ICore";
import { IInstruction, OpcodeType, ModifierType } from "./interface/IInstruction";
import { IOperand, ModeType } from "./interface/IOperand";

import { ITokenStream } from "../parser/interface/ITokenStream";
import { IParseResult } from "../parser/interface/IParseResult";
import { TokenCategory } from "../parser/interface/IToken";
import { IParseInstruction } from "../parser/interface/IParseInstruction";
import { IParseOperand } from "../parser/interface/IParseOperand";

import { TokenStream } from "../parser/TokenStream";
import { Warrior } from "./Warrior";

export class WarriorLoader implements IWarriorLoader {

    private address: number;
    private stream: ITokenStream;
    private warrior: IWarrior;

    private core: ICore;

    private startAddress: number;

    constructor(core: ICore) {

        this.core = core;
    }

    public load(address: number, result: IParseResult): IWarrior {

        this.stream = new TokenStream(result.tokens, result.messages);
        this.address = address;

        this.warrior = new Warrior();
        this.warrior.startAddress = address;

        this.readInstructions();

        this.loadProcess();

        this.warrior.name = result.metaData.name;
        this.warrior.author = result.metaData.author;
        this.warrior.strategy = result.metaData.strategy;

        return this.warrior;
    }

    private readInstructions() {
        while (!this.stream.eof()) {

            var next = this.stream.peek();

            if (next.category === TokenCategory.Opcode) {

                this.core.setAt(this.warrior.tasks[0], this.address++, this.readInstruction());

            } else if (next.category === TokenCategory.Preprocessor) {

                this.startAddress = this.readOrg();

            } else {

                this.stream.readToEOL();
            }
        }
    }

    private readInstruction(): IInstruction {

        var parseInstruction = this.readParseInstruction();

        var instruction: IInstruction = {
            address: this.address,
            opcode: this.getOpcode(parseInstruction),
            modifier: this.getModifier(parseInstruction),
            aOperand: this.getOperand(parseInstruction.aOperand),
            bOperand: this.getOperand(parseInstruction.bOperand)
        };

        return instruction;
    }

    private readOrg(): number {
        this.stream.read(); // ORG
        var token = this.stream.read();

        this.stream.readToEOL();

        return this.address + parseInt(token.lexeme, 10);
    }

    private readParseInstruction(): IParseInstruction {

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
    }

    private getOpcode(instruction: IParseInstruction): OpcodeType {

        switch (instruction.opcode.lexeme) {
            case "DAT":
                return OpcodeType.DAT;
            case "MOV":
                return OpcodeType.MOV;
            case "ADD":
                return OpcodeType.ADD;
            case "SUB":
                return OpcodeType.SUB;
            case "MUL":
                return OpcodeType.MUL;
            case "DIV":
                return OpcodeType.DIV;
            case "MOD":
                return OpcodeType.MOD;
            case "JMP":
                return OpcodeType.JMP;
            case "JMZ":
                return OpcodeType.JMZ;
            case "JMN":
                return OpcodeType.JMN;
            case "DJN":
                return OpcodeType.DJN;
            case "CMP":
                return OpcodeType.CMP;
            case "SEQ":
                return OpcodeType.SEQ;
            case "SNE":
                return OpcodeType.SNE;
            case "SLT":
                return OpcodeType.SLT;
            case "SPL":
                return OpcodeType.SPL;
            default:
                return OpcodeType.NOP;
        }
    }

    private getModifier(instruction: IParseInstruction): ModifierType {

        switch (instruction.modifier.lexeme) {
            case ".A":
                return ModifierType.A;
            case ".B":
                return ModifierType.B;
            case ".BA":
                return ModifierType.BA;
            case ".F":
                return ModifierType.F;
            case ".I":
                return ModifierType.I;
            case ".X":
                return ModifierType.X;
            default:
                return ModifierType.AB;
        }
    }

    private getOperand(operand: IParseOperand): IOperand {

        var result: IOperand = {
            mode: 0,
            address: parseInt(operand.address.lexeme, 10)
        };

        switch (operand.mode.lexeme) {
            case "#":
                result.mode = ModeType.Immediate;
                break;
            case "*":
                result.mode = ModeType.AIndirect;
                break;
            case "@":
                result.mode = ModeType.BIndirect;
                break;
            case "{":
                result.mode = ModeType.APreDecrement;
                break;
            case "<":
                result.mode = ModeType.BPreDecrement;
                break;
            case "}":
                result.mode = ModeType.APostIncrement;
                break;
            case ">":
                result.mode = ModeType.BPostIncrement;
                break;
            default:
                result.mode = ModeType.Direct;
                break;
        }

        return result;
    }

    private loadProcess() {

        this.warrior.tasks.push({
            instructionPointer: this.startAddress,
            warrior: this.warrior
        });
        this.warrior.taskIndex = 0;
    }
}