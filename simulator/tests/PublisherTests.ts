import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { Publisher } from "../Publisher";
import { MessageType } from "../interface/IMessage";

describe("Publisher", () => {

    it("can be called when the publish provider has not been specified", () => {

        const publisher = new Publisher([]);

        publisher.publish();
    });

    it("publishes nothing if no messages are queued", () => {

        const publisher = new Publisher([]);

        const provider = sinon.stub();

        publisher.setPublishProvider(provider);

        publisher.publish();

        expect(provider.publishSync).not.to.have.been.called;
    });

    it("queues messages with the relevant publish strategy", () => {

        const unexpected = {
            queue: sinon.stub(),
            dequeue: sinon.stub()
        };
        const expectedStrategy = {
            queue: sinon.stub(),
            dequeue: sinon.stub()
        };

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

        const coreAccessMessage = { type: MessageType.CoreAccess, payload: {} };
        const runProgressMessage = { type: MessageType.RunProgress, payload: {} };
        const roundEndMessage = { type: MessageType.RoundEnd, payload: {} };
        const taskCountMessages = [
            { type: MessageType.TaskCount, payload: { a: "a" } },
            { type: MessageType.TaskCount, payload: { b: "b" } }
        ];
        const initialiseMessage = { type: MessageType.CoreInitialise, payload: {} };
        const roundStartMessage = { type: MessageType.RoundStart, payload: {} };

        const strategies = [
            { dequeue: sinon.stub().returns(coreAccessMessage), queue: sinon.stub() },
            { dequeue: sinon.stub().returns(runProgressMessage), queue: sinon.stub() },
            { dequeue: sinon.stub().returns(roundEndMessage), queue: sinon.stub() },
            { dequeue: sinon.stub().returns(taskCountMessages), queue: sinon.stub() },
            { dequeue: sinon.stub().returns(initialiseMessage), queue: sinon.stub() },
            { dequeue: sinon.stub().returns(roundStartMessage), queue: sinon.stub() }
        ];

        const provider = { publishSync: sinon.stub() };

        const publisher = new Publisher(strategies);
        publisher.setPublishProvider(provider);

        publisher.publish();

        expect(provider.publishSync).to.have.been.calledWith("CORE_ACCESS", coreAccessMessage.payload);
        expect(provider.publishSync).to.have.been.calledWith("RUN_PROGRESS", runProgressMessage.payload);
        expect(provider.publishSync).to.have.been.calledWith("ROUND_END", roundEndMessage.payload);
        expect(provider.publishSync).to.have.been.calledWith("TASK_COUNT", taskCountMessages[0].payload);
        expect(provider.publishSync).to.have.been.calledWith("TASK_COUNT", taskCountMessages[1].payload);
        expect(provider.publishSync).to.have.been.calledWith("CORE_INITIALISE", initialiseMessage.payload);
        expect(provider.publishSync).to.have.been.calledWith("ROUND_START", roundStartMessage.payload);
    });
});