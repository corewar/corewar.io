import { expect } from "chai";
import * as sinon from "sinon";

import { IParseOptions } from "../interface/IParseOptions";
import { PassBase } from "../PassBase";
import { Context } from "../Context";
import { TokenCategory } from "../interface/IToken";

describe("PassBase", () => {

    it("Should throw an error when processLine is called directly on this abstract class", () => {

        const options = {};
        const context = new Context();
        context.tokens = [{
            category: TokenCategory.Preprocessor,
            lexeme: "FOR",
            position: { line: 1, char: 1 }
        }];

        const passBase = new PassBase();

        let actual: Error = null;

        try {
            passBase.process(context, options);
        } catch (e) {
            actual = e;
        }

        expect(actual).not.to.be.null;
    })
});