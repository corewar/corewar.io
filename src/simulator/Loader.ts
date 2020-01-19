import { ILoader } from "@simulator/interface/ILoader";
import { IRandom } from "@simulator/interface/IRandom";
import { ICore } from "@simulator/interface/ICore";
import { IWarriorLoader } from "@simulator/interface/IWarriorLoader";
import { IParseResult } from "@parser/interface/IParseResult";
import { IWarrior } from "@simulator/interface/IWarrior";
import { IOptions } from "@simulator/interface/IOptions";

export class Loader implements ILoader {

    private random: IRandom;
    private warriorLoader: IWarriorLoader;
    private core: ICore;

    constructor(random: IRandom, core: ICore, warriorLoader: IWarriorLoader) {

        this.random = random;
        this.warriorLoader = warriorLoader;
        this.core = core;
    }

    public load(warriors: IParseResult[], options: IOptions): IWarrior[] {

        const result: IWarrior[] = [];
        let id = 0;

        warriors.forEach((w: IParseResult) => {

            const address = this.getValidAddress(result, options);

            result.push(this.warriorLoader.load(address, w, id++));
        });

        return result;
    }

    private getValidAddress(warriors: IWarrior[], options: IOptions): number {

        /* eslint-disable-next-line */
        while (true) {

            const address = this.random.get(options.coresize);

            if (this.isValidAddress(address, warriors, options)) {
                return address;
            }
        }
    }

    private isValidAddress(address: number, warriors: IWarrior[], options: IOptions): boolean {

        let valid = true;
        const core = this.core;

        const instructionLimitLess1 = options.instructionLimit - 1;
        const minSeparationLess1 = options.minSeparation - 1;

        warriors.forEach((w: IWarrior) => {

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