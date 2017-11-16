"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("../parser/Parser");
const Scanner_1 = require("../parser/Scanner");
const ForPass_1 = require("../parser/ForPass");
const PreprocessCollector_1 = require("../parser/PreprocessCollector");
const PreprocessAnalyser_1 = require("../parser/PreprocessAnalyser");
const PreprocessEmitter_1 = require("../parser/PreprocessEmitter");
const LabelCollector_1 = require("../parser/LabelCollector");
const LabelEmitter_1 = require("../parser/LabelEmitter");
const MathsProcessor_1 = require("../parser/MathsProcessor");
const Expression_1 = require("../parser/Expression");
const Filter_1 = require("../parser/Filter");
const DefaultPass_1 = require("../parser/DefaultPass");
const OrgPass_1 = require("../parser/OrgPass");
const SyntaxCheck_1 = require("../parser/SyntaxCheck");
const IllegalCommandCheck_1 = require("../parser/IllegalCommandCheck");
// export class Startup {
//     constructor() {
//         var redcode = document.getElementById("redcode");
//         var loadfile = document.getElementById("loadfile");
//         var console = document.getElementById("console");
//         var standard = document.getElementById("standard");
//         var parseButton = document.getElementById("parseButton");
//         var runButton = document.getElementById("runButton");
//         var stepButton = document.getElementById("stepButton");
//         var canvas = <HTMLCanvasElement>document.getElementById("canvas");
//         var instructionLabel = document.getElementById("instructionLabel");
//         var expression = new Expression();
//         var parser = new Parser(
//             new Scanner(),
//             new Filter(),
//             new ForPass(expression),
//             new PreprocessCollector(),
//             new PreprocessAnalyser(),
//             new PreprocessEmitter(),
//             new LabelCollector(),
//             new LabelEmitter(),
//             new MathsProcessor(expression),
//             new DefaultPass(),
//             new OrgPass(),
//             new SyntaxCheck(),
//             new IllegalCommandCheck());
//         var core = new Core();
//         var loader = new Loader(
//             new Random(),
//             core,
//             new WarriorLoader(core));
//         var fetcher = new Fetcher();
//         var executive = new Executive();
//         var decoder = new Decoder(executive);
//         var simulator = new Simulator(
//             core,
//             loader,
//             fetcher,
//             decoder,
//             executive,
//             new EndCondition());
//         var prez = new Presenter(
//             <HTMLTextAreaElement>redcode,
//             <HTMLTextAreaElement>loadfile,
//             <HTMLUListElement>console,
//             <HTMLSelectElement>standard,
//             parser,
//             new LoadFileSerialiser(),
//             simulator,
//             core,
//             executive);
//         var coreRenderer: CoreRenderer;
//         parseButton.addEventListener("click", () => {
//             prez.parse();
//         });
//         runButton.addEventListener("click",() => {
//             coreRenderer = new CoreRenderer(
//                 canvas,
//                 <HTMLParagraphElement>instructionLabel,
//                 core,
//                 new InstructionSerialiser());
//             prez.run();
//             coreRenderer.initialise();
//         });
//         stepButton.addEventListener("click", () => {
//             prez.step();
//             coreRenderer.render();
//         });
//     }
// }
// new Startup();
class Api {
    constructor() {
        // any setup needed for the NPM package to work properly
        // like creating the simulator and parser
        var expression = new Expression_1.Expression();
        this.parser = new Parser_1.Parser(new Scanner_1.Scanner(), new Filter_1.Filter(), new ForPass_1.ForPass(expression), new PreprocessCollector_1.PreprocessCollector(), new PreprocessAnalyser_1.PreprocessAnalyser(), new PreprocessEmitter_1.PreprocessEmitter(), new LabelCollector_1.LabelCollector(), new LabelEmitter_1.LabelEmitter(), new MathsProcessor_1.MathsProcessor(expression), new DefaultPass_1.DefaultPass(), new OrgPass_1.OrgPass(), new SyntaxCheck_1.SyntaxCheck(), new IllegalCommandCheck_1.IllegalCommandCheck());
        // var core = new Core();
        // var loader = new Loader(
        //     new Random(),
        //     core,
        //     new WarriorLoader(core));
        // var fetcher = new Fetcher();
        // var executive = new Executive();
        // var decoder = new Decoder(executive);
        // var simulator = new Simulator(
        //     core,
        //     loader,
        //     fetcher,
        //     decoder,
        //     executive,
        //     new EndCondition());
    }
}
exports.Api = Api;
// exports for use in npm package
