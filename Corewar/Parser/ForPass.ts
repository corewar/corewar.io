import { IExpression } from "./Interface/IExpression";
import { IToken, TokenCategory } from "./Interface/IToken";

import { PassBase } from "./PassBase";

export class ForPass extends PassBase {

    private expression: IExpression;
    
    constructor(expression: IExpression) {
        super();
        this.expression = expression;
    }
    
    /// <summary>
    /// Records EQU substitutions and removes statements from token stream
    /// Performs a duplicate label check
    /// </summary>
    protected processLine() {

        // Record EQU label tokens
        // Remove EQU token labels from token stream
        // Duplicate label check

        var next = this.stream.peek();

        if (next.category === TokenCategory.Label) {

            this.processLabel();

        } else if (this.isFor(next)) {

            var pre = this.stream.expectOnly("FOR");
            this.processFor(null, pre);
        } else {

            var line = this.stream.readToEOL();
            this.context.emit(line);
        }
    }

    private isFor(pre: IToken): boolean {
        return pre.category === TokenCategory.Preprocessor &&
            pre.lexeme === "FOR";
    }

    private processLabel() {

        var label: IToken = this.stream.read();
        
        var pre = this.stream.read();

        if (this.isFor(pre)) {

            this.processFor(label, pre);

        } else {

            this.context.emit([label]);
            this.context.emit([pre]);
        }
    }

    // private warnDuplicateLabel(label: IToken) {

    //    this.context.messages.push({
    //        type: MessageType.Warning,
    //        position: label.position,
    //        text: "Redefinition of label '" + label.lexeme + "', original definition will be used"
    //    });
    // }

    private processFor(label: IToken, pre: IToken) {

        // TODO use label (and reinstate warnDuplicateLabel)
        // TODO stringinisation
        // TODO loop counter variable subs

        var count = this.expression.parse(this.stream);

        if (this.stream.peek().category === TokenCategory.Comment) {
            this.stream.read();
        }

        this.stream.expect(TokenCategory.EOL);

        var expression = this.stream.readToEOL();

        while (!this.stream.eof() && this.stream.peek().lexeme !== "ROF") {

            expression = expression.concat(this.stream.readToEOL());
        }

        this.stream.expectOnly("ROF");

        for (var i = 0; i < count; i++) {

            this.context.emit(expression);
        }

        this.stream.readToEOL();
    }
}
 