import { IParser } from "../parser/Interface/IParser";
import { IParseResult } from "../parser/Interface/IParseResult";
import { ISerialiser } from "../parser/Interface/ISerialiser";
import { IMessage, MessageType } from "../parser/Interface/IMessage";

import { ISimulator } from "../simulator/Interface/ISimulator";
import { ICore } from "../simulator/Interface/ICore";
import { IExecutive } from "../simulator/Interface/IExecutive";
import { OpcodeType, ModifierType } from "../simulator/Interface/IInstruction";
import Defaults from "../simulator/Defaults";

import { Parser } from "../parser/Parser";
import { Scanner } from "../parser/Scanner";
import { ForPass } from "../parser/ForPass";
import { PreprocessCollector } from "../parser/PreprocessCollector";
import { PreprocessAnalyser } from "../parser/PreprocessAnalyser";
import { PreprocessEmitter } from "../parser/PreprocessEmitter";
import { LabelCollector } from "../parser/LabelCollector";
import { LabelEmitter } from "../parser/LabelEmitter";
import { MathsProcessor } from "../parser/MathsProcessor";
import { Expression } from "../parser/Expression";
import { Filter } from "../parser/Filter";
import { DefaultPass } from "../parser/DefaultPass";
import { OrgPass } from "../parser/OrgPass";
import { SyntaxCheck } from "../parser/SyntaxCheck";
import { LoadFileSerialiser } from "../parser/LoadFileSerialiser";
import { IllegalCommandCheck } from "../parser/IllegalCommandCheck";

import { Random } from "../simulator/Random";
import { Executive } from "../simulator/Executive";
import { Decoder } from "../simulator/Decoder";
import { Core } from "../simulator/Core";
import { Loader } from "../simulator/Loader";
import { WarriorLoader } from "../simulator/WarriorLoader";
import { Fetcher } from "../simulator/Fetcher";
import { Simulator } from "../simulator/Simulator";
import { EndCondition } from "../simulator/EndCondition";

import { InstructionSerialiser } from "./presentation/InstructionSerialiser";
import { CoreRenderer } from "./presentation/CoreRenderer";
import { Presenter } from "./presentation/Presenter";



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

    constructor() {
        // any setup needed for the NPM package to work properly
        // like creating the simulator and parser
        var expression = new Expression();

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

// exports for use in npm package
