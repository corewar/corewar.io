import { IInstruction } from "@simulator/interface/IInstruction";
import { ICoreAccessEventArgs } from "@simulator/interface/ICore";

export interface ICoreLocation {

    instruction: IInstruction;
    access: ICoreAccessEventArgs;
}