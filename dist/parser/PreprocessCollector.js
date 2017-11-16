"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IParseOptions_1 = require("./interface/IParseOptions");
const IToken_1 = require("./interface/IToken");
const IMessage_1 = require("./interface/IMessage");
const _ = require("underscore");
const PassBase_1 = require("./PassBase");
class PreprocessCollector extends PassBase_1.PassBase {
    /// <summary>
    /// Records EQU substitutions and removes statements from token stream
    /// Performs a duplicate label check
    /// </summary>
    process(context, options) {
        // Record EQU label tokens
        // Remove EQU token labels from token stream
        // Duplicate label check
        this.previous = [];
        return super.process(context, options);
    }
    processLine() {
        while (!this.stream.eof()) {
            var next = this.stream.peek();
            if (next.category === IToken_1.TokenCategory.Label) {
                this.previous = [];
                this.processLabels();
            }
            else if (this.isMultilineEqu(next)) {
                this.processMultilineEqu();
            }
            else {
                var line = this.stream.readToEOL();
                this.context.emit(line);
            }
        }
    }
    isMultilineEqu(next) {
        return next.category === IToken_1.TokenCategory.Preprocessor &&
            next.lexeme === "EQU" &&
            this.previous.length > 0 &&
            this.options.standard === IParseOptions_1.Standard.ICWS94draft;
    }
    isEqu(pre) {
        return pre.category === IToken_1.TokenCategory.Preprocessor &&
            pre.lexeme === "EQU";
    }
    processLabels() {
        var labels = [];
        while (this.stream.peek().category === IToken_1.TokenCategory.Label) {
            var token = this.stream.expect(IToken_1.TokenCategory.Label);
            this.previous.push(token.lexeme);
            labels.push(token);
        }
        var pre = this.stream.read();
        if (this.isEqu(pre)) {
            this.processEqu(labels);
        }
        else {
            this.previous = [];
            this.context.emit(labels);
            this.context.emit([pre]);
        }
    }
    warnDuplicateLabel(label) {
        this.context.messages.push({
            type: IMessage_1.MessageType.Warning,
            position: label.position,
            text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
        });
    }
    processEqu(labels) {
        var expression = this.stream.readToEOL();
        // Do not include terminating EOL in replacement expression
        expression.pop();
        // Remove comments
        expression = _.filter(expression, (token) => {
            return token.category !== IToken_1.TokenCategory.Comment;
        });
        _.forEach(labels, (label) => {
            if (label.lexeme in this.context.equs) {
                this.warnDuplicateLabel(label);
            }
            else {
                this.context.equs[label.lexeme] = expression;
            }
        });
    }
    processMultilineEqu() {
        this.stream.expectOnly("EQU");
        var expression = [{
                category: IToken_1.TokenCategory.EOL,
                lexeme: "\n",
                position: _.clone(this.stream.peek().position)
            }];
        expression = expression.concat(this.stream.readToEOL());
        // Remove terminating newline
        expression.pop();
        _(this.previous).forEach((label) => {
            var existing = this.context.equs[label];
            this.context.equs[label] = existing.concat(expression);
        });
    }
}
exports.PreprocessCollector = PreprocessCollector;
