import { IFetcher } from "@simulator/interface/IFetcher";
import { IState } from "@simulator/interface/IState";
import { ICore } from "@simulator/interface/ICore";
import { IExecutionContext } from "@simulator/interface/IExecutionContext";
import { IWarrior } from "@simulator/interface/IWarrior";
import { ITask } from "@simulator/interface/ITask";
import { INextExecutionContext } from "@simulator/interface/INextExecutionContext";

interface IFetchContext {
    warriorIndex: number;
    taskIndex: number;
    warrior: IWarrior;
    task: ITask;
}

export class Fetcher implements IFetcher {

    private getNextFetchContext(state: IState): IFetchContext {
        
        let wi = state.warriorIndex;
        let warrior = state.warriors[wi];

        while (this.isDead(warrior)) {
            wi = (wi + 1) % state.warriors.length
            warrior = state.warriors[wi]
        }

        const ti = warrior.taskIndex;
        const task = warrior.tasks[ti];

        return {
            warriorIndex: wi,
            taskIndex: ti,
            warrior: warrior,
            task: task
        };
    }

    public getNextExecution(state: IState): INextExecutionContext {

        const context = this.getNextFetchContext(state);

        return {
            warriorId: context.warrior.id,
            address: context.task.instructionPointer
        };
    }

    public fetch(state: IState, core: ICore): IExecutionContext {

        const c = this.getNextFetchContext(state);

        state.warriorIndex = (c.warriorIndex + 1) % state.warriors.length;
        c.warrior.taskIndex = (c.taskIndex + 1) % c.warrior.tasks.length;

        const ip = c.task.instructionPointer;
        const instruction = core.executeAt(c.task, ip);
        c.task.instructionPointer = (ip + 1) % state.options.coresize;

        return {
            core: core,
            instructionPointer: ip,
            instruction: instruction,
            taskIndex: c.taskIndex,
            task: c.task,
            warriorIndex: c.warriorIndex,
            warrior: c.warrior,
            operands: []
        };
    }

    private isDead(warrior: IWarrior): boolean {
        return warrior.tasks.length === 0
    }
}
