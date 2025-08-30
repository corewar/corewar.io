import { IToken } from './IToken'
import { IParseOperand } from './IParseOperand'

export interface IParseInstruction {
    opcode?: IToken
    modifier?: IToken
    aOperand?: IParseOperand
    comma?: IToken
    bOperand?: IParseOperand
    comment?: IToken
    eol?: IToken
}
