import { IParseOptions, Standard } from "@parser/interface/IParseOptions";
import { IContext } from "@parser/interface/IContext";
import { IToken, TokenCategory } from "@parser/interface/IToken";
import { MessageType } from "@parser/interface/IMessage";
import { PassBase } from "@parser/PassBase";

export class PreprocessCollector extends PassBase {

    private previous: string[];

    /// <summary>
    /// Records EQU substitutions and removes statements from token stream
    /// Performs a duplicate label check
    /// </summary>
    public process(context: IContext, options: IParseOptions): IContext {

        // Record EQU label tokens
        // Remove EQU token labels from token stream
        // Duplicate label check

        this.previous = [];

        return super.process(context, options);
    }

    public processLine(): void {

        while (!this.stream.eof()) {

            const next = this.stream.peek();

            if (next.category === TokenCategory.Label) {

                this.previous = [];
                this.processLabels();

            } else if (this.isMultilineEqu(next)) {

                this.processMultilineEqu();

            } else {

                const line = this.stream.readToEOL();
                this.context.emit(line);
            }
        }
    }

    private isMultilineEqu(next: IToken): boolean {

        return next.category === TokenCategory.Preprocessor &&
            next.lexeme === "EQU" &&
            this.previous.length > 0 &&
            this.options.standard === Standard.ICWS94draft;
    }

    private isEqu(pre: IToken): boolean {
        return pre.category === TokenCategory.Preprocessor &&
            pre.lexeme === "EQU";
    }

    private processLabels(): void {

        const labels: IToken[] = [];

        while (this.stream.peek().category === TokenCategory.Label) {

            const token = this.stream.expect(TokenCategory.Label);

            this.previous.push(token.lexeme);
            labels.push(token);
        }

        const pre = this.stream.read();

        if (this.isEqu(pre)) {

            this.processEqu(labels);

        } else {

            this.previous = [];
            this.context.emit(labels);
            this.context.emit([pre]);
        }
    }

    private warnDuplicateLabel(label: IToken): void {

        this.context.messages.push({
            type: MessageType.Warning,
            position: label.position,
            text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
        });
    }

    private processEqu(labels: IToken[]): void {

        let expression = this.stream.readToEOL();

        // Do not include terminating EOL in replacement expression
        expression.pop();

        // Remove comments
        expression = expression.filter((token: IToken) => {
            return token.category !== TokenCategory.Comment;
        });

        labels.forEach((label: IToken) => {

            if (label.lexeme in this.context.equs) {
                this.warnDuplicateLabel(label);
            } else {
                this.context.equs[label.lexeme] = expression;
            }
        });
    }

    private processMultilineEqu(): void {

        this.stream.expectOnly("EQU");

        let expression: IToken[] = [{
            category: TokenCategory.EOL,
            lexeme: "\n",
            position: Object.assign({}, this.stream.peek().position)
        }];

        expression = expression.concat(this.stream.readToEOL());
        // Remove terminating newline
        expression.pop();

        this.previous.forEach((label: string) => {

            const existing = this.context.equs[label];
            this.context.equs[label] = existing.concat(expression);
        });
    }
}
