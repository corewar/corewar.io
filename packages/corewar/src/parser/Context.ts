﻿import { IContext } from './interface/IContext'
import { IMetaData } from './interface/IMetaData'
import { IToken } from './interface/IToken'
import { IMessage } from './interface/IMessage'
import { IParseInstruction } from './interface/IParseInstruction'

export class Context implements IContext {
    public metaData: IMetaData
    public tokens: IToken[]
    public equs: { [label: string]: IToken[] }
    public labels: { [label: string]: number }
    public messages: IMessage[]
    public success: boolean

    constructor() {
        this.metaData = {
            name: '',
            author: '',
            strategy: ''
        }
        this.equs = {}
        this.tokens = []
        this.labels = {}
        this.messages = []
    }

    public emitSingle(token: IToken): void {
        this.tokens.push(token)
    }

    public emit(tokens: IToken[]): void {
        this.tokens = this.tokens.concat(tokens)
    }

    public emitInstruction(instruction: IParseInstruction): void {
        if (instruction.opcode != null) {
            this.tokens.push(instruction.opcode)
        }
        if (instruction.modifier != null) {
            this.tokens.push(instruction.modifier)
        }
        if (instruction.aOperand != null) {
            if (instruction.aOperand.mode != null) {
                this.tokens.push(instruction.aOperand.mode)
            }
            if (instruction.aOperand.address != null) {
                this.tokens.push(instruction.aOperand.address)
            }
        }
        if (instruction.comma != null) {
            this.tokens.push(instruction.comma)
        }
        if (instruction.bOperand != null) {
            if (instruction.bOperand.mode != null) {
                this.tokens.push(instruction.bOperand.mode)
            }
            if (instruction.bOperand.address != null) {
                this.tokens.push(instruction.bOperand.address)
            }
        }
        if (instruction.comment != null) {
            this.tokens.push(instruction.comment)
        }
        if (instruction.eol != null) {
            this.tokens.push(instruction.eol)
        }
    }
}
