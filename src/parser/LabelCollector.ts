import { IToken, TokenCategory } from "@parser/interface/IToken";
import { IParseOptions, Standard } from "@parser/interface/IParseOptions";
import { IContext } from "@parser/interface/IContext";

import { PassBase } from "@parser/PassBase";

export class LabelCollector extends PassBase {

    private line: number;

    // Pass 2
    // Record label positions
    // Remove label declarations from the token stream
    // Duplicate label check
    // Syntax error if label declaration not followed by an opcode
    public process(context: IContext, options: IParseOptions): IContext {

        this.line = -1;

        return super.process(context, options);
    }

    private labelName(token: IToken): string {

        switch (this.options.standard) {
            case Standard.ICWS86:
            case Standard.ICWS88:
                return token.lexeme.length > 8 ? token.lexeme.substr(0, 8) : token.lexeme;
            default:
                return token.lexeme;
        }
    }

    public processLine() {

        var next = this.stream.peek();

        if (next.category === TokenCategory.Label ||
            next.category === TokenCategory.Opcode) {

            this.line++;
        }

        if (this.stream.peek().category === TokenCategory.Label) {
            this.processLabel();
        }

        var tokens = this.stream.readToEOL();
        this.context.emit(tokens);
    }

    private processLabel() {

        while (!this.stream.eof() && this.stream.peek().category === TokenCategory.Label) {

            var label = this.stream.expect(TokenCategory.Label);
            var name = this.labelName(label);

            if (name in this.context.labels ||
                name in this.context.equs) {

                this.stream.warn(label, "Redefinition of label '" + this.labelName(label) + "', original definition will be used");
            } else {
                this.context.labels[name] = this.line;
            }
        }

        var next = this.stream.peek();

        if (next.lexeme === "END") {
            return;
        }

        if (next.category === TokenCategory.EOL) {
            next = this.stream.expect(TokenCategory.EOL);
        }

        var opcode = this.stream.expect(TokenCategory.Opcode);
        this.context.emitSingle(opcode);
    }
}
