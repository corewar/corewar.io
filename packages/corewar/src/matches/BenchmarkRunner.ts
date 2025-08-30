import { MessageType } from '../simulator/interface/IMessage'
import { IPublisher } from '../simulator/interface/IPublisher'
import IWarrior from '../simulator/interface/IWarrior'
import { IBenchmarkRunner } from './interface/IBenchmarkRunner'
import { IHillResult } from './interface/IHillResult'
import { IHillResultMapper } from './interface/IHillResultMapper'
import { IMatchRunner } from './interface/IMatchRunner'
import { IRules } from './interface/IRules'

export class BenchmarkRunner implements IBenchmarkRunner {
    private matchRunner: IMatchRunner
    private hillResultMapper: IHillResultMapper
    private publisher: IPublisher

    constructor(publisher: IPublisher, matchRunner: IMatchRunner, hillResultMapper: IHillResultMapper) {
        this.publisher = publisher
        this.matchRunner = matchRunner
        this.hillResultMapper = hillResultMapper
    }

    private publishEnd(result: IHillResult): void {
        this.publisher.queue({
            type: MessageType.HillEnd,
            payload: result
        })
        this.publisher.publish()
    }

    public run(warrior: IWarrior, rules: IRules, warriors: IWarrior[]): IHillResult {
        const matchResults = []

        let i: number
        for (i = 0; i < warriors.length; i++) {
            if (typeof warriors[i].internalId === 'undefined') {
                warriors[i].internalId = i
            }
        }
        if (typeof warrior.internalId === 'undefined') {
            warrior.internalId = i
        }

        for (const warriorB of warriors) {
            matchResults.push(this.matchRunner.run(rules, [warrior, warriorB]))
        }

        const hillResult = this.hillResultMapper.map([warrior, ...warriors], matchResults)

        const result = {
            warriors: hillResult.warriors.filter(x => x.warrior.internalId === warrior.internalId)
        }

        this.publishEnd(result)

        return result
    }
}
