"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const IParseOptions_1 = require("./interface/IParseOptions");
const PassBase_1 = require("./PassBase");
class LabelCollector extends PassBase_1.PassBase {
    // Pass 2
    // Record label positions
    // Remove label declarations from the token stream
    // Duplicate label check
    // Syntax error if label declaration not followed by an opcode
    process(context, options) {
        this.line = -1;
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
        var next = this.stream.peek();
        if (next.category === IToken_1.TokenCategory.Label ||
            next.category === IToken_1.TokenCategory.Opcode) {
            this.line++;
        }
        if (this.stream.peek().category === IToken_1.TokenCategory.Label) {
            this.processLabel();
        }
        var tokens = this.stream.readToEOL();
        this.context.emit(tokens);
    }
    processLabel() {
        while (!this.stream.eof() && this.stream.peek().category === IToken_1.TokenCategory.Label) {
            var label = this.stream.expect(IToken_1.TokenCategory.Label);
            var name = this.labelName(label);
            if (name in this.context.labels ||
                name in this.context.equs) {
                this.stream.warn(label, "Redefinition of label '" + this.labelName(label) + "', original definition will be used");
            }
            else {
                this.context.labels[name] = this.line;
            }
        }
        var next = this.stream.peek();
        if (next.lexeme === "END") {
            return;
        }
        var opcode = this.stream.expect(IToken_1.TokenCategory.Opcode);
        this.context.emitSingle(opcode);
    }
}
exports.LabelCollector = LabelCollector;
