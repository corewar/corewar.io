import { ITask } from "./ITask";
import { IOptions } from "./IOptions";
import { IInstruction } from "./IInstruction";
import { ICoreLocation } from "./ICoreLocation";

export enum CoreAccessType {
    read,
    write,
    execute
}

export interface ICoreAccessEventArgs {
    warriorId?: number;
    address: number;
    accessType: CoreAccessType;
}

export interface ICore {

    initialise(options: IOptions): void;
    getSize(): number;
    wrap(address: number): number;
    executeAt(task: ITask, address: number): IInstruction;
    readAt(task: ITask, address: number): IInstruction;
    getAt(address: number): IInstruction;
    getWithInfoAt(address: number): ICoreLocation;
    setAt(task: ITask, address: number, instruction: IInstruction): void;
}