import { IToken } from '@parser/interface/IToken'
import { IParseOperand } from '@parser/interface/IParseOperand'

export interface IParseInstruction {
    opcode?: IToken
    modifier?: IToken
    aOperand?: IParseOperand
    comma?: IToken
    bOperand?: IParseOperand
    comment?: IToken
    eol?: IToken
}
