import { expect } from "chai";

import { PassBase } from "@parser/PassBase";

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