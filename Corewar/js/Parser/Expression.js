define(["require", "exports", "./Interface/IToken"], function (require, exports, IToken_1) {
    var Expression = (function () {
        function Expression() {
        }
        Expression.prototype.parse = function (stream) {
            this.stream = stream;
            this.stream.peek();
            return this.expression();
        };
        Expression.prototype.expression = function () {
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
        };
        Expression.prototype.term = function () {
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
        };
        Expression.prototype.division = function (token, numerator, denominator) {
            if (denominator === 0) {
                this.stream.error(token, "Divide by zero is not permitted");
            }
            var quotient = numerator / denominator;
            var rounded = this.integerRound(quotient);
            if (rounded !== quotient) {
                this.stream.warn(token, "Rounded non-integer division truncated to integer value");
            }
            return rounded;
        };
        Expression.prototype.integerRound = function (value) {
            return value >> 0;
        };
        Expression.prototype.factor = function () {
            var next = this.stream.peek();
            if (next.lexeme === "+" ||
                next.lexeme === "-") {
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
        };
        return Expression;
    })();
    exports.Expression = Expression;
});
//# sourceMappingURL=Expression.js.map