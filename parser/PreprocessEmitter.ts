import { IToken, TokenCategory } from "./interface/IToken";
import * as _ from "underscore";

import { PassBase } from "./PassBase";

export class PreprocessEmitter extends PassBase {

    /// <summary>
    /// Perform preprocessor substitutions.
    /// Replace EQU defined labels with corresponding expression
    /// </summary>
    public processLine() {

        // Perform preprocessor substitution
        // Insert EQU expressions

        var next = this.stream.peek();

        if (next.category === TokenCategory.Label &&
            next.lexeme in this.context.equs) {

            this.replaceLabel();
        } else {
            this.context.emit([this.stream.read()]);
        }
    }

    private replaceLabel() {

        var label = this.stream.read();
        var originalExpression = this.context.equs[label.lexeme];

        var expression = _.map(originalExpression, (token: IToken) => {
            var clone = _.clone(token);
            clone.position = label.position;
            return clone;
        });

        this.context.emit(expression);
    }
}
