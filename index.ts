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
import { IState } from "./simulator/interface/IState";

class Api {

    parser: IParser;
    serialiser: ISerialiser;
    simulator: ISimulator;
    instructionSerialiser: InstructionSerialiser;
    core: ICore;
    executive: IExecutive;

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

        this.instructionSerialiser = new InstructionSerialiser();
    }

    public initialiseSimulator(standardId: number, parseResults: IParseResult[], messageProvider: any) : IState {

        var options = _.defaults({
            coresize: 64,
            standard: standardId
        }, Defaults);

        this.core.initialise(options);

        this.core.setMessageProvider(messageProvider);

        this.simulator.setMessageProvider(messageProvider);

        this.executive.initialise(options);

        this.simulator.initialise(options, parseResults);

        return this.simulator.getState();
    }

    public step() : void {
        this.simulator.step();
    }

    public run(): void {
        this.simulator.run();
    }
}

// exports for use in npm package
export var corewar = new Api();
