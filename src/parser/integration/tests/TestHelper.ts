import { expect } from "chai";

import { Standard } from "@parser/interface/IParseOptions";
import { Expression } from "@parser/Expression";
import { Parser } from "@parser/Parser";
import { Scanner } from "@parser/Scanner";
import { Filter } from "@parser/Filter";
import { ForPass } from "@parser/ForPass";
import { PreprocessCollector } from "@parser/PreprocessCollector";
import { PreprocessAnalyser } from "@parser/PreprocessAnalyser";
import { PreprocessEmitter } from "@parser/PreprocessEmitter";
import { LabelCollector } from "@parser/LabelCollector";
import { LabelEmitter } from "@parser/LabelEmitter";
import { MathsProcessor } from "@parser/MathsProcessor";
import { DefaultPass } from "@parser/DefaultPass";
import { OrgPass } from "@parser/OrgPass";
import { SyntaxCheck } from "@parser/SyntaxCheck";
import { IllegalCommandCheck } from "@parser/IllegalCommandCheck";
import { LoadFileSerialiser } from "@parser/LoadFileSerialiser";
import { TestLoader } from "@parser/integration/tests/TestLoader";
import { MetaDataCollector } from "@parser/MetaDataCollector";
import { MetaDataEmitter } from "@parser/MetaDataEmitter";

export class TestHelper {
    private static failedIndex(name: string, a: string, b: string) {

        for (var i = 0; i < a.length; i++) {

            var ac = a[i];
            var bc = b[i];

            if (ac !== bc) {
                console.log(name + " Failed index " + i.toString() + ", " + ac + " !== " + bc);

                var si = i - 10;
                if (si < 0) {
                    si = 0;
                }

                var ei = i + 10;
                if (ei >= a.length) {
                    ei = a.length - 1;
                }

                var msg = "";
                for (var j = si; j <= ei; j++) {
                    msg += a[j];
                }
                console.log("Back ten forward ten: " + msg);

                return;
            }
        }
    }

    public static testWarriorParse(redcode: string, standard: Standard, ) {

        const expression = new Expression();

        const parser = new Parser(
            new Scanner(),
            new Filter(),
            new MetaDataCollector(),
            new ForPass(expression),
            new PreprocessCollector(),
            new PreprocessAnalyser(),
            new PreprocessEmitter(),
            new LabelCollector(),
            new LabelEmitter(),
            new MathsProcessor(expression),
            new DefaultPass(),
            new OrgPass(),
            new SyntaxCheck(),
            new IllegalCommandCheck(),
            new MetaDataEmitter());

        return parser.parse(
            redcode,
            Object.assign(Parser.DefaultOptions, {
                standard: standard
            }));
    }

    public static testWarriorList(path: string, names: string[], standard: Standard, allowMessages: boolean = false) {

        var loader = new TestLoader();
        return loader.getWarriors(path, names).then((warriors) => {

            return new Promise((resolve, reject) => {
                let remaining = warriors.length;
                warriors.forEach((warrior) => {

                    const result = TestHelper.testWarriorParse(warrior.redcode, standard);

                    var serialiser = new LoadFileSerialiser();

                    var loadfile = serialiser.serialise(result.tokens);

                    var actual = loadfile.trim();
                    var expected = warrior.loadfile.replace(/[\r]/g, "").trim();

                    if (actual !== expected) {
                        this.failedIndex(warrior.name, actual, expected);
                    }

                    expect(actual).to.be.equal(expected);

                    if (!allowMessages) {
                        expect(result.messages.length).to.be.equal(0);
                    }

                    if (--remaining == 0) {
                        resolve();
                    }
                });
            });
        });
        // .catch((e) => {
        //     throw e;
        // });
    }
}