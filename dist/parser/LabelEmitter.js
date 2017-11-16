"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IMessage_1 = require("./interface/IMessage");
const IToken_1 = require("./interface/IToken");
const IParseOptions_1 = require("./interface/IParseOptions");
const _ = require("underscore");
const PassBase_1 = require("./PassBase");
class LabelEmitter extends PassBase_1.PassBase {
    process(context, options) {
        this.line = 0;
        return super.process(context, options);
    }
    labelName(token) {
        switch (this.options.standard) {
            case IParseOptions_1.Standard.ICWS86:
            case IParseOptions_1.Standard.ICWS88:
                return token.lexeme.length > 8 ? token.lexeme.substr(0, 8) : token.lexeme;
            default:
                return token.lexeme;
        }
    }
    processLine() {
        // Pass 3
        // Replace labels with numbers
        // Raise syntax error for undeclared labels
        if (this.stream.peek().category === IToken_1.TokenCategory.Opcode) {
            this.processLineTokens(true);
            this.line++;
        }
        else if (this.stream.peek().category === IToken_1.TokenCategory.Preprocessor) {
            this.processLineTokens(false);
        }
        else {
            var tokens = this.stream.readToEOL();
            this.context.emit(tokens);
        }
    }
    processLineTokens(isOpcode) {
        var tokens = this.stream.readToEOL();
        _.forEach(tokens, (token) => {
            if (token.category === IToken_1.TokenCategory.Label) {
                this.processLabel(token, isOpcode);
            }
            else {
                this.context.emitSingle(token);
            }
        });
    }
    raiseUndeclaredLabel(label) {
        this.context.messages.push({
            type: IMessage_1.MessageType.Error,
            position: label.position,
            text: "Unrecognised label '" + this.labelName(label) + "'"
        });
    }
    processLabel(label, isOpcode) {
        var name = this.labelName(label);
        if (name in this.context.labels) {
            var labelLine = this.context.labels[name];
            var diff = labelLine;
            if (isOpcode) {
                diff -= this.line;
            }
            var token = {
                category: IToken_1.TokenCategory.Number,
                lexeme: diff.toString(),
                position: _.clone(label.position)
            };
            this.context.emitSingle(token);
        }
        else {
            this.raiseUndeclaredLabel(label);
        }
    }
}
exports.LabelEmitter = LabelEmitter;
