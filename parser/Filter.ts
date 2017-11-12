import { IToken, TokenCategory } from "./interface/IToken";

import { PassBase } from "./PassBase";

export class Filter extends PassBase {

    /// <summary>
    /// Filters superfluous tokens from the token stream.
    /// Removes any empty lines and anything after the END preprocessor command
    /// </summary>
    protected processLine() {

        // Remove empty lines from stream
        // Remove anything after END from stream

        var line: IToken[];
        var next = this.stream.peek();

        switch (next.category) {
            case TokenCategory.EOL:
                this.processEmptyLine();
                break;
            case TokenCategory.Preprocessor:
                if (next.lexeme === "END") {
                    this.processEnd();
                } else {
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

    private processEmptyLine() {

        this.stream.readToEOL();
    }

    private processEnd() {

        var line = this.stream.readToEOL();
        this.context.emit(line);
        this.stream.position = this.stream.tokens.length;
    }
}