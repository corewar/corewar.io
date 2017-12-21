import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { Publisher } from "../Publisher";
import { MessageType } from "../interface/IMessage";

describe("Publisher", () => {

    it("can be called when the publish provider has not been specified", () => {

        const publisher = new Publisher();

        publisher.publish({
            type: MessageType.CoreAccess,
            payload: {}
        });
    });

    it("publishes messages of the requested type", () => {

        const provider = {
            publishSync: sinon.stub()
        };

        const publisher = new Publisher();
        publisher.setPublishProvider(provider);

        publisher.publish({ type: MessageType.CoreAccess, payload: {} });
        expect(provider.publishSync.lastCall.args[0]).to.be.equal("CORE_ACCESS");

        publisher.publish({ type: MessageType.RunProgress, payload: {} });
        expect(provider.publishSync.lastCall.args[0]).to.be.equal("RUN_PROGRESS");

        publisher.publish({ type: MessageType.RoundEnd, payload: {} });
        expect(provider.publishSync.lastCall.args[0]).to.be.equal("ROUND_END");

        publisher.publish({ type: MessageType.TaskCount, payload: {} });
        expect(provider.publishSync.lastCall.args[0]).to.be.equal("TASK_COUNT");

        publisher.publish({ type: MessageType.CoreInitialise, payload: {} });
        expect(provider.publishSync.lastCall.args[0]).to.be.equal("CORE_INITIALISE");

        publisher.publish({ type: MessageType.RoundStart, payload: {} });
        expect(provider.publishSync.lastCall.args[0]).to.be.equal("ROUND_START");
    });

    it("Allows all message types to be disabled", () => {

        const provider = {
            publishSync: sinon.stub()
        };

        const publisher = new Publisher();
        publisher.setPublishProvider(provider);

        publisher.setAllMessagesEnabled(false);

        publisher.publish({ type: MessageType.CoreAccess, payload: {} });
        publisher.publish({ type: MessageType.CoreInitialise, payload: {} });
        publisher.publish({ type: MessageType.RoundEnd, payload: {} });
        publisher.publish({ type: MessageType.RoundStart, payload: {} });
        publisher.publish({ type: MessageType.RunProgress, payload: {} });
        publisher.publish({ type: MessageType.TaskCount, payload: {} });

        expect(provider.publishSync).not.to.have.been.called;
    });

    it("Allows all message types to be enabled", () => {

        const provider = {
            publishSync: sinon.stub()
        };

        const publisher = new Publisher();
        publisher.setPublishProvider(provider);

        publisher.setAllMessagesEnabled(true);

        publisher.publish({ type: MessageType.CoreAccess, payload: {} });
        publisher.publish({ type: MessageType.CoreInitialise, payload: {} });
        publisher.publish({ type: MessageType.RoundEnd, payload: {} });
        publisher.publish({ type: MessageType.RoundStart, payload: {} });
        publisher.publish({ type: MessageType.RunProgress, payload: {} });
        publisher.publish({ type: MessageType.TaskCount, payload: {} });

        expect(provider.publishSync).to.have.callCount(6);
    });

    it("Allows specific message type to be disabled", () => {

        const provider = {
            publishSync: sinon.stub()
        };

        const publisher = new Publisher();
        publisher.setPublishProvider(provider);

        publisher.setAllMessagesEnabled(true);
        publisher.setMessageTypeEnabled(MessageType.RoundEnd, false);
        publisher.setMessageTypeEnabled(MessageType.CoreAccess, true);

        publisher.publish({ type: MessageType.CoreAccess, payload: {} });
        publisher.publish({ type: MessageType.CoreInitialise, payload: {} });
        publisher.publish({ type: MessageType.RoundEnd, payload: {} });
        publisher.publish({ type: MessageType.RoundStart, payload: {} });
        publisher.publish({ type: MessageType.RunProgress, payload: {} });
        publisher.publish({ type: MessageType.TaskCount, payload: {} });

        expect(provider.publishSync).to.have.callCount(5);
        expect(provider.publishSync).not.to.have.been.calledWith("ROUND_END", sinon.match.any);
    });
});