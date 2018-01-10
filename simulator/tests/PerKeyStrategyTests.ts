import { expect } from "chai";
import * as sinon from "sinon";

import { PerKeyStrategy } from "../PerKeyStrategy";
import { MessageType } from "../interface/IMessage";

describe("PerAddressStrategy", () => {

    it("returns empty array if no message queued", () => {

        const strategy = new PerKeyStrategy(p => 0);

        expect(strategy.dequeue()).to.be.deep.equal([]);
    });

    it("returns most recent message queued for a single address", () => {

        const strategy = new PerKeyStrategy(p => p.address);

        const unexpected = { type: MessageType.CoreAccess, payload: { address: 1 } };
        const expected = { type: MessageType.CoreAccess, payload: { address: 1 } };

        strategy.queue(unexpected);
        strategy.queue(expected);

        expect(strategy.dequeue()).to.be.deep.equal([expected]);
    });

    it("returns empty array if dequeued a second time without queueing", () => {

        const strategy = new PerKeyStrategy(p => p.address);

        const message = { type: MessageType.CoreAccess, payload: { address: 1 } };

        strategy.queue(message);
        strategy.dequeue();

        expect(strategy.dequeue()).to.be.deep.equal([]);
    });

    it("returns a message for each unique address", () => {

        const strategy = new PerKeyStrategy(p => p.warriorId);

        const message1 = { type: MessageType.CoreAccess, payload: { warriorId: 1 } };
        const message2 = { type: MessageType.CoreAccess, payload: { warriorId: 5 } };
        const message3 = { type: MessageType.CoreAccess, payload: { warriorId: 8 } };

        strategy.queue(message1);
        strategy.queue(message2);
        strategy.queue(message3);

        expect(strategy.dequeue()).to.be.deep.equal([message1, message2, message3]);
    });
});