import { expect } from "chai";

import { Standard } from "../../interface/IParseOptions";
import { Expression } from "../../Expression";
import { Parser } from "../../Parser";
import { Scanner } from "../../Scanner";
import { Filter } from "../../Filter";
import { ForPass } from "../../ForPass";
import { PreprocessCollector } from "../../PreprocessCollector";
import { PreprocessAnalyser } from "../../PreprocessAnalyser";
import { PreprocessEmitter } from "../../PreprocessEmitter";
import { LabelCollector } from "../../LabelCollector";
import { LabelEmitter } from "../../LabelEmitter";
import { MathsProcessor } from "../../MathsProcessor";
import { DefaultPass } from "../../DefaultPass";
import { OrgPass } from "../../OrgPass";
import { SyntaxCheck } from "../../SyntaxCheck";
import { IllegalCommandCheck } from "../../IllegalCommandCheck";
import { LoadFileSerialiser } from "../../LoadFileSerialiser";
import { TestLoader } from "./TestLoader";
import { MetaDataCollector } from "../../MetaDataCollector";
import { MetaDataEmitter } from "../../MetaDataEmitter";
import { ITestWarrior } from "./ITestWarrior";

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