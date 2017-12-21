import { ICore, ICoreAccessEventArgs, CoreAccessType } from "./interface/ICore";
import { IOptions } from "./interface/IOptions";
import { ICoreLocation } from "./interface/ICoreLocation";
import { IInstruction } from "./interface/IInstruction";
import { ITask } from "./interface/ITask";
import { MessageType } from "./interface/IMessage";
import { IPublisher } from "./interface/IPublisher";
import * as clone from "clone";

export class Core implements ICore {

    private publisher: IPublisher;

    private options: IOptions;
    private locations: ICoreLocation[] = null;

    private cs: number;

    constructor(publisher: IPublisher) {

        this.publisher = publisher;
    }

    public initialise(options: IOptions) {

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

    private triggerEvent(task: ITask, address: number, accessType: CoreAccessType) {

        const accessEventArgs = {
            warriorId: task ? task.warrior.id : null,
            accessType: accessType,
            address: address
        };

        this.locations[address].access = accessEventArgs;

        this.publisher.publish({
            type: MessageType.CoreAccess,
            payload: [ accessEventArgs ]
        });
    }

    public executeAt(task: ITask, address: number): IInstruction {

        address = this.wrap(address);

        this.triggerEvent(task, address, CoreAccessType.execute);

        return this.locations[address].instruction;
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

    public setAt(task: ITask, address: number, instruction: IInstruction) {

        address = this.wrap(address);

        this.triggerEvent(task, address, CoreAccessType.write);

        this.locations[address].instruction = instruction;
    }

    private allocateMemory() {

        this.locations = [];
        for (var i = 0; i < this.cs; i++) {
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

        var instruction = clone(this.options.initialInstruction);
        instruction.address = index;

        return instruction;
    }

    public publishCoreAccesses(): void {

        this.publisher.publish({
            type: MessageType.CoreAccess,
            payload: this.locations.map(location => location.access)
        });
    }
}