import { IPass } from "./interface/IPass";
import { IContext } from "./interface/IContext";
import { IParseOptions } from "./interface/IParseOptions";
import { IToken, TokenCategory } from "./interface/IToken";
import { MessageType } from "./interface/IMessage";

export class PreprocessAnalyser implements IPass {

    private context: IContext;

    private references: { [key: string]: string[] };

    public process(context: IContext, options: IParseOptions): IContext {

        // Detect dependencies between EQU expressions
        // Raise circular reference errors
        // Replace references to EQU labels in other EQU label definitions

        this.context = context;
        this.references = {};

        this.collectReferences();
        if (this.noCircularReferences()) {
            this.replaceAllReferences();
        }

        return this.context;
    }

    private collectReferences() {

        var keys = Object.keys(this.context.equs);

        keys.forEach((key: string) => {

            var expression = this.context.equs[key];

            var references = expression.filter((token: IToken) => {
                return token.category === TokenCategory.Label &&
                    keys.includes(token.lexeme);
            });

            this.references[key] = references.map((token: IToken) => {
                return token.lexeme;
            });
        });
    }

    private raiseCircularReference(key: string, reference: string) {

        this.context.messages.push({
            text: "Circular reference detected in '" + key + "' EQU statement",
            type: MessageType.Error,
            // TODO proper position
            position: { line: 1, char: 1 }
        });
    }

    private noCircularReferences(): boolean {

        var keys = Object.keys(this.context.equs);
        var result = true;

        keys.forEach((key: string) => {

            try {
                var seen: string[] = [];

                this.detectCircularReferencesRecursive(key, seen);
            } catch (reference) {

                this.raiseCircularReference(key, reference);
                result = false;
            }
        });

        return result;
    }

    private detectCircularReferencesRecursive(token: string, seen: string[]) {

        if (seen.includes(token)) {
            throw token;
        }

        seen.push(token);

        this.references[token].forEach((reference: string) => {

            this.detectCircularReferencesRecursive(reference, seen);
        });

        var i = seen.indexOf(token);
        seen.splice(i, 1);
    }

    private replaceAllReferences() {

        var keys = Object.keys(this.context.equs);

        keys.forEach((key: string) => {

            this.replaceReferences(key);
        });
    }

    private replaceReferences(key: string) {

        var expression = this.context.equs[key];
        var keys = Object.keys(this.context.equs);

        while (expression.some((token: IToken) => {
            return token.category === TokenCategory.Label &&
                keys.includes(token.lexeme);
        })) {

            for (var i = 0; i < expression.length; i++) {
                if (expression[i].category === TokenCategory.Label) {

                    var label = expression[i].lexeme;

                    if (keys.includes(label)) {
                        // HACK this is the only way I could find to insert an array into an array!
                        var args: any[] = [i, 1];
                        expression.splice.apply(expression, args.concat(this.context.equs[label]));
                    }
                }
            }
        }
    }
}