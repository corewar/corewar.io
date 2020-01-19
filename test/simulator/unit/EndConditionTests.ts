import { expect } from "chai";
import * as sinon from "sinon";
import * as chai from "chai";
import * as sinonChai from "sinon-chai";

import { ITask } from "@simulator/interface/ITask";
import { IWarrior } from "@simulator/interface/IWarrior";
import { IState } from "@simulator/interface/IState";
import Defaults from "@simulator/Defaults";
import { EndCondition } from "@simulator/EndCondition";
import TestHelper from "@simulator/tests/unit/TestHelper";
import { MessageType } from "@simulator/interface/IMessage";
import { IPublisher } from "@simulator/interface/IPublisher";
chai.use(sinonChai);

describe("EndCondition", () => {

    function buildTask(warrior: IWarrior): ITask {

        return {
            instructionPointer: 0,
            warrior: warrior
        };
    }

    function buildWarrior(): IWarrior {

        const warrior = {
            id: 0,
            author: "",
            name: "",
            startAddress: 0,
            strategy: "",
            taskIndex: 0,
            tasks: []
        };

        warrior.tasks.push(buildTask(warrior));
        warrior.tasks.push(buildTask(warrior));

        return warrior;
    }

    function buildState(): IState {

        return {
            cycle: 0,
            options: Object.assign({}, Defaults),
            warriorIndex: 0,
            warriors: [
                buildWarrior(),
                buildWarrior()
            ]
        };
    }

    let publisher: IPublisher;

    beforeEach(() => {
        publisher = TestHelper.buildPublisher();
    });

    it("returns null result if there are multiple active warriors and the maximum number of cycles has not elapsed", () => {

        const state = buildState();

        const endCondition = new EndCondition(publisher);

        const actual = endCondition.check(state);

        expect(actual).to.be.equal(null);
    });

    it("returns draw round result if the maximum number of cylces have elapsed", () => {

        const state = buildState();

        state.cycle = 123;
        state.options.maximumCycles = 123;

        const endCondition = new EndCondition(publisher);

        const actual = endCondition.check(state);

        expect(actual).not.to.be.null;
        expect(actual.winnerId).to.be.equal(null);
        expect(actual.outcome).to.be.equal("DRAW");
    });

    it("returns draw round result if more than the maximum number of cylces have elapsed", () => {

        const state = buildState();

        state.cycle = 124;
        state.options.maximumCycles = 123;

        const endCondition = new EndCondition(publisher);

        const actual = endCondition.check(state);

        expect(actual).not.to.be.null;
        expect(actual.winnerId).to.be.equal(null);
        expect(actual.outcome).to.be.equal("DRAW");
    });

    it("returns win round result if there are multiple warriors and only one with active tasks", () => {

        const expectedId = 8;
        const expectedData = {};

        const state = buildState();

        state.warriors[1].id = expectedId;
        state.warriors[1].data = expectedData;
        
        state.warriors[0].tasks = [];

        const endCondition = new EndCondition(publisher);

        const actual = endCondition.check(state);

        expect(actual).not.to.be.null;
        expect(actual.winnerId).to.be.equal(expectedId);
        expect(actual.winnerData).to.be.equal(expectedData);
        expect(actual.outcome).to.be.equal("WIN");
    });

    it("returns null result if there is only one warrior and it has active tasks", () => {

        const state = buildState();

        state.warriors.pop();

        const endCondition = new EndCondition(publisher);

        const actual = endCondition.check(state);

        expect(actual).to.be.equal(null);
    });

    it("returns none round result if there is only one warrior and it has no active tasks", () => {

        const state = buildState();

        state.warriors.pop();
        state.warriors[0].tasks = [];

        const endCondition = new EndCondition(publisher);

        const actual = endCondition.check(state);

        expect(actual).not.to.be.null;
        expect(actual.winnerId).to.be.equal(null);
        expect(actual.outcome).to.be.equal("NONE");
    });

    it("publishes round end message in the event of a draw", () => {

        const state = buildState();

        state.cycle = 123;
        state.options.maximumCycles = 123;

        const endCondition = new EndCondition(publisher);

        endCondition.check(state);

        expect(publisher.queue).not.to.have.been.calledWith({
            type: MessageType.RunProgress,
            payload: {
                runProgress: 100
            }
        });

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.RoundEnd,
            payload: {
                winnerId: null,
                outcome: 'DRAW'
            }
        });
    });

    it("publishes round end message if a warrior wins", () => {

        const state = buildState();

        state.warriors[0].id = 5;
        state.warriors[1].id = 7;
        state.warriors[0].tasks = [];

        const endCondition = new EndCondition(publisher);

        endCondition.check(state);

        expect(publisher.queue).not.to.have.been.calledWith({
            type: MessageType.RunProgress,
            payload: {
                runProgress: 100
            }
        });

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.RoundEnd,
            payload: {
                winnerId: 7,
                outcome: 'WIN'
            }
        });
    });

    it("includes warrior data in round end message if a warrior wins", () => {

        const state = buildState();

        const expected = {
            foo: "foo",
            bar: (x: number): number => x + 1
        };

        state.warriors[0].id = 5;
        state.warriors[1].id = 7;
        state.warriors[1].data = expected;
        state.warriors[0].tasks = [];

        const endCondition = new EndCondition(publisher);

        endCondition.check(state);

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.RoundEnd,
            payload: {
                winnerId: 7,
                winnerData: expected,
                outcome: 'WIN'
            }
        });
    });

    it("publishes round end message if single warrior round ends", () => {

        const state = buildState();

        state.warriors.pop();
        state.warriors[0].tasks = [];

        const endCondition = new EndCondition(publisher);

        endCondition.check(state);

        expect(publisher.queue).not.to.have.been.calledWith({
            type: MessageType.RunProgress,
            payload: {
                runProgress: 100
            }
        });

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.RoundEnd,
            payload: {
                winnerId: null,
                outcome: 'NONE'
            }
        });
    });

    it("Publishes incremental run progress", () => {

        const state = buildState();

        state.cycle = 12 * 5;
        state.options.maximumCycles = 100 * 5;

        const endCondition = new EndCondition(publisher);

        endCondition.check(state);

        expect(publisher.queue).to.have.been.calledWith({
            type: MessageType.RunProgress,
            payload: {
                runProgress: 12,
                cycle: 12 * 5,
                maximumCycles: 100 * 5
            }
        });

        expect(publisher.queue).not.to.have.been.calledWith({
            type: MessageType.RoundEnd,
            payload: sinon.match.any
        });
    });
});