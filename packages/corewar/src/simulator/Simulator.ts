﻿import { ISimulator } from './interface/ISimulator'
import { IState } from './interface/IState'
import { ILoader } from './interface/ILoader'
import { IFetcher } from './interface/IFetcher'
import { IDecoder } from './interface/IDecoder'
import { IExecutive } from './interface/IExecutive'
import { IEndCondition } from './interface/IEndCondition'
import { IOptionValidator } from './interface/IOptionValidator'
import { ICore } from './interface/ICore'
import { IOptions } from './interface/IOptions'
import { MessageType } from './interface/IMessage'
import { IPublisher } from './interface/IPublisher'
import Defaults from './Defaults'
import { IRoundResult } from './interface/IRoundResult'
import IWarrior from './interface/IWarrior'

import clone from 'clone'

export class Simulator implements ISimulator {
    private state: IState

    private core: ICore
    private loader: ILoader
    private fetcher: IFetcher
    private decoder: IDecoder
    private executive: IExecutive
    private endCondition: IEndCondition
    private optionValidator: IOptionValidator
    private publisher: IPublisher

    constructor(
        core: ICore,
        loader: ILoader,
        fetcher: IFetcher,
        decoder: IDecoder,
        executive: IExecutive,
        endCondition: IEndCondition,
        optionValidator: IOptionValidator,
        publisher: IPublisher
    ) {
        this.core = core
        this.loader = loader
        this.fetcher = fetcher
        this.decoder = decoder
        this.executive = executive
        this.endCondition = endCondition
        this.optionValidator = optionValidator
        this.publisher = publisher

        this.initState()
    }

    private initState(): void {
        this.state = {
            cycle: 0,
            instances: [],
            warriorIndex: 0,
            options: null
        }
    }

    private publishInitialise(state: IState): void {
        this.publisher.queue({
            type: MessageType.CoreInitialise,
            payload: {
                state: clone(state)
            }
        })
    }

    private publishNextExecution(): void {
        this.publisher.queue({
            type: MessageType.NextExecution,
            payload: this.fetcher.getNextExecution(this.state)
        })
    }

    public initialise(options: IOptions, warriors: IWarrior[]): void {
        this.publisher.clear()

        this.initState()

        const defaultedOptions = Object.assign({}, Defaults, options)

        this.optionValidator.validate(defaultedOptions, warriors.length)

        this.state.options = defaultedOptions

        this.core.initialise(defaultedOptions)

        this.state.instances = this.loader.load(warriors, defaultedOptions)

        this.publishInitialise(this.state)

        this.publishNextExecution()

        this.publisher.publish()
    }

    public run(): IRoundResult {
        const remainingSteps = this.state.options.maximumCycles - this.state.cycle

        return this.step(remainingSteps)
    }

    public step(steps?: number): IRoundResult {
        let result = this.endCondition.check(this.state)
        if (result) {
            return result
        }

        result = this.multiStep(steps)

        this.publisher.publish()

        return result
    }

    private multiStep(steps?: number): IRoundResult {
        if (!steps || steps < 1) {
            steps = 1
        }

        if (this.state.cycle === 0) {
            this.publisher.queue({
                type: MessageType.RoundStart,
                payload: {}
            })
        }

        for (let i = 0; i < steps; i++) {
            const result = this.singleStep()
            if (result) {
                return result
            }
        }

        this.publishNextExecution()

        return null
    }

    private singleStep(): IRoundResult {
        let context = this.fetcher.fetch(this.state, this.core)

        context = this.decoder.decode(context)

        context.command.apply(this.executive, [context])

        this.state.cycle += 1

        return this.endCondition.check(this.state)
    }

    public getState(): IState {
        return clone(this.state)
    }
}
