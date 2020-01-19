import { ICore, CoreAccessType } from "@simulator/interface/ICore";
import { IOptions } from "@simulator/interface/IOptions";
import { ICoreLocation } from "@simulator/interface/ICoreLocation";
import { IInstruction, OpcodeType } from "@simulator/interface/IInstruction";
import { ITask } from "@simulator/interface/ITask";
import { MessageType } from "@simulator/interface/IMessage";
import { IPublisher } from "@simulator/interface/IPublisher";
import * as clone from "clone";

export class Core implements ICore {

    private publisher: IPublisher;

    private options: IOptions;
    private locations: ICoreLocation[] = null;

    private cs: number;

    constructor(publisher: IPublisher) {

        this.publisher = publisher;
    }

    public initialise(options: IOptions): void {

        this.options = options;
        this.cs = this.options.coresize;

        this.allocateMemory();
    }

    public getSize(): number {
        return this.cs;
    }

    public wrap(address: number): number {

        address = address % this.cs;
        address = address >= 0 ? address : address + this.cs;

        return address;
    }

    private triggerEvent(task: ITask, address: number, accessType: CoreAccessType): void {

        const accessEventArgs = {
            warriorId: task ? task.warrior.id : null,
            accessType: accessType,
            address: address
        };
        if (task && task.warrior.data) {
            accessEventArgs["warriorData"] = task.warrior.data;
        }

        this.locations[address].access = accessEventArgs;

        this.publisher.queue({
            type: MessageType.CoreAccess,
            payload: accessEventArgs
        });
    }

    public executeAt(task: ITask, address: number): IInstruction {

        address = this.wrap(address);

        const instruction = this.locations[address].instruction;

        if (instruction.opcode !== OpcodeType.DAT) {
            this.triggerEvent(task, address, CoreAccessType.execute);
        }

        return instruction;
    }

    public readAt(task: ITask, address: number): IInstruction {

        address = this.wrap(address);

        this.triggerEvent(task, address, CoreAccessType.read);

        return this.locations[address].instruction;
    }

    public getAt(address: number): IInstruction {

        address = this.wrap(address);

        return this.locations[address].instruction;
    }

    public getWithInfoAt(address: number): ICoreLocation {

        address = this.wrap(address);

        return this.locations[address];
    }

    public setAt(task: ITask, address: number, instruction: IInstruction): void {

        address = this.wrap(address);

        this.triggerEvent(task, address, CoreAccessType.write);

        this.locations[address].instruction = instruction;
    }

    private allocateMemory(): void {

        this.locations = [];
        for (let i = 0; i < this.cs; i++) {
            this.locations.push({
                instruction: this.buildDefaultInstruction(i),
                access: {
                    accessType: CoreAccessType.write,
                    address: i
                }
            });
        }
    }

    private buildDefaultInstruction(index: number): IInstruction {

        const instruction = clone(this.options.initialInstruction);
        instruction.address = index;

        return instruction;
    }
}