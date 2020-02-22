import { IParser } from '@parser/interface/IParser'
import { IToken } from '@parser/interface/IToken'
import { IParseResult } from '@parser/interface/IParseResult'
import { ISerialiser } from '@parser/interface/ISerialiser'

import { ISimulator } from '@simulator/interface/ISimulator'
import { ICore } from '@simulator/interface/ICore'
import { IExecutive } from '@simulator/interface/IExecutive'
import { IPublisher } from '@simulator/interface/IPublisher'
import { IOptions } from '@simulator/interface/IOptions'
import { IPublishProvider } from '@simulator/interface/IPublishProvider'
import { ICoreLocation } from '@simulator/interface/ICoreLocation'
import IWarrior from '@simulator/interface/IWarrior'
import { MessageType } from '@simulator/interface/IMessage'

import { IRules } from '@matches/interface/IRules'
import { IMatchResult } from '@matches/interface/IMatchResult'
import { IMatchRunner } from '@matches/interface/IMatchRunner'

import { IHillRunner } from '@matches/interface/IHillRunner'
import { IHillResult } from '@matches/interface/IHillResult'
import { IHillWarrior } from '@matches/interface/IHillWarrior'

import { IBenchmarkRunner } from '@matches/interface/IBenchmarkRunner'

import { Parser } from '@parser/Parser'
import { Scanner } from '@parser/Scanner'
import { ForPass } from '@parser/ForPass'
import { PreprocessCollector } from '@parser/PreprocessCollector'
import { PreprocessAnalyser } from '@parser/PreprocessAnalyser'
import { PreprocessEmitter } from '@parser/PreprocessEmitter'
import { LabelCollector } from '@parser/LabelCollector'
import { LabelEmitter } from '@parser/LabelEmitter'
import { MathsProcessor } from '@parser/MathsProcessor'
import { Expression } from '@parser/Expression'
import { Filter } from '@parser/Filter'
import { MetaDataCollector } from '@parser/MetaDataCollector'
import { DefaultPass } from '@parser/DefaultPass'
import { OrgPass } from '@parser/OrgPass'
import { SyntaxCheck } from '@parser/SyntaxCheck'
import { LoadFileSerialiser } from '@parser/LoadFileSerialiser'
import { IllegalCommandCheck } from '@parser/IllegalCommandCheck'
import { MetaDataEmitter } from '@parser/MetaDataEmitter'

import { Random } from '@simulator/Random'
import { Executive } from '@simulator/Executive'
import { Decoder } from '@simulator/Decoder'
import { Core } from '@simulator/Core'
import { Loader } from '@simulator/Loader'
import { WarriorLoader } from '@simulator/WarriorLoader'
import { Fetcher } from '@simulator/Fetcher'
import { Simulator } from '@simulator/Simulator'
import { EndCondition } from '@simulator/EndCondition'
import { OptionValidator } from '@simulator/OptionValidator'
import { Publisher } from '@simulator/Publisher'
import { LatestOnlyStrategy } from '@simulator/LatestOnlyStrategy'
import { PerKeyStrategy } from '@simulator/PerKeyStrategy'
import { IRoundResult } from '@simulator/interface/IRoundResult'

import { MatchRunner } from '@matches/MatchRunner'
import { MatchResultMapper } from '@matches/MatchResultMapper'

import { HillRunner } from '@matches/HillRunner'
import { HillResultMapper } from '@matches/HillResultMapper'

import { BenchmarkRunner } from '@matches/BenchmarkRunner'

import * as clone from 'clone'

class Api {
    private parser: IParser
    private serialiser: ISerialiser
    private simulator: ISimulator
    private core: ICore
    private executive: IExecutive
    private publisher: IPublisher
    private matchRunner: IMatchRunner
    private hillRunner: IHillRunner
    private benchmarkRunner: IBenchmarkRunner

    constructor() {
        // any setup needed for the NPM package to work properly
        // like creating the simulator and parser
        const expression = new Expression()

        this.serialiser = new LoadFileSerialiser()

        this.parser = new Parser(
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
            new MetaDataEmitter()
        )

        this.publisher = new Publisher({
            [MessageType.CoreAccess]: new PerKeyStrategy(p => p.address),
            [MessageType.RunProgress]: new LatestOnlyStrategy(),
            [MessageType.RoundEnd]: new LatestOnlyStrategy(),
            [MessageType.TaskCount]: new PerKeyStrategy(p => p.warriorId),
            [MessageType.CoreInitialise]: new LatestOnlyStrategy(),
            [MessageType.RoundStart]: new LatestOnlyStrategy(),
            [MessageType.NextExecution]: new LatestOnlyStrategy(),
            [MessageType.MatchEnd]: new LatestOnlyStrategy(),
            [MessageType.HillEnd]: new LatestOnlyStrategy(),
            [MessageType.WarriorDead]: new LatestOnlyStrategy()
        })

        this.core = new Core(this.publisher)

        const loader = new Loader(new Random(), this.core, new WarriorLoader(this.core, this.publisher))

        const fetcher = new Fetcher()
        this.executive = new Executive(this.publisher)
        const decoder = new Decoder(this.executive)

        this.simulator = new Simulator(
            this.core,
            loader,
            fetcher,
            decoder,
            this.executive,
            new EndCondition(this.publisher),
            new OptionValidator(),
            this.publisher
        )

        this.matchRunner = new MatchRunner(this.simulator, new MatchResultMapper(), this.publisher)

        this.hillRunner = new HillRunner(this.publisher, this.matchRunner, new HillResultMapper())

        this.benchmarkRunner = new BenchmarkRunner(this.publisher, this.matchRunner, new HillResultMapper())
    }

    public initialiseSimulator(options: IOptions, warriors: IWarrior[], messageProvider: IPublishProvider): void {
        this.publisher.setPublishProvider(messageProvider)

        this.executive.initialise(options)

        this.simulator.initialise(options, warriors)
    }

    public step(steps?: number): IRoundResult | null {
        return clone(this.simulator.step(steps))
    }

    public run(): IRoundResult {
        return clone(this.simulator.run())
    }

    public parse(redcode: string): IParseResult {
        return clone(this.parser.parse(redcode))
    }

    public serialise(tokens: IToken[]): string {
        return this.serialiser.serialise(tokens)
    }

    //TODO I think we should rename this to getAt
    public getWithInfoAt(address: number): ICoreLocation {
        return clone(this.core.getWithInfoAt(address))
    }

    public republish(): void {
        this.publisher.republish()
    }

    public runMatch(rules: IRules, warriors: IWarrior[], messageProvider: IPublishProvider): IMatchResult {
        this.publisher.setPublishProvider(messageProvider)

        return clone(this.matchRunner.run(rules, warriors))
    }

    public runHill(rules: IRules, warriors: IWarrior[], messageProvider: IPublishProvider): IHillResult {
        this.publisher.setPublishProvider(messageProvider)

        return clone(this.hillRunner.run(rules, warriors))
    }

    public runBenchmark(
        warrior: IHillWarrior,
        rules: IRules,
        warriors: IWarrior[],
        messageProvider: IPublishProvider
    ): IHillResult {
        this.publisher.setPublishProvider(messageProvider)

        return clone(this.benchmarkRunner.run(warrior, rules, warriors))
    }
}

// exports for use in npm package
export const corewar = new Api()
