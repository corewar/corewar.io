import { expect } from "chai";
import { TestHelper } from  "@parser/tests/integration/TestHelper";
import { Standard } from "@parser/interface/IParseOptions";
import { MessageType } from "@parser/interface/IMessage";

describe("Parser Regression Tests",() => {

    it("correctly handles an instruction with no modifier",() => {
        const actual = TestHelper.testWarriorParse("MOV", Standard.ICWS94draft);

        expect(actual.messages.length).to.be.equal(1);
        expect(actual.messages[0].text).to.be.equal("Expected number, got end of line");
        expect(actual.messages[0].type).to.be.equal(MessageType.Error);
    });
});