import { expect } from "chai";
import * as sinon from "sinon";

import { IParseOptions } from "../interface/IParseOptions";
import { PassBase } from "../PassBase";
import { Context } from "../Context";
import { TokenCategory } from "../interface/IToken";

describe("PassBase", () => {

    it("Should throw an error when processLine is called directly on this abstract class", () => {

        const passBase = new PassBase();

        let actual: Error = null;

        try {
            passBase.processLine();
        } catch (e) {
            actual = e;
        }

        expect(actual).not.to.be.null;
    })
});