import * as chai from 'chai'
import * as sinon from 'sinon'
import sinonChai from 'sinon-chai'
const expect = chai.expect
chai.use(sinonChai)

import { Publisher } from '@simulator/Publisher'
import { MessageType } from '@simulator/interface/IMessage'
import { IPublishStrategy } from '@simulator/interface/IPublishStrategy'

describe('Publisher', () => {
    function buildStrategy(): IPublishStrategy {
        return {
            queue: sinon.stub(),
            dequeue: sinon.stub(),
            clear: sinon.stub()
        }
    }

    it('can be called when the publish provider has not been specified', () => {
        const publisher = new Publisher({})

        publisher.publish()
    })

    it('publishes nothing if no messages are queued', () => {
        const publisher = new Publisher({})

        const provider = {
            publishSync: sinon.stub()
        }

        publisher.setPublishProvider(provider)

        publisher.publish()

        expect(provider.publishSync).not.to.have.been.called
    })

    it('queues messages with the relevant publish strategy', () => {
        const unexpected = buildStrategy()
        const expectedStrategy = buildStrategy()

        const expectedPayload = {
            type: MessageType.TaskCount,
            payload: {}
        }

        const strategies = {
            [MessageType.TaskCount]: expectedStrategy
        }

        const publisher = new Publisher(strategies)

        publisher.queue(expectedPayload)

        expect(expectedStrategy.queue).to.have.been.calledWith(expectedPayload)
        expect(expectedStrategy.queue).to.have.callCount(2)

        expect(expectedStrategy.dequeue).not.to.have.been.called
        expect(unexpected.queue).not.to.have.been.called
        expect(unexpected.dequeue).not.to.have.been.called
    })

    it('publishes all queued messages by dequeueing and clearing all strategies', () => {
        const coreAccessMessages = { type: MessageType.CoreAccess, payload: [{}] }
        const runProgressMessages = { type: MessageType.RunProgress, payload: [{}] }
        const roundEndMessages = { type: MessageType.RoundEnd, payload: [{}] }
        const taskCountMessages = { type: MessageType.TaskCount, payload: [{ a: 'a' }, { b: 'b' }] }
        const initialiseMessages = { type: MessageType.CoreInitialise, payload: [{}] }
        const roundStartMessages = { type: MessageType.RoundStart, payload: [{}] }
        const matchEndMessages = { type: MessageType.MatchEnd, payload: [{}] }

        const strategies = {
            [MessageType.CoreAccess]: {
                dequeue: sinon.stub().returns(coreAccessMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.RunProgress]: {
                dequeue: sinon.stub().returns(runProgressMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.RoundEnd]: {
                dequeue: sinon.stub().returns(roundEndMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.TaskCount]: {
                dequeue: sinon.stub().returns(taskCountMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.CoreInitialise]: {
                dequeue: sinon.stub().returns(initialiseMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.RoundStart]: {
                dequeue: sinon.stub().returns(roundStartMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.MatchEnd]: {
                dequeue: sinon.stub().returns(matchEndMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            }
        }

        const provider = { publishSync: sinon.stub() }

        const publisher = new Publisher(strategies)
        publisher.setPublishProvider(provider)

        publisher.publish()

        expect(provider.publishSync).to.have.been.calledWith('CORE_ACCESS', coreAccessMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('RUN_PROGRESS', runProgressMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('ROUND_END', roundEndMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('TASK_COUNT', taskCountMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('CORE_INITIALISE', initialiseMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('ROUND_START', roundStartMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('MATCH_END', matchEndMessages.payload)

        Object.keys(strategies).forEach(key => {
            expect(strategies[key].clear).to.have.been.called
        })
    })

    it('republishes all queued messages by dequeueing all strategies but NOT clearing them', () => {
        const coreAccessMessages = { type: MessageType.CoreAccess, payload: [{}] }
        const runProgressMessages = { type: MessageType.RunProgress, payload: [{}] }
        const roundEndMessages = { type: MessageType.RoundEnd, payload: [{}] }
        const taskCountMessages = { type: MessageType.TaskCount, payload: [{ a: 'a' }, { b: 'b' }] }
        const initialiseMessages = { type: MessageType.CoreInitialise, payload: [{}] }
        const roundStartMessages = { type: MessageType.RoundStart, payload: [{}] }
        const matchEndMessages = { type: MessageType.MatchEnd, payload: [{}] }

        const strategies = {
            [MessageType.CoreAccess]: {
                dequeue: sinon.stub().returns(coreAccessMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.RunProgress]: {
                dequeue: sinon.stub().returns(runProgressMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.RoundEnd]: {
                dequeue: sinon.stub().returns(roundEndMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.TaskCount]: {
                dequeue: sinon.stub().returns(taskCountMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.CoreInitialise]: {
                dequeue: sinon.stub().returns(initialiseMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.RoundStart]: {
                dequeue: sinon.stub().returns(roundStartMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            },
            [MessageType.MatchEnd]: {
                dequeue: sinon.stub().returns(matchEndMessages),
                queue: sinon.stub(),
                clear: sinon.stub()
            }
        }

        const provider = { publishSync: sinon.stub() }

        const publisher = new Publisher(strategies)
        publisher.setPublishProvider(provider)

        publisher.republish()

        expect(provider.publishSync).to.have.been.calledWith('CORE_ACCESS', coreAccessMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('RUN_PROGRESS', runProgressMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('ROUND_END', roundEndMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('TASK_COUNT', taskCountMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('CORE_INITIALISE', initialiseMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('ROUND_START', roundStartMessages.payload)
        expect(provider.publishSync).to.have.been.calledWith('MATCH_END', matchEndMessages.payload)

        Object.keys(strategies).forEach(key => {
            expect(strategies[key].clear).not.to.have.been.called
        })
    })

    it('clears all strategies when .clear is called', () => {
        const strategy = buildStrategy()

        const strategies = {
            [MessageType.CoreAccess]: strategy,
            [MessageType.CoreInitialise]: strategy,
            [MessageType.HillEnd]: strategy,
            [MessageType.MatchEnd]: strategy,
            [MessageType.NextExecution]: strategy,
            [MessageType.RoundEnd]: strategy
        }

        const publisher = new Publisher(strategies)

        publisher.clear()

        // *2 because there is a publish and a republish clone of each strategy
        expect(strategy.clear).to.have.callCount(Object.keys(strategies).length * 2)
    })
})
