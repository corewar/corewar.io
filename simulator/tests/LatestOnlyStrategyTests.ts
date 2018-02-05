import { expect } from "chai";
import * as sinon from "sinon";

import { LatestOnlyStrategy } from "../LatestOnlyStrategy";
import { MessageType } from "../interface/IMessage";

describe("LatestOnlyStrategy", () => {

    it("returns null if no message queued", () => {

        const strategy = new LatestOnlyStrategy();

        expect(strategy.dequeue()).to.be.null;
    });

    it("returns most recent message queued", () => {

        const strategy = new LatestOnlyStrategy();

        const unexpected = { type: MessageType.CoreAccess, payload: {} };
        const expected = { type: MessageType.CoreInitialise, payload: {} };

        strategy.queue(unexpected);
        strategy.queue(expected);

        expect(strategy.dequeue()).to.be.deep.equal(expected);
    });

    it("returns same message if dequeued a second time without queueing", () => {

        const strategy = new LatestOnlyStrategy();

        const message = { type: MessageType.CoreInitialise, payload: {} };

        strategy.queue(message);
        strategy.dequeue();

        expect(strategy.dequeue()).to.be.deep.equal(message);
    });

    it("returns null if cleared and then dequeued", () => {

        const strategy = new LatestOnlyStrategy();

        const unexpected = { type: MessageType.CoreAccess, payload: {} };

        strategy.queue(unexpected);
        strategy.clear();

        expect(strategy.dequeue()).to.be.null;
    });
});