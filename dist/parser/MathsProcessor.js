"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const _ = require("underscore");
const PassBase_1 = require("./PassBase");
class MathsProcessor extends PassBase_1.PassBase {
    constructor(expression) {
        super();
        this.expression = expression;
    }
    processLine() {
        // Maths Processor
        // Locate and resolve mathematical expressions to resulting address
        var next = this.stream.peek();
        if (next.category === IToken_1.TokenCategory.Number ||
            next.category === IToken_1.TokenCategory.Maths) {
            try {
                var address = this.expression.parse(this.stream);
                this.context.emitSingle({
                    category: IToken_1.TokenCategory.Number,
                    lexeme: address.toString(),
                    position: _.clone(next.position)
                });
            }
            catch (err) {
                this.stream.readToEOL();
            }
        }
        else {
            this.context.emitSingle(this.stream.read());
        }
    }
}
exports.MathsProcessor = MathsProcessor;
