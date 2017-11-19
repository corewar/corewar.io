import { IParser } from "./parser/interface/IParser";
import { IToken } from "./parser/interface/IToken";
import { IParseOptions } from "./parser/interface/IParseOptions";
import { IParseResult } from "./parser/interface/IParseResult";
import { ISerialiser } from "./parser/interface/ISerialiser";
import { IMessage, MessageType } from "./parser/interface/IMessage";

import { ISimulator } from "./simulator/interface/ISimulator";
import { ICore } from "./simulator/interface/ICore";
import { IExecutive } from "./simulator/interface/IExecutive";
import { OpcodeType, ModifierType } from "./simulator/interface/IInstruction";
import Defaults from "./simulator/Defaults";

import { Parser } from "./parser/Parser";
import { Scanner } from "./parser/Scanner";
import { ForPass } from "./parser/ForPass";
import { PreprocessCollector } from "./parser/PreprocessCollector";
import { PreprocessAnalyser } from "./parser/PreprocessAnalyser";
import { PreprocessEmitter } from "./parser/PreprocessEmitter";
import { LabelCollector } from "./parser/LabelCollector";
import { LabelEmitter } from "./parser/LabelEmitter";
import { MathsProcessor } from "./parser/MathsProcessor";
import { Expression } from "./parser/Expression";
import { Filter } from "./parser/Filter";
import { DefaultPass } from "./parser/DefaultPass";
import { OrgPass } from "./parser/OrgPass";
import { SyntaxCheck } from "./parser/SyntaxCheck";
import { LoadFileSerialiser } from "./parser/LoadFileSerialiser";
import { IllegalCommandCheck } from "./parser/IllegalCommandCheck";

import { Random } from "./simulator/Random";
import { Executive } from "./simulator/Executive";
import { Decoder } from "./simulator/Decoder";
import { Core } from "./simulator/Core";
import { Loader } from "./simulator/Loader";
import { WarriorLoader } from "./simulator/WarriorLoader";
import { Fetcher } from "./simulator/Fetcher";
import { Simulator } from "./simulator/Simulator";
import { EndCondition } from "./simulator/EndCondition";

import { InstructionSerialiser } from "./corewar/presentation/InstructionSerialiser";
import { CoreRenderer } from "./corewar/presentation/CoreRenderer";
import { Presenter } from "./corewar/presentation/Presenter";
import { ILoader } from "./simulator/interface/ILoader";

import * as _ from "underscore";


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

export class Api {

    parser: IParser;
    serialiser: ISerialiser;
    simulator: ISimulator;

    private core: ICore;
    private executive: IExecutive;

    constructor() {
        // any setup needed for the NPM package to work properly
        // like creating the simulator and parser
        var expression = new Expression();

        this.serialiser = new LoadFileSerialiser();

        this.parser = new Parser(
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

        this.core = new Core();

        var loader = new Loader(
            new Random(),
            this.core,
            new WarriorLoader(this.core));

        var fetcher = new Fetcher();
        this.executive = new Executive();
        var decoder = new Decoder(this.executive);

        this.simulator = new Simulator(
            this.core,
            loader,
            fetcher,
            decoder,
            this.executive,
            new EndCondition());
    }

    public initialiseSimulator(standardId: number, parseResult: IParseResult) {

        var options = _.defaults({
            coresize: 64,
            standard: standardId
        }, Defaults);

        this.core.initialise(options);
        this.executive.initialise(options);

        this.simulator.initialise(options, [parseResult]);
    }

    public step() : void {
        this.simulator.step(); // change the internal state
        // render
    }

    // public parse(document: string, options?: IParseOptions): IParseResult {
    //     return this.parser.parse(document, options);
    // }

    // public serialise(tokens: IToken[]) : string {
    //     return this.serialiser.serialise(tokens);
    // }

}

// exports for use in npm package
export var corewar = new Api();
