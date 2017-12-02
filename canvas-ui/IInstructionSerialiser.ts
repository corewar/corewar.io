import { IInstruction } from "../simulator/interface/IInstruction";

export interface IInstructionSerialiser {

    serialise(instruction: IInstruction): string;
}