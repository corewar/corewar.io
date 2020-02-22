import { IExpression } from "@parser/interface/IExpression";
import { IToken, TokenCategory } from "@parser/interface/IToken";
import { ITokenStream } from "@parser/interface/ITokenStream";

export class Expression implements IExpression {

    private stream: ITokenStream;

    public parse(stream: ITokenStream): number {

        this.stream = stream;

        this.stream.peek();

        return this.expression();
    }

    private expression(): number {

        let result = this.term();

        while (!this.stream.eof()) {

            const next = this.stream.peek();

            if (next.lexeme === "+") {
                this.stream.read();
                result += this.term();
            } else if (next.lexeme === "-") {
                this.stream.read();
                result -= this.term();
            } else {
                break;
            }
        }

        return result;
    }

    private term(): number {

        let result = this.factor();

        while (!this.stream.eof()) {

            const next = this.stream.peek();

            if (next.lexeme === "*") {
                this.stream.read();
                result *= this.factor();
            } else if (next.lexeme === "/") {
                this.stream.read();
                const divisor = this.factor();
                result = this.division(next, result, divisor);
            } else if (next.lexeme === "%") {
                this.stream.read();
                result %= this.factor();
            } else {
                break;
            }
        }

        return result;
    }

    private division(token: IToken, numerator: number, denominator: number): number {

        if (denominator === 0) {
            this.stream.error(token, "Divide by zero is not permitted");
        }

        const quotient = numerator / denominator;
        const rounded = this.integerRound(quotient);

        if (rounded !== quotient) {
            this.stream.warn(token, "Rounded non-integer division truncated to integer value");
        }

        return rounded;
    }

    // http://stackoverflow.com/questions/4228356/integer-division-in-javascript
    private integerRound(value: number): number {
        /* tslint:disable */
        return value >> 0;
        /* tslint:enable */
    }

    private factor(): number {

        const next = this.stream.peek();

        if (next.lexeme === "+" ||
            next.lexeme === "-") {

            // Place a zero in front of a - or + to allow e.g. -7 to be entered
            return 0;
        } else if (next.lexeme === "(") {

            this.stream.expectOnly("(");
            const result = this.expression();
            this.stream.expectOnly(")");
            return result;

        } else {

            this.stream.expect(TokenCategory.Number);
            return parseInt(next.lexeme, 10);
        }
    }
}