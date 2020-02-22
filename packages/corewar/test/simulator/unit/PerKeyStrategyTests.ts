import { expect } from "chai";

import { PerKeyStrategy } from "@simulator/PerKeyStrategy";
import { IMessage, MessageType } from "@simulator/interface/IMessage";

describe("PerKeyStrategy", () => {

    it("returns null if no message queued", () => {

        const strategy = new PerKeyStrategy((_: IMessage): number => 0);

        expect(strategy.dequeue()).to.be.null;
    });

    it("returns most recent message queued for a single address", () => {

        const strategy = new PerKeyStrategy(p => p.address);

        const unexpected = { type: MessageType.CoreAccess, payload: { address: 1 } };
        const expected = { type: MessageType.CoreAccess, payload: { address: 1 } };

        strategy.queue(unexpected);
        strategy.queue(expected);

        expect(strategy.dequeue()).to.be.deep.equal({
            type: MessageType.CoreAccess,
            payload: [ expected.payload ]
        });
    });

    it("returns the same queued message if dequeued a second time without queueing", () => {

        const strategy = new PerKeyStrategy(p => p.address);

        const message = { type: MessageType.CoreAccess, payload: { address: 1 } };

        strategy.queue(message);
        strategy.dequeue();

        expect(strategy.dequeue()).to.be.deep.equal({
            type: MessageType.CoreAccess,
            payload: [ message.payload ]
        });
    });

    it("returns a payload for each unique address", () => {

        const strategy = new PerKeyStrategy(p => p.warriorId);

        const payload1 = { warriorId: 1 };
        const payload2 = { warriorId: 5 };
        const payload3 = { warriorId: 8 };

        strategy.queue({ type: MessageType.TaskCount, payload: payload1 });
        strategy.queue({ type: MessageType.TaskCount, payload: payload2 });
        strategy.queue({ type: MessageType.TaskCount, payload: payload3 });

        expect(strategy.dequeue()).to.be.deep.equal({
            type: MessageType.TaskCount,
            payload: [payload1, payload2, payload3]
        });
    });

    it("returns null if cleared and then dequeued", () => {

        const strategy = new PerKeyStrategy(p => p.address);

        const message = { type: MessageType.CoreAccess, payload: { address: 1 } };

        strategy.queue(message);
        strategy.clear();

        expect(strategy.dequeue()).to.be.null;
    });
});