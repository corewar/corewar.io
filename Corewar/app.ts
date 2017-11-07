import { IParser } from "Parser/Interface/IParser";
import { IParseResult } from "Parser/Interface/IParseResult";
import { ISerialiser } from "Parser/Interface/ISerialiser";
import { IMessage, MessageType } from "Parser/Interface/IMessage";

import { ISimulator } from "Simulator/Interface/ISimulator";
import { ICore } from "Simulator/Interface/ICore";
import { IExecutive } from "Simulator/Interface/IExecutive";
import { OpcodeType, ModifierType } from "Simulator/Interface/IInstruction";
import { Defaults } from "Simulator/Defaults";

import { Parser } from "Parser/Parser";
import { Scanner } from "Parser/Scanner";
import { ForPass } from "Parser/ForPass";
import { PreprocessCollector } from "Parser/PreprocessCollector";
import { PreprocessAnalyser } from "Parser/PreprocessAnalyser";
import { PreprocessEmitter } from "Parser/PreprocessEmitter";
import { LabelCollector } from "Parser/LabelCollector";
import { LabelEmitter } from "Parser/LabelEmitter";
import { MathsProcessor } from "Parser/MathsProcessor";
import { Expression } from "Parser/Expression";
import { Filter } from "Parser/Filter";
import { DefaultPass } from "Parser/DefaultPass";
import { OrgPass } from "Parser/OrgPass";
import { SyntaxCheck } from "Parser/SyntaxCheck";
import { LoadFileSerialiser } from "Parser/LoadFileSerialiser";
import { IllegalCommandCheck } from "Parser/IllegalCommandCheck";

import { Random } from "Simulator/Random";
import { Executive } from "Simulator/Executive";
import { Decoder } from "Simulator/Decoder";
import { Core } from "Simulator/Core";
import { Loader } from "Simulator/Loader";
import { WarriorLoader } from "Simulator/WarriorLoader";
import { Fetcher } from "Simulator/Fetcher";
import { Simulator } from "Simulator/Simulator";
import { EndCondition } from "Simulator/EndCondition";

import { InstructionSerialiser } from "Presentation/InstructionSerialiser";
import { CoreRenderer } from "Presentation/CoreRenderer";
import { Presenter } from "Presentation/Presenter";

var redcode = document.getElementById("redcode");
var loadfile = document.getElementById("loadfile");
var console = document.getElementById("console");
var standard = document.getElementById("standard");
var parseButton = document.getElementById("parseButton");
var runButton = document.getElementById("runButton");
var stepButton = document.getElementById("stepButton");
var canvas = <HTMLCanvasElement>document.getElementById("canvas");
var instructionLabel = document.getElementById("instructionLabel");

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

var core = new Core();
    
var loader = new Loader(
    new Random(),
    core,
    new WarriorLoader(core));

var fetcher = new Fetcher();
var executive = new Executive();
var decoder = new Decoder(executive);

var simulator = new Simulator(
    core,
    loader,
    fetcher,
    decoder,
    executive,
    new EndCondition());

var prez = new Presenter(
    <HTMLTextAreaElement>redcode,
    <HTMLTextAreaElement>loadfile,
    <HTMLUListElement>console,
    <HTMLSelectElement>standard,
    parser,
    new LoadFileSerialiser(),
    simulator,
    core,
    executive);

var coreRenderer: CoreRenderer;

parseButton.addEventListener("click", () => {
    prez.parse();
});

runButton.addEventListener("click",() => {

    coreRenderer = new CoreRenderer(
        canvas,
        <HTMLParagraphElement>instructionLabel,
        core,
        new InstructionSerialiser());
    prez.run();
    coreRenderer.initialise();
});

stepButton.addEventListener("click", () => {
    prez.step();

    coreRenderer.render();
});