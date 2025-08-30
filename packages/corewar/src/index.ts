import { IParseResult } from '@parser/interface/IParseResult'
import { IParser } from '@parser/interface/IParser'
import { ISerialiser } from '@parser/interface/ISerialiser'
import { IToken } from '@parser/interface/IToken'

import { ICore } from '@simulator/interface/ICore'
import { ICoreLocation } from '@simulator/interface/ICoreLocation'
import { IExecutive } from '@simulator/interface/IExecutive'
import { MessageType } from '@simulator/interface/IMessage'
import { IOptions } from '@simulator/interface/IOptions'
import { IPublishProvider } from '@simulator/interface/IPublishProvider'
import { IPublisher } from '@simulator/interface/IPublisher'
import { ISimulator } from '@simulator/interface/ISimulator'
import IWarrior from '@simulator/interface/IWarrior'

import { IMatchResult } from '@matches/interface/IMatchResult'
import { IMatchRunner } from '@matches/interface/IMatchRunner'
import { IRules } from '@matches/interface/IRules'

import { IHillResult } from '@matches/interface/IHillResult'
import { IHillRunner } from '@matches/interface/IHillRunner'

import { IBenchmarkRunner } from '@matches/interface/IBenchmarkRunner'

import { DefaultPass } from '@parser/DefaultPass'
import { Expression } from '@parser/Expression'
import { Filter } from '@parser/Filter'
import { ForPass } from '@parser/ForPass'
import { IllegalCommandCheck } from '@parser/IllegalCommandCheck'
import { LabelCollector } from '@parser/LabelCollector'
import { LabelEmitter } from '@parser/LabelEmitter'
import { LoadFileSerialiser } from '@parser/LoadFileSerialiser'
import { MathsProcessor } from '@parser/MathsProcessor'
import { MetaDataCollector } from '@parser/MetaDataCollector'
import { MetaDataEmitter } from '@parser/MetaDataEmitter'
import { OrgPass } from '@parser/OrgPass'
import { Parser } from '@parser/Parser'
import { PreprocessAnalyser } from '@parser/PreprocessAnalyser'
import { PreprocessCollector } from '@parser/PreprocessCollector'
import { PreprocessEmitter } from '@parser/PreprocessEmitter'
import { Scanner } from '@parser/Scanner'
import { SyntaxCheck } from '@parser/SyntaxCheck'

import { Core } from '@simulator/Core'
import { Decoder } from '@simulator/Decoder'
import { EndCondition } from '@simulator/EndCondition'
import { Executive } from '@simulator/Executive'
import { Fetcher } from '@simulator/Fetcher'
import { LatestOnlyStrategy } from '@simulator/LatestOnlyStrategy'
import { Loader } from '@simulator/Loader'
import { OptionValidator } from '@simulator/OptionValidator'
import { PerKeyStrategy } from '@simulator/PerKeyStrategy'
import { Publisher } from '@simulator/Publisher'
import { Random } from '@simulator/Random'
import { Simulator } from '@simulator/Simulator'
import { WarriorLoader } from '@simulator/WarriorLoader'
import { IRoundResult } from '@simulator/interface/IRoundResult'

import { MatchResultMapper } from '@matches/MatchResultMapper'
import { MatchRunner } from '@matches/MatchRunner'

import { HillResultMapper } from '@matches/HillResultMapper'
import { HillRunner } from '@matches/HillRunner'

import { BenchmarkRunner } from '@matches/BenchmarkRunner'

import clone from 'clone'

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

    public initialiseSimulator(options: IOptions, warriors: IWarrior[], messageProvider?: IPublishProvider): void {
        // TODO move this into library and unit test
        // TODO perform this check on run match, hill and benchmark also
        if (warriors.filter(warrior => !warrior.source.success).length) {
            return
        }

        if (messageProvider) {
            this.publisher.setPublishProvider(messageProvider)
        }

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

    public runMatch(rules: IRules, warriors: IWarrior[], messageProvider?: IPublishProvider): IMatchResult {
        if (messageProvider) {
            this.publisher.setPublishProvider(messageProvider)
        }

        return clone(this.matchRunner.run(rules, warriors))
    }

    public runHill(rules: IRules, warriors: IWarrior[], messageProvider?: IPublishProvider): IHillResult {
        if (messageProvider) {
            this.publisher.setPublishProvider(messageProvider)
        }

        return clone(this.hillRunner.run(rules, warriors))
    }

    public runBenchmark(
        warrior: IWarrior,
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

// Export interfaces for use by other packages
export type {
    IBenchmarkRunner, ICore,
    ICoreLocation,
    IExecutive, IHillResult,
    IHillRunner, IMatchResult,
    IMatchRunner, IOptions, IParser, IParseResult, IPublisher, IPublishProvider, IRoundResult, IRules, ISerialiser, ISimulator, IToken, IWarrior
}

