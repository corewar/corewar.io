import { IWarriorLoader } from '@simulator/interface/IWarriorLoader'
import { IWarriorInstance } from '@simulator/interface/IWarriorInstance'
import { ICore } from '@simulator/interface/ICore'
import { IInstruction, OpcodeType, ModifierType } from '@simulator/interface/IInstruction'
import { IOperand, ModeType } from '@simulator/interface/IOperand'

import { ITokenStream } from '@parser/interface/ITokenStream'
import { TokenCategory } from '@parser/interface/IToken'
import { IParseInstruction } from '@parser/interface/IParseInstruction'
import { IParseOperand } from '@parser/interface/IParseOperand'

import { TokenStream } from '@parser/TokenStream'
import { WarriorInstance } from '@simulator/WarriorInstance'
import IWarrior from '@simulator/interface/IWarrior'
import { IPublisher } from '@simulator/interface/IPublisher'
import { MessageType } from '@simulator/interface/IMessage'

export class WarriorLoader implements IWarriorLoader {
    private address: number
    private stream: ITokenStream
    private instance: IWarriorInstance

    private core: ICore
    private publisher: IPublisher

    constructor(core: ICore, publisher: IPublisher) {
        this.core = core
        this.publisher = publisher
    }

    public load(address: number, warrior: IWarrior, id: number): IWarriorInstance {
        const { source } = warrior
        this.stream = new TokenStream(source.tokens, source.messages)
        this.address = address

        this.instance = new WarriorInstance()

        this.instance.warrior = warrior
        if (typeof this.instance.warrior.internalId === 'undefined') {
            this.instance.warrior.internalId = id
        }
        this.instance.name = source.metaData.name
        this.instance.author = source.metaData.author
        this.instance.strategy = source.metaData.strategy

        this.loadProcess(address)

        this.readInstructions()

        return this.instance
    }

    private readInstructions(): void {
        while (!this.stream.eof()) {
            const next = this.stream.peek()

            if (next.category === TokenCategory.Opcode) {
                this.core.setAt(this.instance.tasks[0], this.address, this.readInstruction())
                this.address += 1
            } else if (next.category === TokenCategory.Preprocessor) {
                this.instance.tasks[0].instructionPointer = this.readOrg()
            } else {
                this.stream.readToEOL()
            }
        }
    }

    private readInstruction(): IInstruction {
        const parseInstruction = this.readParseInstruction()

        const instruction: IInstruction = {
            address: this.address,
            opcode: this.getOpcode(parseInstruction),
            modifier: this.getModifier(parseInstruction),
            aOperand: this.getOperand(parseInstruction.aOperand),
            bOperand: this.getOperand(parseInstruction.bOperand)
        }

        return instruction
    }

    private readOrg(): number {
        this.stream.read() // ORG
        const token = this.stream.read()

        this.stream.readToEOL()

        return this.address + parseInt(token.lexeme, 10)
    }

    private readParseInstruction(): IParseInstruction {
        const result = {
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
        }

        this.stream.readToEOL()

        return result
    }

    private getOpcode(instruction: IParseInstruction): OpcodeType {
        switch (instruction.opcode.lexeme) {
            case 'DAT':
                return OpcodeType.DAT
            case 'MOV':
                return OpcodeType.MOV
            case 'ADD':
                return OpcodeType.ADD
            case 'SUB':
                return OpcodeType.SUB
            case 'MUL':
                return OpcodeType.MUL
            case 'DIV':
                return OpcodeType.DIV
            case 'MOD':
                return OpcodeType.MOD
            case 'JMP':
                return OpcodeType.JMP
            case 'JMZ':
                return OpcodeType.JMZ
            case 'JMN':
                return OpcodeType.JMN
            case 'DJN':
                return OpcodeType.DJN
            case 'CMP':
                return OpcodeType.CMP
            case 'SEQ':
                return OpcodeType.SEQ
            case 'SNE':
                return OpcodeType.SNE
            case 'SLT':
                return OpcodeType.SLT
            case 'SPL':
                return OpcodeType.SPL
            default:
                return OpcodeType.NOP
        }
    }

    private getModifier(instruction: IParseInstruction): ModifierType {
        switch (instruction.modifier.lexeme) {
            case '.A':
                return ModifierType.A
            case '.B':
                return ModifierType.B
            case '.BA':
                return ModifierType.BA
            case '.F':
                return ModifierType.F
            case '.I':
                return ModifierType.I
            case '.X':
                return ModifierType.X
            default:
                return ModifierType.AB
        }
    }

    private getOperand(operand: IParseOperand): IOperand {
        const result: IOperand = {
            mode: operand.mode.lexeme as ModeType,
            address: this.core.wrap(parseInt(operand.address.lexeme, 10))
        }

        return result
    }

    private loadProcess(startAddress: number): void {
        this.instance.tasks.push({
            instructionPointer: startAddress,
            instance: this.instance
        })

        this.instance.startAddress = startAddress
        this.instance.taskIndex = 0

        const payload = {
            warriorId: this.instance.warrior.internalId,
            taskCount: 1
        }
        if (this.instance.warrior.data) {
            payload['warriorData'] = this.instance.warrior.data
        }

        this.publisher.queue({
            type: MessageType.TaskCount,
            payload
        })
    }
}
