import { IInstruction } from "../../Simulator/Interface/IInstruction";

export interface IInstructionSerialiser {
    
    serialise(instruction: IInstruction): string;
}