"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
class Expression {
    parse(stream) {
        this.stream = stream;
        this.stream.peek();
        return this.expression();
    }
    expression() {
        var result = this.term();
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.lexeme === "+") {
                this.stream.read();
                result += this.term();
            }
            else if (next.lexeme === "-") {
                this.stream.read();
                result -= this.term();
            }
            else {
                break;
            }
        }
        return result;
    }
    term() {
        var result = this.factor();
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.lexeme === "*") {
                this.stream.read();
                result *= this.factor();
            }
            else if (next.lexeme === "/") {
                this.stream.read();
                var divisor = this.factor();
                result = this.division(next, result, divisor);
            }
            else if (next.lexeme === "%") {
                this.stream.read();
                result %= this.factor();
            }
            else {
                break;
            }
        }
        return result;
    }
    division(token, numerator, denominator) {
        if (denominator === 0) {
            this.stream.error(token, "Divide by zero is not permitted");
        }
        var quotient = numerator / denominator;
        var rounded = this.integerRound(quotient);
        if (rounded !== quotient) {
            this.stream.warn(token, "Rounded non-integer division truncated to integer value");
        }
        return rounded;
    }
    // http://stackoverflow.com/questions/4228356/integer-division-in-javascript
    integerRound(value) {
        /* tslint:disable */
        return value >> 0;
        /* tslint:enable */
    }
    factor() {
        var next = this.stream.peek();
        if (next.lexeme === "+" ||
            next.lexeme === "-") {
            // Place a zero in front of a - or + to allow e.g. -7 to be entered
            return 0;
        }
        else if (next.lexeme === "(") {
            this.stream.expectOnly("(");
            var result = this.expression();
            this.stream.expectOnly(")");
            return result;
        }
        else {
            this.stream.expect(IToken_1.TokenCategory.Number);
            return parseInt(next.lexeme, 10);
        }
    }
}
exports.Expression = Expression;
