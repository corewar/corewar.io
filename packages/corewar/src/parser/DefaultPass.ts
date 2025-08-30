﻿import { Standard } from './interface/IParseOptions'
import { IToken, TokenCategory } from './interface/IToken'
import { IParseInstruction } from './interface/IParseInstruction'
import { PassBase } from './PassBase'

export class DefaultPass extends PassBase {
    public processLine(): void {
        // Should specify default
        //    Modifiers (depends upon opcode)
        //    Modes ($)
        //    Operands $0

        const next = this.stream.peek()

        if (next.category === TokenCategory.Opcode) {
            this.processInstruction()
        } else {
            this.context.emit(this.stream.readToEOL())
        }
    }

    private processInstruction(): void {
        const instruction: IParseInstruction = this.readInstruction()

        this.defaultModifier(instruction)

        if (instruction.aOperand.address === null) {
            // A address is mandatory, discard the rest of this line and leave for syntax check
            this.context.emit([instruction.opcode, instruction.modifier, instruction.aOperand.mode])
            this.context.emit(this.stream.readToEOL())
            return
        }

        this.defaultBOperand(instruction)

        this.emitInstruction(instruction)
    }

    private readInstruction(): IParseInstruction {
        const instruction: IParseInstruction = {}

        instruction.opcode = this.stream.expect(TokenCategory.Opcode)
        instruction.modifier = this.tryRead(TokenCategory.Modifier)
        instruction.aOperand = {
            mode: this.readOrDefaultMode(instruction.opcode),
            address: this.tryRead(TokenCategory.Number)
        }

        instruction.comma = null
        if (this.options.standard <= Standard.ICWS88) {
            instruction.comma = this.readOrDefaultComma()
        } else if (this.stream.peek().category === TokenCategory.Comma) {
            instruction.comma = this.stream.read()
        }

        instruction.bOperand = {
            mode: this.readOrDefaultMode(instruction.opcode),
            address: this.tryRead(TokenCategory.Number)
        }

        return instruction
    }

    private tryRead(category: TokenCategory): IToken {
        if (this.stream.peek().category === category) {
            return this.stream.read()
        }

        return null
    }

    private readOrDefaultComma(): IToken {
        if (this.stream.peek().category === TokenCategory.Comma) {
            return this.stream.read()
        } else {
            return {
                category: TokenCategory.Comma,
                lexeme: ',',
                position: Object.assign({}, this.stream.peek().position)
            }
        }
    }

    private readOrDefaultMode(opcode: IToken): IToken {
        if (this.stream.peek().category === TokenCategory.Mode) {
            return this.stream.read()
        } else {
            let mode = '$'

            if (this.options.standard < Standard.ICWS94draft && opcode.lexeme === 'DAT') {
                mode = '#'
            }

            return {
                category: TokenCategory.Mode,
                lexeme: mode,
                position: Object.assign({}, this.stream.peek().position)
            }
        }
    }

    private defaultBOperand(instruction: IParseInstruction): void {
        if (instruction.bOperand.address === null) {
            if (instruction.comma === null) {
                instruction.comma = {
                    category: TokenCategory.Comma,
                    lexeme: ',',
                    position: Object.assign({}, this.stream.peek().position)
                }
            }

            instruction.bOperand.address = {
                category: TokenCategory.Number,
                lexeme: '0',
                position: Object.assign({}, this.stream.peek().position)
            }

            if (instruction.opcode.lexeme === 'DAT') {
                instruction.bOperand.mode.lexeme = '#'

                const tempOperand = instruction.aOperand
                instruction.aOperand = instruction.bOperand
                instruction.bOperand = tempOperand

                instruction.aOperand.address.position = instruction.bOperand.address.position
                instruction.aOperand.mode.position = instruction.bOperand.mode.position
            }
        }
    }

    private defaultModifier(instruction: IParseInstruction): void {
        if (instruction.modifier === null) {
            const token = {
                category: TokenCategory.Modifier,
                position: Object.assign({}, instruction.opcode.position),
                lexeme: ''
            }

            switch (instruction.opcode.lexeme) {
                case 'DAT':
                    token.lexeme = '.F'
                    break
                case 'MOV':
                case 'CMP':
                case 'SEQ':
                case 'SNE':
                    if (instruction.aOperand.mode.lexeme === '#') {
                        token.lexeme = '.AB'
                    } else if (instruction.bOperand.mode.lexeme === '#') {
                        token.lexeme = '.B'
                    } else {
                        token.lexeme = '.I'
                    }
                    break
                case 'ADD':
                case 'SUB':
                case 'MUL':
                case 'DIV':
                case 'MOD':
                    if (instruction.aOperand.mode.lexeme === '#') {
                        token.lexeme = '.AB'
                    } else if (instruction.bOperand.mode.lexeme === '#') {
                        token.lexeme = '.B'
                    } else if (this.options.standard !== Standard.ICWS86) {
                        token.lexeme = '.F'
                    } else {
                        token.lexeme = '.B'
                    }
                    break
                case 'SLT':
                    if (instruction.aOperand.mode.lexeme === '#') {
                        token.lexeme = '.AB'
                    } else {
                        token.lexeme = '.B'
                    }
                    break
                case 'JMP':
                case 'JMZ':
                case 'JMN':
                case 'DJN':
                case 'SPL':
                case 'NOP':
                    token.lexeme = '.B'
                    break
            }

            instruction.modifier = token
        }
    }

    private emitInstruction(instruction: IParseInstruction): void {
        this.context.emitSingle(instruction.opcode)
        if (instruction.modifier !== null) {
            this.context.emitSingle(instruction.modifier)
        }
        this.context.emit([instruction.aOperand.mode, instruction.aOperand.address])
        if (instruction.comma !== null) {
            this.context.emitSingle(instruction.comma)
        }
        this.context.emit([instruction.bOperand.mode, instruction.bOperand.address])
        this.context.emit(this.stream.readToEOL())
    }
}
