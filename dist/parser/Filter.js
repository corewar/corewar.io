"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IToken_1 = require("./interface/IToken");
const PassBase_1 = require("./PassBase");
class Filter extends PassBase_1.PassBase {
    /// <summary>
    /// Filters superfluous tokens from the token stream.
    /// Removes any empty lines and anything after the END preprocessor command
    /// </summary>
    processLine() {
        // Remove empty lines from stream
        // Remove anything after END from stream
        var line;
        var next = this.stream.peek();
        switch (next.category) {
            case IToken_1.TokenCategory.EOL:
                this.processEmptyLine();
                break;
            case IToken_1.TokenCategory.Preprocessor:
                if (next.lexeme === "END") {
                    this.processEnd();
                }
                else {
                    line = this.stream.readToEOL();
                    this.context.emit(line);
                }
                break;
            default:
                line = this.stream.readToEOL();
                this.context.emit(line);
                break;
        }
    }
    processEmptyLine() {
        this.stream.readToEOL();
    }
    processEnd() {
        var line = this.stream.readToEOL();
        this.context.emit(line);
        this.stream.position = this.stream.tokens.length;
    }
}
exports.Filter = Filter;
