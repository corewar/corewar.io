import { IFetcher } from "./interface/IFetcher";
import { IState } from "./interface/IState";
import { ICore } from "./interface/ICore";
import { IExecutionContext } from "./interface/IExecutionContext";
import { IWarrior } from "./interface/IWarrior";
import { ITask } from "./interface/ITask";

interface IFetchContext {
    warriorIndex: number;
    taskIndex: number;
    warrior: IWarrior;
    task: ITask;
}

export class Fetcher implements IFetcher {

    private getNextFetchContext(state: IState): IFetchContext {
        
        var wi = state.warriorIndex;
        var warrior = state.warriors[wi];

        while (this.isDead(warrior)) {
            wi = (wi + 1) % state.warriors.length
            warrior = state.warriors[wi]
        }

        var ti = warrior.taskIndex;
        var task = warrior.tasks[ti];

        return {
            warriorIndex: wi,
            taskIndex: ti,
            warrior: warrior,
            task: task
        };
    }

    public getNextExecution(state: IState): any {

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

        var ip = c.task.instructionPointer;
        var instruction = core.executeAt(c.task, ip);
        c.task.instructionPointer = (ip + 1) % state.options.coresize;

        return {
            core: core,
            instructionPointer: ip,
            instruction: instruction,
            taskIndex: c.taskIndex,
            task: c.task,
            warriorIndex: c.warriorIndex,
            warrior: c.warrior
        };
    }

    private isDead(warrior: IWarrior): boolean {
        return warrior.tasks.length === 0
    }
}
