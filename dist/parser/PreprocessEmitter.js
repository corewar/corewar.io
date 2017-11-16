"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const _ = require("underscore");
const PassBase_1 = require("./PassBase");
class PreprocessEmitter extends PassBase_1.PassBase {
    /// <summary>
    /// Perform preprocessor substitutions.
    /// Replace EQU defined labels with corresponding expression
    /// </summary>
    processLine() {
        // Perform preprocessor substitution
        // Insert EQU expressions
        var next = this.stream.peek();
        if (next.category === IToken_1.TokenCategory.Label &&
            next.lexeme in this.context.equs) {
            this.replaceLabel();
        }
        else {
            this.context.emit([this.stream.read()]);
        }
    }
    replaceLabel() {
        var label = this.stream.read();
        var originalExpression = this.context.equs[label.lexeme];
        var expression = _.map(originalExpression, (token) => {
            var clone = _.clone(token);
            clone.position = label.position;
            return clone;
        });
        this.context.emit(expression);
    }
}
exports.PreprocessEmitter = PreprocessEmitter;
