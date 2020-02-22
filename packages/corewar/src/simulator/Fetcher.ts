import { IFetcher } from '@simulator/interface/IFetcher'
import { IState } from '@simulator/interface/IState'
import { ICore } from '@simulator/interface/ICore'
import { IExecutionContext } from '@simulator/interface/IExecutionContext'
import { IWarriorInstance } from '@simulator/interface/IWarriorInstance'
import { ITask } from '@simulator/interface/ITask'
import { INextExecutionContext } from '@simulator/interface/INextExecutionContext'

interface IFetchContext {
    warriorIndex: number
    taskIndex: number
    instance: IWarriorInstance
    task: ITask
}

export class Fetcher implements IFetcher {
    private getNextFetchContext(state: IState): IFetchContext {
        let wi = state.warriorIndex
        let instance = state.instances[wi]

        while (this.isDead(instance)) {
            wi = (wi + 1) % state.instances.length
            instance = state.instances[wi]
        }

        const ti = instance.taskIndex
        const task = instance.tasks[ti]

        return {
            warriorIndex: wi,
            taskIndex: ti,
            instance: instance,
            task: task
        }
    }

    public getNextExecution(state: IState): INextExecutionContext {
        const context = this.getNextFetchContext(state)

        return {
            warriorId: context.instance.warrior.internalId,
            address: context.task.instructionPointer
        }
    }

    public fetch(state: IState, core: ICore): IExecutionContext {
        const c = this.getNextFetchContext(state)

        state.warriorIndex = (c.warriorIndex + 1) % state.instances.length
        c.instance.taskIndex = (c.taskIndex + 1) % c.instance.tasks.length

        const ip = c.task.instructionPointer
        const instruction = core.executeAt(c.task, ip)
        c.task.instructionPointer = (ip + 1) % state.options.coresize

        return {
            core: core,
            instructionPointer: ip,
            instruction: instruction,
            taskIndex: c.taskIndex,
            task: c.task,
            warriorIndex: c.warriorIndex,
            instance: c.instance,
            operands: []
        }
    }

    private isDead(warrior: IWarriorInstance): boolean {
        return warrior.tasks.length === 0
    }
}
