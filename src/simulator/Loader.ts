import { ILoader } from "@simulator/interface/ILoader";
import { IRandom } from "@simulator/interface/IRandom";
import { ICore } from "@simulator/interface/ICore";
import { IWarriorLoader } from "@simulator/interface/IWarriorLoader";
import { IWarriorInstance } from "@simulator/interface/IWarriorInstance";
import { IOptions } from "@simulator/interface/IOptions";
import IWarrior from "@simulator/interface/IWarrior";

export class Loader implements ILoader {

    private random: IRandom;
    private warriorLoader: IWarriorLoader;
    private core: ICore;

    constructor(random: IRandom, core: ICore, warriorLoader: IWarriorLoader) {

        this.random = random;
        this.warriorLoader = warriorLoader;
        this.core = core;
    }

    public load(warriors: IWarrior[], options: IOptions): IWarriorInstance[] {

        const result: IWarriorInstance[] = [];
        let id = 0;

        warriors.forEach((warrior: IWarrior) => {

            const address = this.getValidAddress(result, options);

            result.push(this.warriorLoader.load(address, warrior, id++));
        });

        return result;
    }

    private getValidAddress(instances: IWarriorInstance[], options: IOptions): number {

        /* eslint-disable-next-line */
        while (true) {

            const address = this.random.get(options.coresize);

            if (this.isValidAddress(address, instances, options)) {
                return address;
            }
        }
    }

    private isValidAddress(address: number, instances: IWarriorInstance[], options: IOptions): boolean {

        let valid = true;
        const core = this.core;

        const instructionLimitLess1 = options.instructionLimit - 1;
        const minSeparationLess1 = options.minSeparation - 1;

        instances.forEach((w: IWarriorInstance) => {

            let s0 = address;
            let f0 = address + instructionLimitLess1;

            let s1 = w.startAddress - minSeparationLess1;
            let f1 = w.startAddress + minSeparationLess1 + instructionLimitLess1;

            s0 = core.wrap(s0);
            f0 = core.wrap(f0);
            s1 = core.wrap(s1);
            f1 = core.wrap(f1);

            if (s0 <= f0) {

                if (s1 <= f1) {

                    if (s0 <= f1 && s1 <= f0) {
                        valid = false;
                        return;
                    }

                } else if (s0 <= f1 || s1 <= f0) {
                    valid = false;
                    return;
                }

            } else if (s0 <= f1 || s1 <= f0) {
                valid = false;
                return;
            }
        });

        return valid;
    }
}