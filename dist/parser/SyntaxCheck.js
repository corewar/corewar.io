"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PassBase_1 = require("./PassBase");
const IToken_1 = require("./interface/IToken");
class SyntaxCheck extends PassBase_1.PassBase {
    processLine() {
        var next = this.stream.peek();
        if (next.category === IToken_1.TokenCategory.Opcode) {
            this.parseInstruction();
        }
        else if (next.category === IToken_1.TokenCategory.Comment) {
            this.parseComment();
        }
        else if (next.category === IToken_1.TokenCategory.Preprocessor &&
            (next.lexeme === "END" || next.lexeme === "ORG")) {
            this.context.emit(this.stream.readToEOL());
        }
        else {
            this.stream.expected("instruction or comment", next);
        }
    }
    mustEmit(category) {
        var token = this.stream.expect(category);
        this.context.emitSingle(token);
    }
    mayEmit(category) {
        if (this.stream.peek().category === category) {
            this.context.emitSingle(this.stream.read());
        }
    }
    parseComment() {
        this.mustEmit(IToken_1.TokenCategory.Comment);
        this.mustEmit(IToken_1.TokenCategory.EOL);
    }
    parseInstruction() {
        this.mustEmit(IToken_1.TokenCategory.Opcode);
        this.mustEmit(IToken_1.TokenCategory.Modifier);
        this.mustEmit(IToken_1.TokenCategory.Mode);
        this.mustEmit(IToken_1.TokenCategory.Number);
        this.mustEmit(IToken_1.TokenCategory.Comma);
        this.mustEmit(IToken_1.TokenCategory.Mode);
        this.mustEmit(IToken_1.TokenCategory.Number);
        this.mayEmit(IToken_1.TokenCategory.Comment);
        this.mustEmit(IToken_1.TokenCategory.EOL);
    }
}
exports.SyntaxCheck = SyntaxCheck;
