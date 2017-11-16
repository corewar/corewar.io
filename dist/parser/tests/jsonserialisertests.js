"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonSerialiser_1 = require("../JsonSerialiser");
const TestHelper_1 = require("./TestHelper");
"use strict";
describe("JsonSerialiser", () => {
    it("json serialises tokens in the order emitted", () => {
        var tokens = TestHelper_1.TestHelper.instruction(1, "", "MOV", ".AB", "#", "23", ",", "$", "-45", "");
        var serialiser = new JsonSerialiser_1.JsonSerialiser();
        var actual = serialiser.serialise(tokens);
        expect(actual).toBe(JSON.stringify(tokens));
    });
});
