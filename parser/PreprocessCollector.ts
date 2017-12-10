import { IParseOptions, Standard } from "./interface/IParseOptions";
import { IContext } from "./interface/IContext";
import { IToken, TokenCategory } from "./interface/IToken";
import { MessageType } from "./interface/IMessage";
import * as _ from "underscore";

import { PassBase } from "./PassBase";

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

    public processLine() {

        while (!this.stream.eof()) {

            var next = this.stream.peek();

            if (next.category === TokenCategory.Label) {

                this.previous = [];
                this.processLabels();

            } else if (this.isMultilineEqu(next)) {

                this.processMultilineEqu();

            } else {

                var line = this.stream.readToEOL();
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

    private processLabels() {

        var labels: IToken[] = [];

        while (this.stream.peek().category === TokenCategory.Label) {

            var token = this.stream.expect(TokenCategory.Label);

            this.previous.push(token.lexeme);
            labels.push(token);
        }

        var pre = this.stream.read();

        if (this.isEqu(pre)) {

            this.processEqu(labels);

        } else {

            this.previous = [];
            this.context.emit(labels);
            this.context.emit([pre]);
        }
    }

    private warnDuplicateLabel(label: IToken) {

        this.context.messages.push({
            type: MessageType.Warning,
            position: label.position,
            text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
        });
    }

    private processEqu(labels: IToken[]) {

        var expression = this.stream.readToEOL();

        // Do not include terminating EOL in replacement expression
        expression.pop();

        // Remove comments
        expression = _.filter(expression,(token: IToken) => {
            return token.category !== TokenCategory.Comment;
        });

        _.forEach(labels, (label: IToken) => {

            if (label.lexeme in this.context.equs) {
                this.warnDuplicateLabel(label);
            } else {
                this.context.equs[label.lexeme] = expression;
            }
        });
    }

    private processMultilineEqu() {

        this.stream.expectOnly("EQU");

        var expression: IToken[] = [{
            category: TokenCategory.EOL,
            lexeme: "\n",
            position: Object.assign({}, this.stream.peek().position)
        }];

        expression = expression.concat(this.stream.readToEOL());
        // Remove terminating newline
        expression.pop();

        _(this.previous).forEach((label: string) => {

            var existing = this.context.equs[label];
            this.context.equs[label] = existing.concat(expression);
        });
    }
}
