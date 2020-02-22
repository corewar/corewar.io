import { ITokenStream } from '@parser/interface/ITokenStream'

export interface IExpression {
    parse(stream: ITokenStream): number
}
