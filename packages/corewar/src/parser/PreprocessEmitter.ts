import { IToken, TokenCategory } from "@parser/interface/IToken";
import { PassBase } from "@parser/PassBase";

export class PreprocessEmitter extends PassBase {

    /// <summary>
    /// Perform preprocessor substitutions.
    /// Replace EQU defined labels with corresponding expression
    /// </summary>
    public processLine(): void {

        // Perform preprocessor substitution
        // Insert EQU expressions

        const next = this.stream.peek();

        if (next.category === TokenCategory.Label &&
            next.lexeme in this.context.equs) {

            this.replaceLabel();
        } else {
            this.context.emit([this.stream.read()]);
        }
    }

    private replaceLabel(): void {

        const label = this.stream.read();
        const originalExpression = this.context.equs[label.lexeme];

        const expression = originalExpression.map((token: IToken) => {
            const clone = Object.assign({}, token);
            clone.position = label.position;
            return clone;
        });

        this.context.emit(expression);
    }
}
