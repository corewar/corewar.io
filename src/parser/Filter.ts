import { IToken, TokenCategory } from "@parser/interface/IToken";

import { PassBase } from "@parser/PassBase";

export class Filter extends PassBase {

    /// <summary>
    /// Filters superfluous tokens from the token stream.
    /// Removes any empty lines and anything after the END preprocessor command
    /// Removes comments
    /// </summary>
    public processLine() {

        // Remove empty lines from stream
        // Remove anything after END from stream
        // Remove comments

        var line: IToken[];
        var next = this.stream.peek();

        switch (next.category) {
            case TokenCategory.EOL:
            case TokenCategory.Comment:
                this.processEmptyLine();
                break;
            case TokenCategory.Preprocessor:
                if (next.lexeme === "END") {
                    this.processEnd();
                } else {
                    this.processCommentLine();
                }
                break;
            default:
                this.processCommentLine();
                break;
        }
    }

    private processEmptyLine() {

        this.stream.readToEOL();
    }

    private processEnd() {

        this.processCommentLine();
        this.stream.position = this.stream.tokens.length;
    }

    private processCommentLine() {

        let line = this.stream.readToEOL();
        line = line.filter(t => t.category !== TokenCategory.Comment);
        this.context.emit(line);
    }
}