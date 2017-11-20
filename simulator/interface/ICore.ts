import { ITask } from "./ITask";
import { ILiteEvent } from "../../modules/LiteEvent";
import { IOptions } from "./IOptions";
import { IInstruction } from "./IInstruction";

export enum CoreAccessType {
    read,
    write,
    execute
}

export interface ICoreAccessEventArgs {

    task: ITask;
    address: number;
    accessType: CoreAccessType;
}

export interface ICore {

    coreAccess: ILiteEvent<ICoreAccessEventArgs>;

    initialise(options: IOptions): void;
    setMessageProvider(provider: any);
    getSize(): number;
    wrap(address: number): number;
    executeAt(task: ITask, address: number): IInstruction;
    readAt(task: ITask, address: number): IInstruction;
    getAt(address: number): IInstruction;
    setAt(task: ITask, address: number, instruction: IInstruction): void;
}