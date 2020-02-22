import { IExpression } from "@parser/interface/IExpression";
import { TokenCategory } from "@parser/interface/IToken";
import { PassBase } from "@parser/PassBase";

export class MathsProcessor extends PassBase {

    private expression: IExpression;

    constructor(expression: IExpression) {
        super();
        this.expression = expression;
    }

    public processLine(): void {

        // Maths Processor
        // Locate and resolve mathematical expressions to resulting address

        const next = this.stream.peek();

        if (next.category === TokenCategory.Number ||
            next.category === TokenCategory.Maths) {

            try {
                const address = this.expression.parse(this.stream);

                this.context.emitSingle({
                    category: TokenCategory.Number,
                    lexeme: address.toString(),
                    position: Object.assign({}, next.position)
                });
            } catch (err) {
                this.stream.readToEOL();
            }
        } else {
            this.context.emitSingle(this.stream.read());
        }
    }
}