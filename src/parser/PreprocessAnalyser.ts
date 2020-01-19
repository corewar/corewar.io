import { IPass } from "@parser/interface/IPass";
import { IContext } from "@parser/interface/IContext";
import { IParseOptions } from "@parser/interface/IParseOptions";
import { IToken, TokenCategory } from "@parser/interface/IToken";
import { MessageType } from "@parser/interface/IMessage";

export class PreprocessAnalyser implements IPass {

    private context: IContext;

    private references: { [key: string]: string[] };

    public process(context: IContext, _: IParseOptions): IContext {

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

    private collectReferences(): void {

        const keys = Object.keys(this.context.equs);

        keys.forEach((key: string) => {

            const expression = this.context.equs[key];

            const references = expression.filter((token: IToken) => {
                return token.category === TokenCategory.Label &&
                    keys.includes(token.lexeme);
            });

            this.references[key] = references.map((token: IToken) => {
                return token.lexeme;
            });
        });
    }

    private raiseCircularReference(key: string): void {

        this.context.messages.push({
            text: "Circular reference detected in '" + key + "' EQU statement",
            type: MessageType.Error,
            // TODO proper position
            position: { line: 1, char: 1 }
        });
    }

    private noCircularReferences(): boolean {

        const keys = Object.keys(this.context.equs);
        let result = true;

        keys.forEach((key: string) => {

            try {
                const seen: string[] = [];

                this.detectCircularReferencesRecursive(key, seen);
            } catch (reference) {

                this.raiseCircularReference(key);
                result = false;
            }
        });

        return result;
    }

    private detectCircularReferencesRecursive(token: string, seen: string[]): void {

        if (seen.includes(token)) {
            throw token;
        }

        seen.push(token);

        this.references[token].forEach((reference: string) => {

            this.detectCircularReferencesRecursive(reference, seen);
        });

        const i = seen.indexOf(token);
        seen.splice(i, 1);
    }

    private replaceAllReferences(): void {

        const keys = Object.keys(this.context.equs);

        keys.forEach((key: string) => {

            this.replaceReferences(key);
        });
    }

    private replaceReferences(key: string): void {

        const expression = this.context.equs[key];
        const keys = Object.keys(this.context.equs);

        while (expression.some((token: IToken) => {
            return token.category === TokenCategory.Label &&
                keys.includes(token.lexeme);
        })) {

            for (let i = 0; i < expression.length; i++) {
                if (expression[i].category === TokenCategory.Label) {

                    const label = expression[i].lexeme;

                    if (keys.includes(label)) {
                        expression.splice(i, 1, ...this.context.equs[label])
                    }
                }
            }
        }
    }
}