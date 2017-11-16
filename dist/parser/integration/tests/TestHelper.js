"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Expression_1 = require("../../Expression");
const Parser_1 = require("../../Parser");
const Scanner_1 = require("../../Scanner");
const Filter_1 = require("../../Filter");
const ForPass_1 = require("../../ForPass");
const PreprocessCollector_1 = require("../../PreprocessCollector");
const PreprocessAnalyser_1 = require("../../PreprocessAnalyser");
const PreprocessEmitter_1 = require("../../PreprocessEmitter");
const LabelCollector_1 = require("../../LabelCollector");
const LabelEmitter_1 = require("../../LabelEmitter");
const MathsProcessor_1 = require("../../MathsProcessor");
const DefaultPass_1 = require("../../DefaultPass");
const OrgPass_1 = require("../../OrgPass");
const SyntaxCheck_1 = require("../../SyntaxCheck");
const IllegalcommandCheck_1 = require("../../IllegalcommandCheck");
const LoadFileSerialiser_1 = require("../../LoadFileSerialiser");
const TestLoader_1 = require("./TestLoader");
const _ = require("underscore");
"use strict";
class TestHelper {
    static failedIndex(name, a, b) {
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
    static testWarriorList(path, names, standard, allowMessages = false) {
        var loader = new TestLoader_1.TestLoader();
        loader.getWarriors(path, names).then((warriors) => {
            _(warriors).forEach((warrior) => {
                var expression = new Expression_1.Expression();
                var parser = new Parser_1.Parser(new Scanner_1.Scanner(), new Filter_1.Filter(), new ForPass_1.ForPass(expression), new PreprocessCollector_1.PreprocessCollector(), new PreprocessAnalyser_1.PreprocessAnalyser(), new PreprocessEmitter_1.PreprocessEmitter(), new LabelCollector_1.LabelCollector(), new LabelEmitter_1.LabelEmitter(), new MathsProcessor_1.MathsProcessor(expression), new DefaultPass_1.DefaultPass(), new OrgPass_1.OrgPass(), new SyntaxCheck_1.SyntaxCheck(), new IllegalcommandCheck_1.IllegalCommandCheck());
                var result = parser.parse(warrior.redcode, _.defaults({
                    standard: standard
                }, Parser_1.Parser.DefaultOptions));
                var serialiser = new LoadFileSerialiser_1.LoadFileSerialiser();
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
exports.TestHelper = TestHelper;
