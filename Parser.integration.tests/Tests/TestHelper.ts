/// <reference path="../references.ts" />

"use strict";

class TestHelper {

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

    public static testWarriorList(path: string, names: string[], standard: Standard, allowMessages: boolean = false) {

        var loader = new TestLoader();
        loader.getWarriors(path, names).done((warriors) => {

            _(warriors).forEach((warrior) => {

                var expression = new Expression();

                var parser = new Parser(
                    new Scanner(),
                    new Filter(),
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
                    new IllegalCommandCheck());

                var result = parser.parse(warrior.redcode, _.defaults({
                    standard: standard
                }, Parser.DefaultOptions));

                var serialiser = new LoadFileSerialiser();

                var loadfile = serialiser.serialise(result.tokens);

                var actual = loadfile.trim();
                var expected = warrior.loadfile.replace(/[\r]/g, "").trim();

                if (actual !== expected) {
                    this.failedIndex(warrior.name, actual, expected);
                }

                expect(actual).toBe(expected);

                if (!allowMessages) {
                    expect(result.messages.length).toBe(0);
                }
            });
        });
    }
} 