import { IEndCondition } from './interface/IEndCondition'
import { IState } from './interface/IState'
import { IWarriorInstance } from './interface/IWarriorInstance'
import { MessageType } from './interface/IMessage'
import { IPublisher } from './interface/IPublisher'
import { IRoundResult } from './interface/IRoundResult'

export class EndCondition implements IEndCondition {
    private publisher: IPublisher

    constructor(publisher: IPublisher) {
        this.publisher = publisher
    }

    private buildRoundResult(outcome: string, winner: IWarriorInstance = null): IRoundResult {
        const result = {
            winnerId: winner && winner.warrior.internalId,
            outcome
        }
        if (winner && winner.warrior.data) {
            result['winnerData'] = winner.warrior.data
        }

        return result
    }

    private publishRoundEnd(payload: IRoundResult): void {
        this.publisher.queue({
            type: MessageType.RoundEnd,
            payload
        })
    }

    private publishProgress(cycle: number, maximumCycles: number): void {
        this.publisher.queue({
            type: MessageType.RunProgress,
            payload: {
                runProgress: (cycle / maximumCycles) * 100.0,
                cycle,
                maximumCycles
            }
        })
    }

    public check(state: IState): IRoundResult {
        if (state.cycle >= state.options.maximumCycles) {
            const result = this.buildRoundResult('DRAW')
            this.publishRoundEnd(result)
            return result
        }

        this.publishProgress(state.cycle, state.options.maximumCycles)

        const liveWarriors = state.instances.filter((warrior: IWarriorInstance) => warrior.tasks.length > 0)

        if (state.instances.length === 1) {
            if (liveWarriors.length === 0) {
                const result = this.buildRoundResult('NONE')
                this.publishRoundEnd(result)
                return result
            }
        } else if (liveWarriors.length === 1) {
            const result = this.buildRoundResult('WIN', liveWarriors[0])
            this.publishRoundEnd(result)
            return result
        }

        return null
    }
}
