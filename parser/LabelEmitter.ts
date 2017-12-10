import { MessageType } from "./interface/IMessage";
import { IToken, TokenCategory } from "./interface/IToken";
import { IParseOptions, Standard } from "./interface/IParseOptions";
import { IContext } from "./interface/IContext";
import { PassBase } from "./PassBase";

export class LabelEmitter extends PassBase {

    private line: number;

    public process(context: IContext, options: IParseOptions): IContext {

        this.line = 0;
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

        // Pass 3
        // Replace labels with numbers
        // Raise syntax error for undeclared labels

        if (this.stream.peek().category === TokenCategory.Opcode) {
            this.processLineTokens(true);
            this.line++;
        } else if(this.stream.peek().category === TokenCategory.Preprocessor) {
            this.processLineTokens(false);
        } else {
            var tokens = this.stream.readToEOL();
            this.context.emit(tokens);
        }
    }

    private processLineTokens(isOpcode: boolean) {

        var tokens = this.stream.readToEOL();

        tokens.forEach((token: IToken) => {

            if (token.category === TokenCategory.Label) {
                this.processLabel(token, isOpcode);
            } else {
                this.context.emitSingle(token);
            }
        });
    }

    private raiseUndeclaredLabel(label: IToken) {

        this.context.messages.push({
            type: MessageType.Error,
            position: label.position,
            text: "Unrecognised label '" + this.labelName(label) + "'"
        });
    }

    private processLabel(label: IToken, isOpcode: boolean) {

        var name = this.labelName(label);

        if (name in this.context.labels) {

            var labelLine = this.context.labels[name];

            var diff = labelLine;
            if (isOpcode) {
                diff -= this.line;
            }

            var token = {
                category: TokenCategory.Number,
                lexeme: diff.toString(),
                position: Object.assign({}, label.position)
            };

            this.context.emitSingle(token);
        } else {

            this.raiseUndeclaredLabel(label);
        }
    }
}
