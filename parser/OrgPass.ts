import { IToken, TokenCategory } from "./interface/IToken";
import { IContext } from "./interface/IContext";
import { IParseOptions, Standard } from "./interface/IParseOptions";
import * as _ from "underscore";

import { PassBase } from "./PassBase";

export class OrgPass extends PassBase {

    private firstInstruction: number;
    private orgAddress: number;
    private orgComment: IToken;
    private org: IToken;

    public process(context: IContext, options: IParseOptions): IContext {

        // Replace END ### with ORG ###
        // Emit ORG as first instruction
        // Raise warning for duplicate ORGs / END ###
        // Under ICWS'86 - if no END ### found, if start label defined, emit ORG start

        this.firstInstruction = null;
        this.org = null;
        this.orgAddress = null;
        this.orgComment = null;

        var result = super.process(context, options);

        this.emitOrg();

        return result;
    }

    public processLine() {

        var next = this.stream.peek();

        if (this.firstInstruction === null &&
            next.category !== TokenCategory.Comment) {

            this.firstInstruction = this.stream.position;
        }

        if (next.category === TokenCategory.Preprocessor) {

            if (next.lexeme === "ORG") {
                this.processOrg();
            } else if (next.lexeme === "END") {
                this.processEnd();
            } else {
                this.context.emit(this.stream.readToEOL());
            }
        } else {
            this.context.emit(this.stream.readToEOL());
        }
    }

    private processOrg() {

        var org = this.stream.expectOnly("ORG");
        this.org = org;

        if (this.orgAddress !== null) {

            this.stream.warn(org, "Redefinition of ORG encountered, this later definition will take effect");
        }

        var address = this.stream.expect(TokenCategory.Number);

        this.orgAddress = parseInt(address.lexeme, 10);

        if (this.stream.peek().category === TokenCategory.Comment) {
            this.orgComment = this.stream.read();
        }

        this.stream.expect(TokenCategory.EOL);
    }

    private processEnd() {

        var end = this.stream.expectOnly("END");
        var address: IToken = null;
        var comment: IToken = null;

        if (this.stream.peek().category === TokenCategory.Number) {

            address = this.stream.read();
        }

        if (this.stream.peek().category === TokenCategory.Comment) {

            comment = this.stream.read();
        }

        this.stream.expect(TokenCategory.EOL);

        if (address !== null) {

            if (this.orgAddress !== null) {

                this.stream.warn(end, "Encountered both ORG and END address, the ORG definition will take effect");
            } else {

                this.org = end;
                this.orgAddress = parseInt(address.lexeme, 10);
            }
        }
    }

    private static START_LABEL = "start";

    private emitOrg() {

        if (this.orgAddress === null) {

            if (this.options.standard === Standard.ICWS86 &&
                _(_(this.context.labels).keys()).contains(OrgPass.START_LABEL)) {
                this.orgAddress = this.context.labels[OrgPass.START_LABEL];
            } else {
                this.orgAddress = 0;
            }

            this.org = {
                category: TokenCategory.Preprocessor,
                lexeme: "ORG",
                position: { line: 1, char: 1 }
            };
        }

        var org = {
            category: TokenCategory.Preprocessor,
            lexeme: "ORG",
            position: Object.assign({}, this.org.position)
        };

        var address = {
            category: TokenCategory.Number,
            lexeme: this.orgAddress.toString(),
            position: Object.assign({}, this.org.position)
        };

        var instruction: IToken[] = [org, address];

        if (this.orgComment !== null) {
            instruction.push(this.orgComment);
        }

        instruction.push({
            category: TokenCategory.EOL,
            lexeme: "\n",
            position: Object.assign({}, this.org.position)
        });

        // HACK this is the only way I could find to insert an array into an array!
        var args: any[] = [this.firstInstruction, 0];
        this.context.tokens.splice.apply(this.context.tokens, args.concat(instruction));
    }
}
