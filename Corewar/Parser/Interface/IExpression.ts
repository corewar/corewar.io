import { ITokenStream } from "./ITokenStream";

export interface IExpression {

    parse(stream: ITokenStream): number;
}