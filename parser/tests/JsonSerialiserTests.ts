
import { IToken } from "../interface/IToken";
import { JsonSerialiser } from "../JsonSerialiser";
import { TestHelper } from "./TestHelper";
"use strict";

describe("JsonSerialiser", () => {

    it("json serialises tokens in the order emitted", () => {

        var tokens: IToken[] = TestHelper.instruction(1, "", "MOV", ".AB", "#", "23", ",", "$", "-45", "");

        var serialiser = new JsonSerialiser();

        var actual = serialiser.serialise(tokens);

        expect(actual).toBe(JSON.stringify(tokens));
    });
});