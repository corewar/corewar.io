import { IContext } from "./interface/IContext";
import { IMetaData } from "./interface/IMetaData";
import { IToken } from "./interface/IToken";
import { IMessage } from "./interface/IMessage";
import { IParseInstruction } from "./interface/IParseInstruction";
import * as _ from "underscore";

export class Context implements IContext {

    public metaData: IMetaData;
    public tokens: IToken[];
    public equs: { [label: string]: IToken[] };
    public labels: { [label: string]: number };
    public messages: IMessage[];

    constructor() {
        this.metaData = {
            name: "",
            author: "",
            strategy: ""
        };
        this.equs = {};
        this.tokens = [];
        this.labels = {};
        this.messages = [];
    }

    public emitSingle(token: IToken) {

        this.tokens.push(token);
    }

    public emit(tokens: IToken[]) {

        this.tokens = this.tokens.concat(tokens);
    }

    private hasValue(something: any): boolean {
        return (!(_.isUndefined(something) || _.isNull(something)));
    }

    public emitInstruction(instruction: IParseInstruction) {

        if (this.hasValue(instruction.opcode)) {
            this.tokens.push(instruction.opcode);
        }
        if (this.hasValue(instruction.modifier)) {
            this.tokens.push(instruction.modifier);
        }
        if (this.hasValue(instruction.aOperand)) {
            if (this.hasValue(instruction.aOperand.mode)) {
                this.tokens.push(instruction.aOperand.mode);
            }
            if (this.hasValue(instruction.aOperand.address)) {
                this.tokens.push(instruction.aOperand.address);
            }
        }
        if (this.hasValue(instruction.comma)) {
            this.tokens.push(instruction.comma);
        }
        if (this.hasValue(instruction.bOperand)) {
            if (this.hasValue(instruction.bOperand.mode)) {
                this.tokens.push(instruction.bOperand.mode);
            }
            if (this.hasValue(instruction.bOperand.address)) {
                this.tokens.push(instruction.bOperand.address);
            }
        }
        if (this.hasValue(instruction.comment)) {
            this.tokens.push(instruction.comment);
        }
        if (this.hasValue(instruction.eol)) {
            this.tokens.push(instruction.eol);
        }
    }
}