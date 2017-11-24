import { expect } from "chai"
import * as sinon from "sinon"

describe("TestTest", () => {

    it("should test that testing works", () => {

        var o = {
            f: () => { return 1; }
        };
        sinon.stub(o, "f").returns(2);

        expect(o.f()).to.be.equal(2);

        expect(1).to.be.equal(1);
    });
});
