import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { Publisher } from "../Publisher";
import { MessageType } from "../interface/IMessage";

describe("Publisher", () => {

    function buildStrategy() {
        return {
            queue: sinon.stub(),
            dequeue: sinon.stub(),
            clear: sinon.stub()
        };
    }

    it("can be called when the publish provider has not been specified", () => {

        const publisher = new Publisher([]);

        publisher.publish();
    });

    it("publishes nothing if no messages are queued", () => {

        const publisher = new Publisher([]);

        const provider = {
            publishSync: sinon.stub()
        };

        publisher.setPublishProvider(provider);

        publisher.publish();

        expect(provider.publishSync).not.to.have.been.called;
    });

    it("queues messages with the relevant publish strategy", () => {

        const unexpected = buildStrategy();
        const expectedStrategy = buildStrategy();

        const expectedPayload = {
            type: MessageType.TaskCount,
            payload: {}
        };

        const strategies = [
            unexpected,
            unexpected,
            unexpected,
            unexpected,
            unexpected,
            unexpected
        ];
        strategies[MessageType.TaskCount] = expectedStrategy;

        const publisher = new Publisher(strategies);

        publisher.queue(expectedPayload);

        expect(expectedStrategy.queue).to.have.been.calledWith(expectedPayload);

        expect(expectedStrategy.dequeue).not.to.have.been.called;
        expect(unexpected.queue).not.to.have.been.called;
        expect(unexpected.dequeue).not.to.have.been.called;
    });

    it("publishes all queued messages by dequeueing all strategies", () => {

        const coreAccessMessages = { type: MessageType.CoreAccess, payload: [{}] };
        const runProgressMessages = { type: MessageType.RunProgress, payload: [{}] };
        const roundEndMessages = { type: MessageType.RoundEnd, payload: [{}] };
        const taskCountMessages = { type: MessageType.TaskCount, payload: [{ a: "a" }, { b: "b" }] };
        const initialiseMessages = { type: MessageType.CoreInitialise, payload: [{}] };
        const roundStartMessages = { type: MessageType.RoundStart, payload: [{}] };

        const strategies = [
            { dequeue: sinon.stub().returns(coreAccessMessages), queue: sinon.stub(), clear: sinon.stub() },
            { dequeue: sinon.stub().returns(runProgressMessages), queue: sinon.stub(), clear: sinon.stub() },
            { dequeue: sinon.stub().returns(roundEndMessages), queue: sinon.stub(), clear: sinon.stub() },
            { dequeue: sinon.stub().returns(taskCountMessages), queue: sinon.stub(), clear: sinon.stub() },
            { dequeue: sinon.stub().returns(initialiseMessages), queue: sinon.stub(), clear: sinon.stub() },
            { dequeue: sinon.stub().returns(roundStartMessages), queue: sinon.stub(), clear: sinon.stub() }
        ];

        const provider = { publishSync: sinon.stub() };

        const publisher = new Publisher(strategies);
        publisher.setPublishProvider(provider);

        publisher.publish();

        expect(provider.publishSync).to.have.been.calledWith("CORE_ACCESS", coreAccessMessages.payload);
        expect(provider.publishSync).to.have.been.calledWith("RUN_PROGRESS", runProgressMessages.payload);
        expect(provider.publishSync).to.have.been.calledWith("ROUND_END", roundEndMessages.payload);
        expect(provider.publishSync).to.have.been.calledWith("TASK_COUNT", taskCountMessages.payload);
        expect(provider.publishSync).to.have.been.calledWith("CORE_INITIALISE", initialiseMessages.payload);
        expect(provider.publishSync).to.have.been.calledWith("ROUND_START", roundStartMessages.payload);
    });

    it("clears all strategies when .clear is called", () => {

        const strategy = buildStrategy();

        const expectedPayload = {
            type: MessageType.TaskCount,
            payload: {}
        };

        const strategies = [
            strategy,
            strategy,
            strategy,
            strategy,
            strategy,
            strategy
        ];

        const publisher = new Publisher(strategies);

        publisher.clear();

        expect(strategy.clear).to.have.callCount(strategies.length);
    });
});