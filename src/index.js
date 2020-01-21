"use strict";
exports.__esModule = true;
var Parser_1 = require("@parser/Parser");
var Scanner_1 = require("@parser/Scanner");
var ForPass_1 = require("@parser/ForPass");
var PreprocessCollector_1 = require("@parser/PreprocessCollector");
var PreprocessAnalyser_1 = require("@parser/PreprocessAnalyser");
var PreprocessEmitter_1 = require("@parser/PreprocessEmitter");
var LabelCollector_1 = require("@parser/LabelCollector");
var LabelEmitter_1 = require("@parser/LabelEmitter");
var MathsProcessor_1 = require("@parser/MathsProcessor");
var Expression_1 = require("@parser/Expression");
var Filter_1 = require("@parser/Filter");
var MetaDataCollector_1 = require("@parser/MetaDataCollector");
var DefaultPass_1 = require("@parser/DefaultPass");
var OrgPass_1 = require("@parser/OrgPass");
var SyntaxCheck_1 = require("@parser/SyntaxCheck");
var LoadFileSerialiser_1 = require("@parser/LoadFileSerialiser");
var IllegalCommandCheck_1 = require("@parser/IllegalCommandCheck");
var MetaDataEmitter_1 = require("@parser/MetaDataEmitter");
var Random_1 = require("@simulator/Random");
var Executive_1 = require("@simulator/Executive");
var Decoder_1 = require("@simulator/Decoder");
var Core_1 = require("@simulator/Core");
var Loader_1 = require("@simulator/Loader");
var WarriorLoader_1 = require("@simulator/WarriorLoader");
var Fetcher_1 = require("@simulator/Fetcher");
var Simulator_1 = require("@simulator/Simulator");
var EndCondition_1 = require("@simulator/EndCondition");
var OptionValidator_1 = require("@simulator/OptionValidator");
var Publisher_1 = require("@simulator/Publisher");
var LatestOnlyStrategy_1 = require("@simulator/LatestOnlyStrategy");
var PerKeyStrategy_1 = require("@simulator/PerKeyStrategy");
var MatchRunner_1 = require("@matches/MatchRunner");
var clone = require("clone");
var MatchResultMapper_1 = require("@matches/MatchResultMapper");
var Api = /** @class */ (function () {
    function Api() {
        // any setup needed for the NPM package to work properly
        // like creating the simulator and parser
        var expression = new Expression_1.Expression();
        this.serialiser = new LoadFileSerialiser_1.LoadFileSerialiser();
        this.parser = new Parser_1.Parser(new Scanner_1.Scanner(), new Filter_1.Filter(), new MetaDataCollector_1.MetaDataCollector(), new ForPass_1.ForPass(expression), new PreprocessCollector_1.PreprocessCollector(), new PreprocessAnalyser_1.PreprocessAnalyser(), new PreprocessEmitter_1.PreprocessEmitter(), new LabelCollector_1.LabelCollector(), new LabelEmitter_1.LabelEmitter(), new MathsProcessor_1.MathsProcessor(expression), new DefaultPass_1.DefaultPass(), new OrgPass_1.OrgPass(), new SyntaxCheck_1.SyntaxCheck(), new IllegalCommandCheck_1.IllegalCommandCheck(), new MetaDataEmitter_1.MetaDataEmitter());
        this.publisher = new Publisher_1.Publisher([
            new PerKeyStrategy_1.PerKeyStrategy(function (p) { return p.address; }),
            new LatestOnlyStrategy_1.LatestOnlyStrategy(),
            new LatestOnlyStrategy_1.LatestOnlyStrategy(),
            new PerKeyStrategy_1.PerKeyStrategy(function (p) { return p.warriorId; }),
            new LatestOnlyStrategy_1.LatestOnlyStrategy(),
            new LatestOnlyStrategy_1.LatestOnlyStrategy(),
            new LatestOnlyStrategy_1.LatestOnlyStrategy(),
            new LatestOnlyStrategy_1.LatestOnlyStrategy()
        ]);
        this.core = new Core_1.Core(this.publisher);
        var loader = new Loader_1.Loader(new Random_1.Random(), this.core, new WarriorLoader_1.WarriorLoader(this.core, this.publisher));
        var fetcher = new Fetcher_1.Fetcher();
        this.executive = new Executive_1.Executive(this.publisher);
        var decoder = new Decoder_1.Decoder(this.executive);
        this.simulator = new Simulator_1.Simulator(this.core, loader, fetcher, decoder, this.executive, new EndCondition_1.EndCondition(this.publisher), new OptionValidator_1.OptionValidator(), this.publisher);
        this.matchRunner = new MatchRunner_1.MatchRunner(this.simulator, new MatchResultMapper_1.MatchResultMapper(), this.publisher);
    }
    Api.prototype.initialiseSimulator = function (options, parseResults, messageProvider) {
        this.publisher.setPublishProvider(messageProvider);
        this.executive.initialise(options);
        this.simulator.initialise(options, parseResults);
    };
    Api.prototype.step = function (steps) {
        this.simulator.step(steps);
    };
    Api.prototype.run = function () {
        this.simulator.run();
    };
    Api.prototype.parse = function (redcode) {
        return this.parser.parse(redcode);
    };
    Api.prototype.serialise = function (tokens) {
        return this.serialiser.serialise(tokens);
    };
    //TODO I think we should rename this to getAt
    Api.prototype.getWithInfoAt = function (address) {
        return clone(this.core.getWithInfoAt(address));
    };
    Api.prototype.republish = function () {
        this.publisher.republish();
    };
    Api.prototype.runMatch = function (match) {
        this.matchRunner.run(match);
    };
    return Api;
}());
// exports for use in npm package
exports.corewar = new Api();
