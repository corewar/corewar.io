import { expect } from "chai";
import * as sinon from "sinon";

import { ITask } from "../interface/ITask";
import { IWarrior } from "../interface/IWarrior";
import { IState } from "../interface/IState";
import Defaults from "../Defaults";
import { EndCondition } from "../EndCondition";
import TestHelper from "./TestHelper";
import { MessageType } from "../interface/IMessage";
import { IPublisher } from "../interface/IPublisher";

describe("EndCondition", () => {

    function buildTask(warrior: IWarrior): ITask {

        return {
            instructionPointer: 0,
            warrior: warrior
        };
    }

    function buildWarrior(): IWarrior {

        var warrior = {
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

    it("returns false if there are multiple active warriors and the maximum number of cycles has not elapsed", () => {

        var state = buildState();

        var endCondition = new EndCondition(publisher);

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(false);
    });

    it("returns true if the maximum number of cylces have elapsed", () => {

        var state = buildState();

        state.cycle = 123;
        state.options.cyclesBeforeTie = 123;

        var endCondition = new EndCondition(publisher);

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(true);
    });

    it("returns true if more than the maximum number of cylces have elapsed", () => {

        var state = buildState();

        state.cycle = 124;
        state.options.cyclesBeforeTie = 123;

        var endCondition = new EndCondition(publisher);

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(true);
    });

    it("returns true if there are multiple warriors and only one with active tasks", () => {

        var state = buildState();

        state.warriors[0].tasks = [];

        var endCondition = new EndCondition(publisher);

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(true);
    });

    it("returns false if there is only one warrior and it has active tasks", () => {

        var state = buildState();

        state.warriors.pop();

        var endCondition = new EndCondition(publisher);

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(false);
    });

    it("returns true if there is only one warrior and it has no active tasks", () => {

        var state = buildState();

        state.warriors.pop();
        state.warriors[0].tasks = [];

        var endCondition = new EndCondition(publisher);

        var actual = endCondition.check(state);

        expect(actual).to.be.equal(true);
    });

    it("publishes round end message in the event of a draw", () => {

        const state = buildState();

        state.cycle = 123;
        state.options.cyclesBeforeTie = 123;

        const endCondition = new EndCondition(publisher);

        endCondition.check(state);

        expect(publisher.queue).to.have.been.calledWith({
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

        expect(publisher.queue).to.have.been.calledWith({
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
            bar: x => x + 1
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

        expect(publisher.queue).to.have.been.calledWith({
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
        state.options.cyclesBeforeTie = 100 * 5;

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